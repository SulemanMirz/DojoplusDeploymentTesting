import React from 'react';
import { Elements } from '@stripe/react-stripe-js';

import getStripe from '../../../utils/get-stripejs';
import { PaymentForm } from './paymentForm';

interface PaymentViewProps {
  handlePaymentSubmit: (
    stripeId: string,
    email: string,
    number?,
    stripeData?,
    country?: string,
  ) => void;
  currency: string;
  amount: number;
  recurring?: boolean | null | undefined;
  priceId?: string | null | undefined;
  isUserAuthenticated?: boolean;
  acceptedPhoneNumber?: boolean;
}
const Payment: React.FC<PaymentViewProps> = ({
  handlePaymentSubmit,
  currency,
  amount,
  recurring,
  priceId,
  isUserAuthenticated,
  acceptedPhoneNumber,
}): JSX.Element => {
  return (
    <>
      <Elements stripe={getStripe()}>
        <PaymentForm
          handlePaymentSubmit={handlePaymentSubmit}
          currency={currency}
          amount={amount}
          recurring={recurring}
          priceId={priceId}
          isUserAuthenticated={isUserAuthenticated}
          acceptedPhoneNumber={acceptedPhoneNumber}
        />
      </Elements>
    </>
  );
};

export default Payment;
