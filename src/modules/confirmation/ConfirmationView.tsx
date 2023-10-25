import React from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

import {
  TextGray12UppercaseBold,
  TextWhite14CapitalizeThin,
  TextWhite32CapitalizeBold,
} from '../../shared/components/texts';

const CheckIcon = styled(CheckCircleOutlineIcon)({
  color: '#fff',
  fontSize: 80,
});

const CardEventIcon = styled(EventAvailableIcon)(({ theme }) => ({
  fontSize: 40,
  color: '#fff',
  [theme.breakpoints.down('sm')]: {
    fontSize: 25,
  },
}));

const CardFmdGoodIcon = styled(FmdGoodIcon)(({ theme }) => ({
  fontSize: 40,
  color: '#fff',
  [theme.breakpoints.down('sm')]: {
    fontSize: 25,
  },
}));

const Title = styled(TextWhite32CapitalizeBold)(`
  text-align: center;
`);

const SubTitle = styled(TextWhite14CapitalizeThin)({
  textTransform: 'inherit',
  textAlign: 'center',
});

const CardsContent = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(5),
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(3),
  },
}));

const Card = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: 'auto',
  border: 'solid 1px #ffffff23',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(3, 0),
}));

const CardIcon = styled('div')({
  width: '20%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const CardContent = styled('div')({
  width: '80%',
  display: 'flex',
  flexDirection: 'column',
});

const TextBox1 = styled(TextGray12UppercaseBold)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 700,
  lineHeight: '20px',
  marginBottom: theme.spacing(1),
}));

const TextBox2 = styled(TextWhite14CapitalizeThin)(`
  font-size: 12px;
  font-weight: 200;
  padding-left: 5px;
`);

const Content = styled('div')(({ theme }) => ({
  maxWidth: 550,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  height: '100%',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(2),
  },
}));

type ConfirmationProps = {
  data: string;
  // schoolId?: string;
};

export const ConfirmationView: React.FC<ConfirmationProps> = ({ data }) => {
  const { t } = useTranslation();
  const SchoolLocation = t('SchoolLocation');
  const WeekPassStars = t('WeekPassStars');
  const CheckInv = t('CheckInv');
  const AllSet = t('AllSet');
  const dateLargeFormat = t('dateLargeFormat');
  const local = t('local');

  const week = dayjs().locale(local);

  return (
    <Content>
      <CheckIcon />
      <Title>{AllSet}</Title>
      <SubTitle>{CheckInv}</SubTitle>
      <CardsContent>
        <Card>
          <CardIcon>
            <CardEventIcon />
          </CardIcon>
          <CardContent>
            <TextBox1>{WeekPassStars}</TextBox1>
            <TextBox2>{week.format(dateLargeFormat)}</TextBox2>
          </CardContent>
        </Card>
        <Card>
          <CardIcon>
            <CardFmdGoodIcon />
          </CardIcon>
          <CardContent>
            <TextBox1>{SchoolLocation}</TextBox1>
            <TextBox2>{data}</TextBox2>
          </CardContent>
        </Card>
      </CardsContent>
    </Content>
  );
};
