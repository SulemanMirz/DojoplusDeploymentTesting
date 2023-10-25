import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import DateRangeOutlinedIconMUI from '@mui/icons-material/DateRangeOutlined';
import AccessTimeIconMUI from '@mui/icons-material/AccessTime';
import RoomIconMUI from '@mui/icons-material/Room';
import styled from 'styled-components';

import axios from 'axios';
import { formatPrice } from '../../../../shared/utils/ultils';
import {
  TextWhite18UppercaseRegular,
  TextWhite14UppercaseRegular,
} from '../../../../shared/components/texts';
import { StepContainer } from '../../../private-class/components/StepContainer';
import { StepTitle } from '../../../private-class/components/StepTitle';
import { PrivateClassDivider } from '../../../private-class/components/PrivateClassDivider';
import Payment from '../../../payment';
import { Seminar } from '../../../../shared/models/Seminar.model';

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
  data: Seminar;
  address: string;
  date: string;
  time: string;
  tickets: { members: number; nonMembers: number };
};

const Step5: React.FC<Step5Props> = ({
  data,
  address,
  date,
  time,
  tickets,
}): JSX.Element => {
  const router = useRouter();
  const { username } = router.query;
  const { t } = useTranslation();
  const ReviewAndPay = t('ReviewAndPay');
  const PriceDetails = t('PriceDetails');
  const ServiceFee = t('serviceFee');
  const Total = t('Total');
  const Members = t('members');
  const Tickets = t('tickets');

  const price =
    data.priceMembers * tickets.members +
    data.priceNonMembers * tickets.nonMembers;
  const serviceFee =
    (data.priceMembers * tickets.members +
      data.priceNonMembers * tickets.nonMembers) /
    5;
  const onSubmit = async (stripeId: string, email: string): Promise<void> => {
    axios
      .post('/api/Seminars', {
        Seminar: [data.id],
        Status: 'Done',
        'Stripe Transaction ID': stripeId,
      })
      .then((res) => {
        router.push(
          `${window.location.origin}/checkout?status=success&returnTo=${window.location.origin}/${username}/seminars`,
        );
      });
  };

  return (
    <StepContainer>
      <StepTitle title={ReviewAndPay} />
      <PrivateClassDivider />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <List>
            {date && (
              <ListItem>
                <ListIcon>
                  <DateRangeOutlinedIcon />
                </ListIcon>
                <ListItemContent>
                  <ListItemTitle>{date}</ListItemTitle>
                </ListItemContent>
              </ListItem>
            )}
            {time && (
              <ListItem>
                <ListIcon>
                  <AccessTimeIcon />
                </ListIcon>
                <ListItemContent>
                  <ListItemTitle>{time}</ListItemTitle>
                  <ListItemSubTitle>
                    Timezone: Eastern Time Zone (EDT)
                  </ListItemSubTitle>
                </ListItemContent>
              </ListItem>
            )}
            {(address || data?.school?.schoolName) && (
              <ListItem>
                <ListIcon>
                  <RoomIcon />
                </ListIcon>
                <ListItemContent>
                  <ListItemTitle>{data?.school?.schoolName}</ListItemTitle>
                  <ListItemSubTitle>{address}</ListItemSubTitle>
                </ListItemContent>
              </ListItem>
            )}
          </List>
          <PrivateClassDivider />
        </Grid>
        <Grid item xs={12}>
          <BoxStyled>{PriceDetails}</BoxStyled>
          <BoxStyled3>
            {`${Members} x ${tickets.members + tickets.nonMembers} ${Tickets}`}
            <FloatRight>{formatPrice(price, data.currency)}</FloatRight>
          </BoxStyled3>
          <BoxStyled3>
            {ServiceFee}
            <FloatRight>{formatPrice(serviceFee, data.currency)}</FloatRight>
          </BoxStyled3>
          <BoxStyled>
            {Total}
            <FloatRight>
              {formatPrice(price + serviceFee, data.currency)}
            </FloatRight>
          </BoxStyled>
          <PrivateClassDivider />
        </Grid>
        <Grid item xs={12}>
          <Payment
            handlePaymentSubmit={onSubmit}
            currency={data.currency}
            amount={price + serviceFee}
          />
        </Grid>
      </Grid>
    </StepContainer>
  );
};

export default Step5;
