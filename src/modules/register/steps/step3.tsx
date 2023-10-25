import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';

import { styled } from '@mui/material/styles';

import axios from 'axios';
import { useRouter } from 'next/router';
import { Toastify, RefType } from '../../../shared/components/Tosatify';
import {
  TextWhite32CapitalizeBold,
  TextWhite14Regular,
} from '../../../shared/components/texts';
import { TextField } from '../../../shared/components/Input';
import AppLoadingButton from '../../../shared/components/AppLoadingButton';

const Title = styled(TextWhite32CapitalizeBold)(`
  text-align: start;
  font-size: 24px;
  margin: 0;
  font-weight:600;
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
  height: 100%;
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
  margin-bottom: 30px;
`);

const ButtonContainer = styled('div')(`      
  margin-top:120px;
`);

const Logo = styled('svg')(({ theme }) => ({
  maxWidth: 130,
  [theme.breakpoints.down('sm')]: {
    marginTop: '60px',
  },
}));

type FormFieldTypes = {
  firstName: string;
  lastName: string;
  instagram: string;
};

interface Step3ViewProps {
  emailParam: string;
  recordId: string;
}

const RegisterForm: React.FC<Step3ViewProps> = ({ recordId, emailParam }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const successAlert = useRef<RefType>(null);
  const errorAlert = useRef<RefType>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<FormFieldTypes>();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data: FormFieldTypes): Promise<void> => {
    setIsLoading(true);
    axios
      .put('/api/User', {
        data: {
          id: recordId,
          fields: {
            'First Name': data.firstName,
            'Last Name': data.lastName,
            Instagram: data.instagram,
          },
        },
      })
      .then(() => {
        const emails = JSON.parse(localStorage.getItem('emails') || '[]');
        if (emails && emails.length > 0) {
          if (!emails.find((email) => email === emailParam)) {
            localStorage.setItem(
              'emails',
              JSON.stringify([...emails, emailParam]),
            );
          }
        } else {
          localStorage.setItem('emails', JSON.stringify([emailParam]));
        }
        router.push('/home');
      });
  };

  const PersonalInfo = t('personalInfo');
  const PersonalInfoDesc = t('personalInfoDesc');
  const FirstName = t('firstName');
  const LastName = t('lastName');
  const Instagram = t('instagram');
  const Continue = t('continue');
  const FirstNameHelper = t('firstNameHelper');
  const LastNameHelper = t('lastNameHelper');
  const InstagramHelper = t('instagramHelper');

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
        <Title>{PersonalInfo}</Title>
      </TextContainer>
      <TitleDescContainer>
        <TextWhite14Regular style={{ fontWeight: 400 }}>
          {PersonalInfoDesc}
        </TextWhite14Regular>
      </TitleDescContainer>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Controller
          name="firstName"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              error={errors?.firstName?.type && 'First Name is required'}
              label={FirstName}
              helperText={FirstNameHelper}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              error={errors?.lastName?.type && 'Last Name is required'}
              label={LastName}
              helperText={LastNameHelper}
            />
          )}
        />
        <Controller
          name="instagram"
          control={control}
          render={({ field }) => (
            <TextField
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              label={Instagram}
              helperText={InstagramHelper}
            />
          )}
        />
        <ButtonContainer>
          <AppLoadingButton
            sx={{
              height: 72,
              fontSize: '20px',
              fontWeight: 600,
            }}
            fullWidth
            text={Continue}
            loading={isLoading}
            type="submit"
            disabled={!(watch('firstName') && watch('lastName'))}
          />
        </ButtonContainer>
        <div style={{ marginBottom: '84px' }} />
      </form>
    </Content>
  );
};

export default RegisterForm;
