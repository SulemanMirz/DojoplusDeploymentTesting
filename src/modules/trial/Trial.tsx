import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';

import { styled } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

import dayjs from 'dayjs';
import { Toastify, RefType } from '../../shared/components/Tosatify';
import { EMAIL_REGEX } from '../../shared/constants';
import { TextWhite32CapitalizeBold } from '../../shared/components/texts';
import { TextField, Textarea } from '../../shared/components/Input';
import { SchoolSchedules } from '../../shared/models/school.model';

const Title = styled(TextWhite32CapitalizeBold)(`
  text-align: center;
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
  justify-content: center;
  margin-bottom: 1rem;
`);

const ButtonContainer = styled('div')(`
  margin-top: 2rem;
`);

type FormFieldTypes = {
  fullname: string;
  email: string;
  phone: string;
  additionalInformation?: string;
};

type TrialProps = {
  schoolId: string;
  school: SchoolSchedules;
};

export const Trial: React.FC<TrialProps> = ({ schoolId, school }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const successAlert = useRef<RefType>(null);
  const errorAlert = useRef<RefType>(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormFieldTypes>();
  const [isLoading, setIsLoading] = useState(false);
  const dateLargeFormat = t('dateLargeFormat');
  const local = t('local');

  const week = dayjs().locale(local);

  const onSubmit = (data: FormFieldTypes): void => {
    setIsLoading(true);
    axios
      .post('/api/Lead', {
        'Full Name': data.fullname,
        Email: data.email,
        Phone: data.phone,
        School: [schoolId],
        'Additional Information': data.additionalInformation,
        templateModel: {
          url: school.schoolLogo ? school.schoolLogo[0]?.url : '',
          user_name: data.fullname,

          // Mutual
          school_name: school.schoolName,
          school_location: school.address1,
          createAt: week.format(dateLargeFormat),

          // For school email
          fullname: data.fullname,
          email: data.email,
          phone: data.phone,
          description: null,
          schoolEmail: school.email,
        },
      })
      .then((res) => {
        const rout = router.asPath.split('/');
        router.push(`/${rout[1]}/${rout[2]}/confirmation`);
        successAlert.current.call();
        reset({
          fullname: '',
          email: '',
          phone: '',
          additionalInformation: '',
        });
      })
      .catch((e) => {
        console.log('error', JSON.stringify(e));
        errorAlert.current.call();
      })
      .finally(() => setIsLoading(false));
  };

  const SignUpTryFree = t('SignUpTryFree');
  const FullName = t('FullName');
  const Email = t('Email');
  const phone = t('phone');
  const signMeUp = t('signMeUp');
  const AdditionalInf = t('AdditionalInf');

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
      <TextContainer>
        <Title>{SignUpTryFree}</Title>
      </TextContainer>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="fullname"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              error={errors?.fullname?.type && 'Fullname is required'}
              label={FullName}
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
              onChange={field.onChange}
              error={errors?.email?.type && 'Email is required'}
              label={Email}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              error={errors?.phone?.type && 'Phone is required'}
              label={phone}
            />
          )}
        />
        <Controller
          name="additionalInformation"
          control={control}
          render={({ field }) => (
            <Textarea
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              label={AdditionalInf}
            />
          )}
        />
        <ButtonContainer>
          <LoadingButton
            loadingIndicator={<CircularProgress color="primary" size={20} />}
            loading={isLoading}
            type="submit"
            variant="contained"
            fullWidth
            size="large"
          >
            {signMeUp}
          </LoadingButton>
        </ButtonContainer>
        <div style={{ marginBottom: 60 }} />
      </form>
    </Content>
  );
};
