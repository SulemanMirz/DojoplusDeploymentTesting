import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { Alert } from '@mui/material';
import axios from 'axios';
import router from 'next/router';
import { Toastify, RefType } from '../../../shared/components/Tosatify';
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  INVERT_EMAIL_REGEX,
} from '../../../shared/constants';
import {
  TextWhite32CapitalizeBold,
  TextWhite14Regular,
  TextWhite12Regular,
  TextWhite12Underline,
  TextWhite12Regular400,
} from '../../../shared/components/texts';
import { TextField } from '../../../shared/components/Input';
import { useFireBaseAuth } from '../../../context/FirebaseContext';
import AppLoadingButton from '../../../shared/components/AppLoadingButton';

const Title = styled(TextWhite32CapitalizeBold)(`
  font-weight:600;
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

const TermsContainer = styled('div')(`
  margin-top: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
`);

const ButtonContainer = styled('div')(`
  margin-top: 20px;
`);

const Logo = styled('svg')(({ theme }) => ({
  maxWidth: 130,
  [theme.breakpoints.down('sm')]: {
    marginTop: '60px',
  },
}));

const HaveAccountTextContainer = styled('div')(`
  display: flex; 
  justify-content: center;
  margin-bottom: 59px;
  user-select: none;
`);

type FormFieldTypes = {
  username: string;
  email: string;
  password: string;
};

const AuthErrorMessages = {
  'auth/weak-password': 'Password must be at least 6 characters long',
  'auth/email-already-in-use': 'Email already in use',
  default: 'Something went wrong',
};

interface RegisterFormViewProps {
  onChangeStep: (data: {
    _step: number;
    emailParam: string | null | undefined;
    usernameParam: string | null | undefined;
    recordIdParam: string;
  }) => void;
}

const RegisterForm: React.FC<RegisterFormViewProps> = ({ onChangeStep }) => {
  const { t } = useTranslation();
  const successAlert = useRef<RefType>(null);
  const errorAlert = useRef<RefType>(null);
  const [authError, setAuthError] = useState(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<FormFieldTypes>();
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAlreadyTaken, setIsUserAlreadyTaken] = useState(false);
  const [isEmailTaken, setIsEmailTaken] = useState(false);
  const { createUserWithEmailAndPassword, sendVerificationEmail } =
    useFireBaseAuth();

  const handleFormSubmit = async (data: FormFieldTypes): Promise<void> => {
    setIsLoading(true);
    setAuthError(null);
    setIsUserAlreadyTaken(false);
    setIsEmailTaken(false);
    const requests = [];
    let usernameAvailable;
    let emailAvailable;
    requests.push(
      axios('/api/User', {
        params: {
          username: data.username.toLocaleLowerCase().trim(),
        },
      }),
    );
    requests.push(
      axios('/api/User', {
        params: {
          key: 'email',
          value: data.email.toLocaleLowerCase().trim(),
        },
      }),
    );
    await Promise.all(requests)
      .then((res) => {
        usernameAvailable = res[0].data.length > 0;
        emailAvailable = Boolean(res[1].data);
      })
      .catch((e) => console.log(e, 'e'));
    if (usernameAvailable) {
      setIsUserAlreadyTaken(true);
      setIsLoading(false);
      return;
    }
    if (emailAvailable) {
      setIsEmailTaken(true);
      setIsLoading(false);
      return;
    }
    createUserWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        sendVerificationEmail();
        if (result.additionalUserInfo.isNewUser) {
          axios
            .post('/api/User', {
              Username: data.username.toLocaleLowerCase().trim(),
              Email: data.email.toLocaleLowerCase().trim(),
              'Firebase ID': result.user.multiFactor.user.uid,
            })
            .then((res) => {
              onChangeStep({
                _step: 2,
                emailParam: data.email.toLocaleLowerCase().trim(),
                usernameParam: data.username.toLocaleLowerCase().trim(),
                recordIdParam: res.data.id,
              });
              setIsLoading(false);
            });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setAuthError(
          AuthErrorMessages[error.code] || AuthErrorMessages.default,
        );
      });
  };

  const RegisterFree = t('registerFree');
  const RegisterFreeDesc = t('registerFreeDesc');
  const Username = t('username');
  const Email = t('Email');
  const Password = t('password');
  const signUp = t('signUp');
  const UsernameHelperText = t('usernameHelperText');
  const EmailHelperText = t('emailHelperText');
  const PasswordHelperText = t('passwordHelperText');
  const RegisterTermsInitial = t('registerTermsInitial');
  const TermsAndConditions = t('terms&conditions');
  const Login = t('login');
  const AlreadyHaveAccount = t('AlreadyHaveAccount');

  return (
    <Content>
      <Toastify
        ref={successAlert}
        type="success"
        message="Trial sign up created"
      />
      <Toastify
        ref={errorAlert}
        type="error"
        message="Error, Something is wrong"
      />
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
        <Title>{RegisterFree}</Title>
      </TextContainer>
      <TitleDescContainer>
        <TextWhite14Regular style={{ fontWeight: 400 }}>
          {RegisterFreeDesc}
        </TextWhite14Regular>
      </TitleDescContainer>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Controller
          name="username"
          control={control}
          rules={{
            required: true,
            validate: (value) => Boolean(value.match(INVERT_EMAIL_REGEX)),
          }}
          render={({ field }) => (
            <TextField
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              onChange={(e) => {
                if (isUserAlreadyTaken) setIsUserAlreadyTaken(false);
                if (e && e.indexOf('@') === -1) {
                  field.onChange(`@${e}`);
                  return;
                }
                field.onChange(e);
              }}
              error={
                isUserAlreadyTaken
                  ? `Username "${field.value}" is already taken.`
                  : errors?.username?.type && 'Username is Not Valid'
              }
              label={Username}
              helperText={UsernameHelperText}
            />
          )}
        />
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
              onChange={(e) => {
                if (isEmailTaken) setIsEmailTaken(false);
                field.onChange(e);
              }}
              error={
                (isEmailTaken && `Email "${field.value}" is already taken.`) ||
                (errors?.email?.type &&
                  (errors?.email?.type === 'pattern'
                    ? 'Hmm... that email doesn\'t look valid'
                    : 'Email is required'))
              }
              label={Email}
              helperText={EmailHelperText}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true, pattern: PASSWORD_REGEX }}
          render={({ field }) => (
            <TextField
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              error={
                errors?.password?.type &&
                (errors?.password?.type === 'pattern'
                  ? 'Add an extra effort'
                  : 'Password is required')
              }
              label={Password}
              helperText={PasswordHelperText}
              type="password"
            />
          )}
        />

        <TermsContainer>
          <TextWhite12Regular400>{RegisterTermsInitial}</TextWhite12Regular400>
          <TextWhite12Underline style={{ fontSize: '12px', fontWeight: 400 }}>
            {TermsAndConditions}
          </TextWhite12Underline>
        </TermsContainer>
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
            disabled={
              !(watch('email') && watch('username') && watch('password')) ||
              Boolean(errors.email || errors.password || errors.username)
            }
            type="submit"
            fullWidth
            size="large"
            text={signUp}
          />
        </ButtonContainer>

        <div style={{ marginBottom: 10 }} />
      </form>

      <HaveAccountTextContainer>
        <TextWhite12Regular style={{ cursor: 'pointer', fontWeight: 400 }}>
          {AlreadyHaveAccount}{' '}
        </TextWhite12Regular>
        <TextWhite12Underline
          style={{ fontWeight: 400 }}
          onClick={() => router.push('/login')}
        >
          {Login}
        </TextWhite12Underline>
      </HaveAccountTextContainer>
    </Content>
  );
};

export default RegisterForm;
