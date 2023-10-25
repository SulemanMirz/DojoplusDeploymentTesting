import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';

import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';

import { Alert } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';

import { EMAIL_REGEX } from '../../shared/constants';
import {
  TextWhite32CapitalizeBold,
  TextWhite14Regular,
} from '../../shared/components/texts';
import { TextField } from '../../shared/components/Input';
import { useFireBaseAuth } from '../../context/FirebaseContext';
import { Toastify, RefType } from '../../shared/components/Tosatify';

const Title = styled(TextWhite32CapitalizeBold)(`
  text-align: start;
  font-size: 24px;
  margin: 0;
`);

const Content = styled('div')(
  ({ theme }) => `
  position: relative;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: auto;
  margin-right: auto;
  padding-top: 9rem;
  padding-bottom: 0;
  max-width: 550px;
  ${theme.breakpoints.down('sm')}{
    padding-top: 1rem;
  }
`,
);

const TextContainer = styled('div')(`
  display: flex;
  justify-content: flex-start;
  margin-top: 42px;
`);

const TitleDescContainer = styled('div')(`
  margin-bottom: 47px;
`);

const ButtonContainer = styled('div')(`
  margin-top: 230px;
`);

const Logo = styled('svg')(({ theme }) => ({
  maxWidth: 130,
  [theme.breakpoints.down('sm')]: {
    marginTop: '60px',
  },
}));

type FormFieldTypes = {
  email: string;
};

const AuthErrorMessages = {
  'auth/user-not-found': 'No User Found.',
  default: 'Something went wrong',
};

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [authError, setAuthError] = useState(null);
  const successAlert = useRef<RefType>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<FormFieldTypes>();
  const [isLoading, setIsLoading] = useState(false);
  const [existsInAirtable, setExistsInAirtable] = useState(false);
  const [recordId, setRecordId] = useState('');
  const { passwordReset } = useFireBaseAuth();

  const handleFormSubmit = async (data: FormFieldTypes): Promise<void> => {
    setAuthError('');
    setIsLoading(true);
    let finalEmail = data.email;
    if (!EMAIL_REGEX.test(data.email)) {
      const record: any = await axios('/api/User', {
        params: {
          value:
            data.email[0] === '@'
              ? data.email.toLocaleLowerCase().trim()
              : `@${data.email.toLocaleLowerCase().trim()}`,
          key: 'Username',
        },
      }).catch((err) => {
        setAuthError(AuthErrorMessages[err.code] || AuthErrorMessages.default);
      });
      if (record?.data?.email) {
        finalEmail = record.data.email;
        setRecordId(record.data.id);
        setExistsInAirtable(true);
      } else {
        setIsLoading(false);
        setAuthError('Invalid Username or Email');
        return;
      }
    }
    passwordReset(finalEmail)
      .then(() => {
        successAlert.current.call();
        setIsLoading(false);
        reset({ email: '' });
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      })
      .catch(async (error) => {
        if (error.code === 'auth/user-not-found') {
          if (existsInAirtable) {
            router.push(
              `/auth/action?mode=confirmPassword&email=${finalEmail}&id=${recordId}`,
            );
          } else {
            const checkEmailInAirtable: any = await axios('/api/User', {
              params: {
                value: finalEmail,
                key: 'Email',
              },
            }).catch((err) => {
              setAuthError(
                AuthErrorMessages[err.code] || AuthErrorMessages.default,
              );
            });
            if (checkEmailInAirtable.data) {
              router.push(
                `/auth/action?mode=confirmPassword&email=${finalEmail}&id=${checkEmailInAirtable.data.id}`,
              );
            } else {
              setAuthError(
                AuthErrorMessages[error.code] || AuthErrorMessages.default,
              );
            }
          }
        }
        setIsLoading(false);
      });
  };

  const ResetTitle = t('resetPassword');
  const ResetSubtitle = t('forgotPasswordSubtitle');
  const EmailOrUsername = t('emailOrUsername');
  const ResetEmailMessage = t('resetEmailMessage');

  useEffect(() => {
    setValue('email', router.query.email as string);
  }, [router.query.email, setValue]);

  return (
    <Content>
      <Toastify ref={successAlert} message={ResetEmailMessage} type="success" />
      <Logo
        width="120"
        height="25"
        viewBox="0 0 120 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_3058_6276)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.68533 25H19.405L24.9863 19.3741L25.0014 0H0.256104V24.9632H5.86334V5.66054H19.3942V19.3741H8.68533V25ZM119.745 14.4309V10.5648H115.117V5.92276H111.262V10.5648H106.634V14.4309H111.262V19.0729H115.117V14.4309H119.745ZM67.3615 19.372H56.7239V24.9827H67.3615V19.372ZM70.2029 0.0108356V24.9827L75.795 19.372V0.0108356H70.2029ZM103.998 0.0108356V24.9805H87.7097V19.3698H98.3753V5.65187H84.8986V24.9805H79.2741V0.0108356H103.998ZM53.2191 24.9805V0.0108356H28.4954V24.9805H34.1178V5.65187H47.5946V19.3698H36.929V24.9805H53.2191Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_3058_6276">
            <rect
              width="119.489"
              height="25"
              fill="white"
              transform="translate(0.256104)"
            />
          </clipPath>
        </defs>
      </Logo>

      <TextContainer>
        <Title>{ResetTitle}</Title>
      </TextContainer>
      <TitleDescContainer>
        <TextWhite14Regular>{ResetSubtitle}</TextWhite14Regular>
      </TitleDescContainer>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <TextField
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              error={errors?.email?.type && 'Email is required'}
              label={EmailOrUsername}
            />
          )}
        />
        <ButtonContainer>
          {authError && (
            <Alert variant="filled" severity="error" sx={{ mb: 2, mt: 2 }}>
              {authError}
            </Alert>
          )}
          <LoadingButton
            style={{ height: 62 }}
            loadingIndicator={<CircularProgress color="primary" size={20} />}
            loading={isLoading}
            disabled={!watch('email')}
            variant="contained"
            type="submit"
            fullWidth
            size="large"
          >
            {ResetTitle}
          </LoadingButton>
        </ButtonContainer>
      </form>
    </Content>
  );
};

export default ForgotPassword;
