import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { Alert } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { EMAIL_REGEX } from '../../shared/constants';
import {
  TextWhite32CapitalizeBold,
  TextWhite12Regular,
  TextWhite12Underline,
  TextWhite12Regular400,
} from '../../shared/components/texts';
import { TextField } from '../../shared/components/Input';
import { useFireBaseAuth } from '../../context/FirebaseContext';
import AppLoadingButton from '../../shared/components/AppLoadingButton';

const Title = styled(TextWhite32CapitalizeBold)(`
  font-weight: 600;
  text-align: start;
  font-size: 24px;
  line-height: 28.8px;
  margin-bottom: 0px;
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

const TermsContainer = styled('div')(`
  margin-top: 18px;
`);

const ButtonContainer = styled('div')(`
  margin-top:69px;
`);

const HaveAccountTextContainer = styled('div')(`
  margin-top: 11px;
  margin-bottom: 47px;
`);

const Logo = styled('svg')(({ theme }) => ({
  maxWidth: 130,
  [theme.breakpoints.down('sm')]: {
    marginTop: '60px',
  },
}));

type FormFieldTypes = {
  email: string;
  password: string;
};

const AuthErrorMessages = {
  'auth/user-not-found': 'Invalid Username or Email',
  'auth/wrong-password': 'Invalid Password',
  default: 'Something went wrong',
};

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [authError, setAuthError] = useState(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormFieldTypes>();
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithEmailAndPassword } = useFireBaseAuth();

  const handleFormSubmit = async (data: FormFieldTypes): Promise<any> => {
    setAuthError('');
    setIsLoading(true);
    let finalEmail = data.email;
    if (!EMAIL_REGEX.test(data.email)) {
      const record = await axios('/api/User', {
        params: {
          value:
            data.email[0] === '@'
              ? data.email.toLocaleLowerCase().trim()
              : `@${data.email.toLocaleLowerCase().trim()}`,
          key: 'Username',
        },
      });
      if (record?.data?.email) {
        finalEmail = record.data.email;
      } else {
        setIsLoading(false);
        setAuthError('Invalid Username or Email');
        return;
      }
    }
    signInWithEmailAndPassword(finalEmail, data.password)
      .then(() => {
        axios('/api/User', {
          params: {
            value: finalEmail,
            key: 'Email',
          },
        }).then((res) => {
          const emails = JSON.parse(localStorage.getItem('emails') || '[]');
          if (emails && emails.length > 0) {
            if (!emails.find((email) => email === finalEmail)) {
              localStorage.setItem(
                'emails',
                JSON.stringify([...emails, finalEmail]),
              );
            }
          } else {
            localStorage.setItem('emails', JSON.stringify([finalEmail]));
          }
          if (window && router.query.returnTo) {
            window.location.replace(router.query.returnTo as string);
            return;
          }
          router.push('/home');
        });
      })
      .catch((error) => {
        setIsLoading(false);
        setAuthError(
          AuthErrorMessages[error.code] || AuthErrorMessages.default,
        );
      });
  };

  useEffect(() => {
    return (
      router.query.email && setValue('email', router.query.email as string)
    );
  }, [router.query.email, setValue]);

  const GetinYourDojo = t('getinYourDojo');
  const EmailOrUsername = t('emailOrUsername');
  const Password = t('password');
  const ForgotPassword = t('forgotPassword');
  const Login = t('login');
  const HaveAccount = t('dontHaveAccount');
  const SignUp = t('signUp');

  return (
    <Content>
      <Logo
        width="120"
        height="25"
        viewBox="0 0 120 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
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
        <Title>{GetinYourDojo}</Title>
      </TextContainer>
      <HaveAccountTextContainer>
        <TextWhite12Regular400 style={{ cursor: 'pointer' }}>
          {HaveAccount}
          {'   '}
        </TextWhite12Regular400>
        <TextWhite12Underline
          style={{ fontSize: '12px', fontWeight: 400 }}
          onClick={() => router.push('/register')}>
          {SignUp}
        </TextWhite12Underline>
      </HaveAccountTextContainer>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            // pattern: EMAIL_REGEX,
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
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              error={errors?.password?.type && 'Password is required'}
              label={Password}
              type="password"
            />
          )}
        />
        <Link href="/forgotPassword">
          <TermsContainer>
            <TextWhite12Regular style={{ cursor: 'pointer' }}>
              {ForgotPassword}
            </TextWhite12Regular>
          </TermsContainer>
        </Link>
        <ButtonContainer>
          {authError && (
            <Alert variant="filled" severity="error" sx={{ mb: 2, mt: 2 }}>
              {authError}
            </Alert>
          )}
          <AppLoadingButton
            sx={{
              height: 72,
              fontSize: '20px',
              fontWeight: 600,
            }}
            loading={isLoading}
            disabled={!(watch('email') && watch('password'))}
            text={Login}
            type="submit"
            fullWidth
            size="large"
          />
        </ButtonContainer>
      </form>
    </Content>
  );
};

export default LoginForm;
