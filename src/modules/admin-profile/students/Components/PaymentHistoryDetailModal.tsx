import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { Plans } from '../../../../shared/models/school.model';

const PaymentContainer = styled.div`
  width: 100%;
  margin-top: 49px;
  padding-inline: 44px;
  border-radius: 4px;
`;

const PaymentHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PaymentCategoryContainer = styled.div``;

const PaymentCategory = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: #fcfcfc;
`;

const PaymentDate = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #fcfcfc;
  margin-top: 7px;
`;

const PaymentPrice = styled.div`
  margin-top: 6px;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
`;

const Wrapper = styled.div``;

const Divider = styled.div`
  margin-top: 18px;
  margin-bottom: 4px;
  height: 1px;
  background-color: #4f4f4f;
`;

const PaymentDetail = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #fcfcfc;
  margin-top: 14px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0px;
  width: 100%;
`;

const OutlineButtonWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 22px;
  gap: 8px;
  border: 1px solid #4f4f4f;
  cursor: pointer;
  margin: 0px 25px 40px;
  width: fit-content;
  min-width: 148px;
  position: relative;
`;

const OutlinedButtonContent = styled.p`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fcfcfc;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px;
`;

type PaymentHistoryDetailModalProps = {
  paymentDetailData?: Plans;
  handlePaymentDetailModal?: () => void;
};

const PaymentHistoryDetailModal: React.FC<PaymentHistoryDetailModalProps> = ({
  paymentDetailData,
  handlePaymentDetailModal,
}) => {
  const createdDate = new Date(paymentDetailData?.createdTime).toLocaleString(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
  );
  return (
    <Wrapper>
      <PaymentContainer>
        <PaymentHeader>
          <PaymentCategoryContainer>
            <PaymentCategory>
              {paymentDetailData?.planNameFromPlan}
            </PaymentCategory>
            <PaymentDate>{createdDate}</PaymentDate>
          </PaymentCategoryContainer>
          <Button
            color="secondary"
            sx={{
              width: '46px',
              height: '33px',
              backgroundColor: '#7062FF',
              borderRadius: '6px',
              color: '#FCFCFC',
              fontSize: '13px',
              fontWeight: '600',
            }}
          >
            PAID
          </Button>
        </PaymentHeader>
        <PaymentPrice>$ {paymentDetailData?.priceFromPlan}</PaymentPrice>
        <Divider />
        <PaymentDetail>Pay day: 29/03/2023</PaymentDetail>
        <PaymentDetail>Due date: 30/03/2023</PaymentDetail>
        <PaymentDetail>Form of payment: Credit Card</PaymentDetail>
      </PaymentContainer>
      <ButtonWrapper>
        <OutlineButtonWrapper style={{ width: '100%' }}>
          <OutlinedButtonContent onClick={handlePaymentDetailModal}>
            Close
          </OutlinedButtonContent>
        </OutlineButtonWrapper>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default PaymentHistoryDetailModal;
