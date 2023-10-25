import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';

import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';

// Stripe Imports
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

import { Toastify, RefType } from '../../shared/components/Tosatify';
import { TextField } from '../../shared/components/Input';
import {
  CARD_OPTIONS,
  StripeFiledContainer,
} from '../../shared/components/stripe';
import { EMAIL_REGEX } from '../../shared/constants';
import { TextGray12UppercaseBold } from '../../shared/components/texts';
import PhoneNumberInput from '../../shared/components/PhoneNumberInput';

const ButtonContainer = styled('div')(`
  margin-top: 8px;
`);

const BoxStyled4 = styled('div')`
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  width: 100%;
  border-color: rgba(60, 60, 60, 1);
  border-radius: 0.375rem;
  margin-top: 2rem;
  font-size: 16.8px;
  font-family: 'Saira';
  line-height: 21.6px;
`;

type FormFieldTypes = {
  email: string;
  inputnumber: string;
};

interface PaymentFormProps {
  handlePaymentSubmit: (
    stripeId: string,
    email: string,
    inputnumber?: string,
    stripeData?,
    country?: string,
  ) => void;
  currency: string;
  amount: number;
  recurring: boolean | null | undefined;
  priceId?: string | null | undefined;
  isUserAuthenticated?: boolean;
  acceptedPhoneNumber?: boolean;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  handlePaymentSubmit,
  currency,
  amount,
  recurring,
  priceId,
  isUserAuthenticated = false,
  acceptedPhoneNumber,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const successAlert = useRef<RefType>(null);
  const errorAlert = useRef<RefType>(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
    //  reset,
    setValue,
  } = useForm<FormFieldTypes>();

  const textConfirmAndPay = t('ConfirmAndPay');
  const Email = t('Email');
  const PolicyAdvice = t('PolicyAdvice');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmitPay = async (data: FormFieldTypes): Promise<any> => {
    setIsLoading(true);
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    axios
      .post('/api/Payment?pay=true', {
        email: data.email,
        currency,
        amount,
      })
      .then(async (res) => {
        const clientSecret = res.data.client_secret;

        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              email: data.email,
            },
          },
        });

        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          console.log(result.error.message);
          router.push(
            `${window.location.origin}/checkout?status=cancel&returnTo=${window.location.href}`,
          );
        } else if (result.paymentIntent.status === 'succeeded') {
          setIsLoading(false);
          // The payment has been processed!
          if (data?.inputnumber) {
            handlePaymentSubmit(
              result.paymentIntent.id,
              data.email,
              data.inputnumber,
              result,
              selectedCountry
            );
          } else {
            handlePaymentSubmit(result.paymentIntent.id, data.email);
          }
          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback
          // execution. Set up a webhook or plugin to listen for the
          // payment_intent.succeeded event that handles any business critical
          // post-payment actions.
        }
      })
      .catch((e) => {
        console.log(e);
        router.push(
          `${window.location.origin}/checkout?status=cancel&returnTo=${window.location.href}`,
        );
      });
  };

  const handleSubmitSub = async (data: FormFieldTypes): Promise<any> => {
    setIsLoading(true);
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        email: data.email,
      },
    });

    if (result.error) {
      console.log(result.error.message);
      router.push(
        `${window.location.origin}/checkout?status=cancel&returnTo=${window.location.href}`,
      );
    } else {
      axios
        .post('/api/Payment?sub=true', {
          payment_method: result.paymentMethod.id,
          email: data.email,
          priceId,
        })
        .then((res) => {
          // eslint-disable-next-line camelcase
          const { client_secret: clientSecret, status } = res.data;

          if (status === 'requires_action') {
            stripe
              .confirmCardPayment(clientSecret)
              .then((paymentConfirmationRes) => {
                if (paymentConfirmationRes.error) {
                  console.log(paymentConfirmationRes.error);
                  router.push(
                    `${window.location.origin}/checkout?status=cancel&returnTo=${window.location.href}`,
                  );
                  // Display error message in your UI.
                  // The card was declined (i.e. insufficient funds, card has expired, etc)
                } else {
                  // it might need to send the phone number on a conditional basis in the future
                  handlePaymentSubmit(
                    paymentConfirmationRes.paymentIntent.id,
                    data.email,
                    data.inputnumber,
                  );
                  // Show a success message to your customer
                }
              });
          } else {
            handlePaymentSubmit(res.data.id, data.email, data.inputnumber);
            // No additional information was needed
            // Show a success message to your customer
          }
        })
        .catch((e) => {
          console.log(e);
          router.push(
            `${window.location.origin}/checkout?status=cancel&returnTo=${window.location.href}`,
          );
        });
    }
  };
  return (
    <>
      <Toastify
        ref={successAlert}
        type="success"
        message="Your payment has been successfully received"
      />
      <Toastify ref={errorAlert} type="error" message={errorMessage} />
      <form
        onSubmit={handleSubmit(recurring ? handleSubmitSub : handleSubmitPay)}
        noValidate>
        {!isUserAuthenticated && (
          <>
            <Controller
              name="email"
              control={control}
              rules={{
                required: true,
                pattern: EMAIL_REGEX,
              }}
              render={({ field }) => (
                <TextField
                  name={field.name}
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  error={errors?.email?.type && 'Email is required'}
                  label={Email}
                />
              )}
            />

            <StripeFiledContainer isFocus={isFocus}>
              <CardElement
                options={CARD_OPTIONS}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(e) => {
                  if (e.error) {
                    setErrorMessage(
                      e.error.message ?? 'An unknown error occured',
                    );
                  }
                }}
              />
            </StripeFiledContainer>
            {acceptedPhoneNumber && (
              <Controller
                name="inputnumber"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <PhoneNumberInput
                    value={field.value || ''}
                    onChange={(e) => setValue('inputnumber', e)}
                    helperText="Enter your phone number"
                    onCountryChange={setSelectedCountry}
                  />
                )}
              />
            )}
          </>
        )}
        <BoxStyled4>
          <TextGray12UppercaseBold>{PolicyAdvice}</TextGray12UppercaseBold>
        </BoxStyled4>
        <ButtonContainer>
          <LoadingButton
            loading={isLoading}
            variant="contained"
            type="submit"
            fullWidth
            size="large">
            {textConfirmAndPay}
          </LoadingButton>
        </ButtonContainer>
      </form>
    </>
  );
};
