import React from 'react';
import styled from 'styled-components';
import { Box, Button, Grid } from '@mui/material';
import axios from 'axios';
import Payment from '../../../payment';
import { formatPrice } from '../../../../shared/utils/ultils';
import { Plans } from '../../../../shared/models/school.model';
import { TextField } from '../../../../shared/components/Input';
import { useFireBaseAuth } from '../../../../context/FirebaseContext';

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
  overflow-y: scroll;
`;

const PriceContainer = styled.div`
  width: 100%;
  padding-inline: 20px;
  margin-bottom: 36px;
`;
const PriceTitle = styled.div`
  border-top: 1px solid #404040;
  padding-top: 28px;
  margin-bottom: 12px;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
`;
const AdultMemberShip = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ServiceContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TotalFeeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;
const TotalTitle = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
`;
const TotalPrice = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
`;
const Name = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  white-space: nowrap;
  width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Price = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
`;
const ServicePrice = styled.div`
  font-family: 'Saira';
  margin-top: 8px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
`;
const ServiceTitle = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  margin-top: 8px;
`;

const TextStyled = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
`;

const CardDetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  justify-content: center;
  padding-top: 28px;
`;

const Title = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  margin-top: 12px;
`;
const Description = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #828282 !important;
`;

const ReviewPayTitle = styled.div`
  margin-top: 54px;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  padding-inline: 14px;
  margin-bottom: 30px;
`;

const InputDescriptionContainer = styled.div`
  margin-top: 10px;
`;

const IconNumberCard = styled.div`
  width: 88%;
`;

type AddSchoolPlanModalProps = {
  addPlansData: Plans;
  setIsUserAuthenticated?: (isUserAuthenticated: boolean) => void;
  isUserAuthenticated?: boolean;
  handleConfirmModal?: () => void;
};

const BuyPlanModal: React.FC<AddSchoolPlanModalProps> = ({
  addPlansData,
  setIsUserAuthenticated,
  isUserAuthenticated,
  handleConfirmModal,
}) => {
  const { authUser } = useFireBaseAuth();
  const onSubmit = async (
    stripeId: string,
    email: string,
    number?: string,
    stripeData?,
    country?,
  ): Promise<void> => {
    axios
      .post(
        '/api/Plans/members',
        {
          'Stripe ID': stripeData?.paymentIntent?.id,
          'Stripe Date': new Date(stripeData?.paymentIntent?.created * 1000),
          'Phone Number': number,
          Plan: [addPlansData?.id],
          Country: country,
        },
        {
          params: {
            username: authUser?.userInfo?.username,
          },
        },
      )
      .then(({ data }) => {
        handleConfirmModal();
      })
      .catch((error) => console.log('error: ', error));
    // router.push(
    //   `${window.location.origin}/checkout?status=success&returnTo=${window.location.href}`,
    // );
  };

  return (
    <Content>
      <ReviewPayTitle>Review and pay for your membership</ReviewPayTitle>

      <Grid container spacing={2}>
        <PriceContainer>
          <PriceTitle>Price Details</PriceTitle>
          <AdultMemberShip>
            <Name>{addPlansData?.planName}</Name>
            <Price>
              {formatPrice(
                addPlansData?.price as number,
                addPlansData?.currency,
              )}
            </Price>
          </AdultMemberShip>
          <ServiceContainer>
            <ServiceTitle>Service Fee</ServiceTitle>
            <ServicePrice>
              {formatPrice(
                parseFloat(addPlansData?.setupFee as string),
                addPlansData?.currency,
              )}
            </ServicePrice>
          </ServiceContainer>
          <TotalFeeContainer>
            <TotalTitle>Total ({addPlansData?.currency})</TotalTitle>
            <TotalPrice>
              {' '}
              {formatPrice(
                parseFloat(
                  `${addPlansData?.price} ( ${addPlansData?.setupFee})` as string,
                ),
                addPlansData?.currency,
              )}
            </TotalPrice>
          </TotalFeeContainer>
        </PriceContainer>
        <Grid
          item
          xs={12}
          sx={{
            borderTop: '1px solid #404040',
          }}>
          <Title>Discount</Title>
          <InputDescriptionContainer>
            <Description>Gift Cards, Vouchers & Promotional Codes</Description>
            <TextField
              name="EnterCode"
              value=""
              onChange={() => {}}
              label="EnterCode"
            />
          </InputDescriptionContainer>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            marginTop: '12px',
            borderTop: '1px solid #404040',
          }}>
          <TextStyled>Pay with</TextStyled>
          {isUserAuthenticated && (
            <>
              <CardDetailContainer>
                <IconNumberCard>Working</IconNumberCard>
                <Button
                  sx={{
                    padding: '12px !important',
                    backgroundColor: '#282828 !important',
                    border: '1px solid #4F4F4F !important',
                  }}
                  size="small"
                  variant="contained"
                  onClick={() => setIsUserAuthenticated(false)}>
                  EDIT
                </Button>
              </CardDetailContainer>
            </>
          )}
        </Grid>

        <Grid item xs={12}>
          <Payment
            currency={addPlansData?.currency}
            amount={parseFloat(
              `${addPlansData?.price}  ${addPlansData?.setupFee}`,
            )}
            handlePaymentSubmit={onSubmit}
            recurring={addPlansData?.type === 'Recurring'}
            priceId={addPlansData?.stripePriceId}
            acceptedPhoneNumber
          />
        </Grid>
      </Grid>
    </Content>
  );
};

export default BuyPlanModal;
