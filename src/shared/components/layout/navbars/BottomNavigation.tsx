import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import BottomNavigationMUI from '@mui/material/BottomNavigation';
import BottomNavigationActionMUI from '@mui/material/BottomNavigationAction';

import SmsIcon from '@mui/icons-material/Sms';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import PhoneIconMUI from '@mui/icons-material/Phone';
import DirectionsOutlinedIcon from '@mui/icons-material/DirectionsOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { getPhoneLink } from '../../../utils/phone-links';
import { Container } from '../Container';

const SpaceBar = styled('div')({
  height: 70,
});

const BottomNavigationAction = styled(BottomNavigationActionMUI)(
  ({ theme }) => ` 
  ${theme.breakpoints.down('sm')}{   
    min-width: 65px;
  }
`,
);

const NavigationContainer = styled('div')(({ theme }) => ({
  boxShadow: '0px -3px 0px rgba(24, 24, 24, 0.35)',
  backgroundColor: theme.palette.backgroundDarkGray.main,
  position: 'fixed',
  bottom: 0,
  width: '100%',
}));

const Nav = styled('nav')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
  },
}));

const Navigation = styled(BottomNavigationMUI)(({ theme }) => ({
  backgroundColor: theme.palette.backgroundDarkGray.main,
  height: 70,
  '& > button': {
    color: '#fff',
  },
  '& .MuiBottomNavigationAction-label': {
    fontWeight: '500',
    paddingTop: theme.spacing(0.5),
    [theme.breakpoints.down('sm')]: {
      fontSize: '11px',
    },
  },
  '.Mui-selected': {
    color: `${theme.palette.primary.light} !important`,
    fontSize: '12px  !important',
    [theme.breakpoints.down('sm')]: {
      fontSize: '11px  !important',
    },
  },
}));

const Logo = styled('img')(({ theme }) => ({
  maxWidth: 130,
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const PhoneIcons: React.FC<{ type: string }> = ({ type }) => {
  if (type === 'WHATSAPP') {
    return <WhatsAppIcon />;
  }

  if (type === 'SMS') {
    return <SmsIcon />;
  }

  return <PhoneIconMUI />;
};

type BottomNavigationProps = {
  phoneType: string;
  phoneNumber?: string;
  plans?: boolean;
};

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  phoneNumber,
  phoneType,
  plans = true,
}) => {
  const { query, push, asPath } = useRouter();
  const schoolId = typeof query?.schoolId === 'string' ? query.schoolId : '';

  const pathGenerator = (tail: 'location' | 'schedule' | 'plans'): string =>
    `/school/${schoolId}/${tail}`;

  const openPhone = (number?: string): void => {
    console.log(number);
    const body = document.getElementsByTagName('body')[0];
    if (body) {
      const link = document.createElement('a');
      body.appendChild(link);
      link.style.display = 'none';
      link.href = number;
      link.click();
      link.remove();
    }
  };

  const onChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string,
  ): void => {
    const isPhone = value.startsWith('phone');
    const phone = value.split('-')[1];
    if (isPhone && phone?.length) {
      openPhone(phone);
      return;
    }

    if (isPhone && !phone?.length) {
      // eslint-disable-next-line no-alert
      alert('This school does not have a phone');
    }

    if (!isPhone && value?.length) {
      push(value, null, {
        shallow: true,
      });
    }
  };

  const { t } = useTranslation();
  const Directions = t('Directions').toUpperCase();
  const Plans = t('Plans').toUpperCase();
  const phone = t('phone').toUpperCase();
  const Schedule = t('Schedule').toUpperCase();

  return (
    <>
      <SpaceBar />
      <NavigationContainer>
        <Container>
          <Nav>
            <Navigation showLabels value={asPath} onChange={onChange}>
              <BottomNavigationAction
                value={pathGenerator('schedule')}
                label={Schedule}
                icon={<DateRangeOutlinedIcon />}
              />
              <BottomNavigationAction
                value={pathGenerator('location')}
                label={Directions}
                icon={<DirectionsOutlinedIcon />}
              />
              <BottomNavigationAction
                value={`phone-${getPhoneLink(phoneNumber, phoneType)}`}
                label={phoneType || phone}
                icon={<PhoneIcons type={phoneType} />}
              />
              {plans && (
                <BottomNavigationAction
                  value={pathGenerator('plans')}
                  label={Plans}
                  icon={<AssignmentOutlinedIcon />}
                />
              )}
            </Navigation>
            <Logo src="/assets/logo/logo.svg" alt="logo" />
          </Nav>
        </Container>
      </NavigationContainer>
    </>
  );
};
