import React from 'react';
import styled from 'styled-components';
import { Plans } from '../../../../shared/models/school.model';

const PaymentCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 60px;
  padding-block: 12px;
  padding-inline: 18px;
`;
const PaymentCategory = styled.div`
  display: flex;
  flex-direction: row;
`;
const Icon = styled.img`
  width: 18px;
`;
const SectionTitleDate = styled.div`
  padding-left: 9px;
`;
const PaymentMartialArt = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  max-width: calc(100vw - 180px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const PaymentDate = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #828282;
`;
const PaymentPrice = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
`;

type PaymentHistoryCardProps = {
  handlePaymentDetailModal?: () => void;
  paymentData?: Plans;
};

const PaymentHistoryCard: React.FC<PaymentHistoryCardProps> = ({
  handlePaymentDetailModal,
  paymentData,
}) => {
  const createdDate = new Date(paymentData?.createdTime).toLocaleString(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
  );
  const stripeDate = new Date(paymentData?.stripeDate).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return (
    <>
      <PaymentCard onClick={handlePaymentDetailModal}>
        <PaymentCategory>
          <Icon src="/assets/icons/payment-icon.svg" />
          <SectionTitleDate>
            <PaymentMartialArt>
              {paymentData?.planNameFromPlan}
            </PaymentMartialArt>
            <PaymentDate>{createdDate || stripeDate}</PaymentDate>
          </SectionTitleDate>
        </PaymentCategory>
        <PaymentPrice>$ {paymentData?.priceFromPlan?.[0]}</PaymentPrice>
      </PaymentCard>
    </>
  );
};

export default PaymentHistoryCard;
