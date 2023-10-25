import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import DateRangeOutlinedIconMUI from '@mui/icons-material/DateRangeOutlined';
import AccessTimeIconMUI from '@mui/icons-material/AccessTime';
import RoomIconMUI from '@mui/icons-material/Room';
import styled from 'styled-components';
import dayjs from 'dayjs';

import axios from 'axios';
import { formatPrice } from '../../../shared/utils/ultils';
import {
  TextWhite18UppercaseRegular,
  TextWhite14UppercaseRegular,
} from '../../../shared/components/texts';
import { StepContainer } from '../components/StepContainer';
import { StepTitle } from '../components/StepTitle';
import { PrivateClassDivider } from '../components/PrivateClassDivider';
import { PrivateClasses, User } from '../../../shared/models/user.model';
import Payment from '../../payment';

const List = styled('ul')`
  margin: 0;
  list-style: none;
  padding: 12px;
`;

const ListItem = styled('li')`
  display: flex;
  padding: 12px 0;
`;

const ListItemContent = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ListItemTitle = styled(TextWhite18UppercaseRegular)`
  font-weight: normal;
  color: #fcfcfc;
  text-transform: capitalize;
`;

const ListItemSubTitle = styled(TextWhite14UppercaseRegular)`
  font-weight: normal;
  color: #fcfcfc;
  text-transform: capitalize;
`;

const ListIcon = styled('span')`
  width: 15%;
  padding-top: 4px;
`;

const DateRangeOutlinedIcon = styled(DateRangeOutlinedIconMUI)`
  color: #bdbdbd;
`;

const AccessTimeIcon = styled(AccessTimeIconMUI)`
  color: #bdbdbd;
`;

const RoomIcon = styled(RoomIconMUI)`
  color: #bdbdbd;
`;

const BoxStyled = styled('div')`
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  width: 100%;
  height: 60px;
  border-color: rgba(60, 60, 60, 1);
  border-radius: 0.375rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 18px;
  font-family: 'Saira';
  font-weight: 400;
  line-height: 21.6px;
`;

const BoxStyled3 = styled('div')`
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  width: 100%;
  height: 60px;
  border-color: rgba(60, 60, 60, 1);
  border-radius: 0.375rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 16.8px;
  font-family: 'Saira';
  line-height: 21.6px;
`;

const FloatRight = styled.div`
  float: right;
`;

type Step5Props = {
  data: PrivateClasses;
  instructor: User;
  address: string;
  city: string;
  state: string;
  selectedTime: string;
};

const Step5: React.FC<Step5Props> = ({
  data,
  instructor,
  address,
  city,
  state,
  selectedTime,
}): JSX.Element => {
  const router = useRouter();
  const startTime = dayjs(selectedTime);
  const { t } = useTranslation();
  const ReviewAndPay = t('ReviewAndPay');
  const PriceDetails = t('ReviewAndPay');
  const ServiceFee = t('serviceFee');
  const Total = t('Total');
  const local = t('local');

  const serviceFee = data.classPrice / 5;

  const onSubmit = async (stripeId: string, email: string): Promise<void> => {
    axios
      .post('/api/PrivateClasses', {
        'Class ID': [data.recordId],
        'Instructor Username': [instructor.id],
        'Customer Email': email,
        'Payment Status': 'Paid',
        Currency: data.currency,
        Amount: data.classPrice,
        'Class Date & Time': `${dayjs(`${selectedTime} GMT`)}`,
        'Stripe Date': new Date().toDateString(),
        'Stripe ID': stripeId,
      })
      .then(() => {
        router.push(
          `${window.location.origin}/checkout?status=success&returnTo=${window.location.origin}/${instructor.username}`,
        );
      });

    // const request = {
    //   email: values.email,
    //   // lookupKey: data.lookupKey,
    //   // TODO fake key
    //   lookupKey: '123',
    //   duration: data.duration,
    //   startTime: startTime.toISOString(),
    //   successUrl: `${window.location.origin}/checkout?status=success&returnTo=${window.location.origin}/${query.username}`,
    //   cancelUrl: `${window.location.origin}/checkout?status=cancel&returnTo=${window.location.href}`,
    // };

    // let response;
    // try {
    //   response = await privateClassCheckout(request);
    // } catch (error) {
    //   // console.error('error', JSON.stringify(error));
    //   // eslint-disable-next-line no-alert
    //   alert('The link to make the payment could not be generated');
    //   return;
    // }

    // if (response.privateClassCheckout) {
    //   window.location.replace(response.privateClassCheckout.redirectUrl);
    // }
  };

  return (
    <StepContainer>
      <StepTitle title={ReviewAndPay} />
      <PrivateClassDivider />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <List>
            <ListItem>
              <ListIcon>
                <DateRangeOutlinedIcon />
              </ListIcon>
              <ListItemContent>
                <ListItemTitle>
                  {startTime.locale(local).format('dddd \n MMMM DD')}
                </ListItemTitle>
              </ListItemContent>
            </ListItem>
            <ListItem>
              <ListIcon>
                <AccessTimeIcon />
              </ListIcon>
              <ListItemContent>
                <ListItemTitle>
                  {`${startTime.format('hh:mm A')} - ${startTime
                    .add(1, 'h')
                    .format('hh:mm A')}`}
                </ListItemTitle>
                <ListItemSubTitle>
                  Timezone: Eastern Time Zone (EDT)
                </ListItemSubTitle>
              </ListItemContent>
            </ListItem>
            <ListItem>
              <ListIcon>
                <RoomIcon />
              </ListIcon>
              <ListItemContent>
                <ListItemTitle>{address}</ListItemTitle>
                <ListItemSubTitle>
                  ${city}, ${state}
                </ListItemSubTitle>
              </ListItemContent>
            </ListItem>
          </List>
          <PrivateClassDivider />
        </Grid>
        <Grid item xs={12}>
          <BoxStyled>{PriceDetails}</BoxStyled>
          <BoxStyled3>
            {data.className}
            <FloatRight>
              {formatPrice(data.classPrice, data.currency)}
            </FloatRight>
          </BoxStyled3>
          <BoxStyled3>
            {ServiceFee}
            <FloatRight>{formatPrice(serviceFee, data.currency)}</FloatRight>
          </BoxStyled3>
          <BoxStyled>
            {Total}
            <FloatRight>
              {formatPrice(data.classPrice + serviceFee, data.currency)}
            </FloatRight>
          </BoxStyled>
          <PrivateClassDivider />
        </Grid>
        <Grid item xs={12}>
          <Payment
            handlePaymentSubmit={onSubmit}
            currency={data.currency}
            amount={data.classPrice + serviceFee}
          />
        </Grid>
      </Grid>
    </StepContainer>
  );
};

export default Step5;
