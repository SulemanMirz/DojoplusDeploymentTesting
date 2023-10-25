import React from 'react';
import { useTranslation } from 'react-i18next';

import { styled } from '@mui/material/styles';

import {
  TextWhite32CapitalizeBold,
  TextWhite14Regular,
} from '../../../shared/components/texts';
import AppLoadingButton from '../../../shared/components/AppLoadingButton';

const Title = styled(TextWhite32CapitalizeBold)(`
  text-align: start;
  font-size: 24px;
  font-weight: 600;
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
  height: 100%;
  ${theme.breakpoints.down('sm')}{
    padding-top: 6rem;
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

const Container = styled('div')(`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
`);

const ButtonContainer = styled('div')(
  ({ theme }) => `
    position: absolute;
    width: 100%;
    bottom: 144px;
    ${theme.breakpoints.down('sm')}{
      bottom: 96px;
  }
  `,
);

const Logo = styled('svg')(({ theme }) => ({
  maxWidth: 130,
}));

interface ConfirmationViewProps {
  email: string;
  username: string;
  onChangeStep: (data: {
    _step: number;
    emailParam?: string | null | undefined;
    usernameParam?: string | null | undefined;
    recordIdParam?: string;
  }) => void;
}
const RegisterForm: React.FC<ConfirmationViewProps> = ({
  email,
  username,
  onChangeStep,
}) => {
  const { t } = useTranslation();

  const SignupUsersGreetings = t('signupUsersGreetings');
  const EmailConfirmation = t('emailConfirmation');
  const GoToProfile = t('goToProfile');

  if (!email || !username) {
    return <Container>ups!! something is wrong :(</Container>;
  }

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
        <Title>
          {SignupUsersGreetings}
          <span role="img" aria-label="">
            {' '}
            🤜🤛
          </span>
        </Title>
      </TextContainer>
      <TitleDescContainer>
        <TextWhite14Regular
          style={{
            fontWeight: 400,
          }}
        >{`${EmailConfirmation}(${email})`}</TextWhite14Regular>
      </TitleDescContainer>

      <ButtonContainer>
        <AppLoadingButton
          sx={{
            height: 72,
            fontSize: '20px',
            fontWeight: 600,
          }}
          fullWidth
          onClick={() => onChangeStep({ _step: 3 })}
          text={GoToProfile}
        />
      </ButtonContainer>
    </Content>
  );
};

export default RegisterForm;
