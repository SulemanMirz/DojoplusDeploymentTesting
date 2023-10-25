import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert } from '@mui/material';
import router, { useRouter } from 'next/router';

import {
  TextWhite32CapitalizeBold,
  TextWhite14Regular,
} from '../../shared/components/texts';
import { TextField } from '../../shared/components/Input';
import { useFireBaseAuth } from '../../context/FirebaseContext';

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
margin-top: 155px;
`);

const Logo = styled('svg')(({ theme }) => ({
  maxWidth: 130,
  [theme.breakpoints.down('sm')]: {
    marginTop: '60px',
  },
}));

type FormFieldTypes = {
  password: string;
  confirmPassword: string;
};

const AuthErrorMessages = {
  'auth/user-not-found': 'Invalid Username or Email',
  'auth/wrong-password': 'Invalid Password',
  default: 'Something went wrong',
};

const ResetPassword: React.FC = () => {
  const { t } = useTranslation();
  const [authError, setAuthError] = useState(null);

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is mendatory')
      .min(8, 'Add an extra effort'),
    confirmPassword: Yup.string()
      .required('Password is mendatory')
      .oneOf([Yup.ref('password')], 'Password does not match'),
  });
  const formOptions = { resolver: yupResolver(formSchema) };

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormFieldTypes>(formOptions);

  const [isLoading, setIsLoading] = useState(false);
  const { confirmPasswordReset } = useFireBaseAuth();

  const { query } = useRouter();

  const code = query.oobCode;

  const handleFormSubmit = async (data: FormFieldTypes): Promise<any> => {
    setAuthError('');
    setIsLoading(true);
    confirmPasswordReset(code, data.password)
      .then((result) => {
        setIsLoading(false);
        reset({ password: '', confirmPassword: '' });
        router.push('/login');
      })
      .catch((error) => {
        setIsLoading(false);
        setAuthError(
          AuthErrorMessages[error.code] || AuthErrorMessages.default,
        );
      });
    setIsLoading(false);
  };

  const Password = t('password');
  const ResetTitle = t('resetPassword');
  const ConfirmPassword = t('confirmPassword');
  const EnterNewPassword = t('enterNewPassword');

  return (
    <Content>
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
        <TextWhite14Regular>{EnterNewPassword}</TextWhite14Regular>
      </TitleDescContainer>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              error={errors?.password?.message}
              label={Password}
              type="password"
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextField
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              error={errors?.confirmPassword?.message}
              label={ConfirmPassword}
              type="password"
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
            disabled={!(watch('password') && watch('confirmPassword'))}
            type="submit"
            variant="contained"
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

export default ResetPassword;
