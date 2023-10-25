import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { Box, Grid } from '@mui/material';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import RoomIcon from '@mui/icons-material/Room';
import styled from 'styled-components';

import { formatPrice } from '../../../shared/utils/ultils';

import {
  TextWhite32CapitalizeBold,
} from '../../../shared/components/texts';
// import { Product } from '../../../shared/types/generated';
import { Product } from '../../../shared/models/school.model';
import Payment from '../../payment';

const Content = styled(Box)`
  width: 100%;
  max-width: 768px;
  position: relative;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: auto;
  margin-right: auto;
  padding-top: 0;
  padding-bottom: 40px;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
`;

const Container = styled(Box)`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const BoxStyled = styled(Box)`
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

const BoxStyled3 = styled(Box)`
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

const Div = styled.div`
  margin-left: 26px;
  margin-top: -30px;
`;

const FloatRight = styled.div`
  float: right;
`;

type School = {
  address1: string;
  state: string;
  city: string;
  zip: string;
};

type Step3Props = {
  plan: Product;
  school: School;
};

const Step3: React.FC<Step3Props> = ({ plan, school }): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();
  const local = t('local');
  const date = dayjs().locale(local);

  const day = t(dayjs().format('dddd').toLowerCase());
  const dayComplete = date.format(t('dateLargeFormat'));
  const priceDetailTranslation = t('PriceDetails');
  const ReviewPayMembership = t('ReviewPayMembership');

  const onSubmit = async (stripeId: string, email: string): Promise<void> => {
    router.push(
      `${window.location.origin}/checkout?status=success&returnTo=${window.location.href}`,
    );
  };

  return (
    <Container>
      <Content>
        <TextWhite32CapitalizeBold>
          {ReviewPayMembership}
        </TextWhite32CapitalizeBold>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <BoxStyled>
              <DateRangeOutlinedIcon />
              <Div>
                {day}
                <br />
                {dayComplete}
              </Div>
            </BoxStyled>
            <BoxStyled>
              <RoomIcon />
              <Div>
                {school.address1}
                <br />
                {school.city}, {school.state} {school.zip}
              </Div>
            </BoxStyled>
            <hr />
          </Grid>
          <Grid item xs={12}>
            <BoxStyled>{priceDetailTranslation}</BoxStyled>
            <BoxStyled3>
              {plan.planName}
              <FloatRight>{formatPrice(plan.price, plan.currency)}</FloatRight>
            </BoxStyled3>
            <BoxStyled3>
              Service Fee
              <FloatRight>
                {formatPrice(plan.setupFee, plan.currency)}
              </FloatRight>
            </BoxStyled3>
            <BoxStyled>
              Total
              <FloatRight>
                {formatPrice(plan.price + (plan.setupFee || 0), plan.currency)}
              </FloatRight>
            </BoxStyled>
            <hr />
          </Grid>
          <Grid item xs={12}>
            <Payment
              currency={plan.currency}
              amount={plan.price + plan.setupFee}
              handlePaymentSubmit={onSubmit}
              recurring={plan.type === 'Recurring'}
              priceId={plan.stripePriceId}
            />
          </Grid>
        </Grid>
      </Content>
    </Container>
  );
};

export default Step3;
