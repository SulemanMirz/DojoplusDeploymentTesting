import React, { useState } from 'react';
import styled from 'styled-components';
import ModalOverlay from '../../modal-overlay';
import PaymentHistoryCard from './Components/PaymentHistoryCard';
import PaymentHistoryFilterModal from './Components/PaymentHistoryFilterModal';
import { Plans } from '../../../shared/models/school.model';

const Wrapper = styled.div`
  border-radius: 4px;
  max-height: calc(100vh - 10px);
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled.div``;

const data = [
  {
    id: '1',
    option: 'All',
  },
  {
    id: '2',
    option: 'Opened',
  },
  {
    id: '3',
    option: 'Canceled',
  },
  {
    id: '4',
    option: 'Paid',
  },
];

type MorePaymentHistoryProps = {
  paymentHistory?: Plans[];
  handlePaymentDetailModal: () => void;
  setPaymentDetailData?;
};
const MorePaymentHistory: React.FC<MorePaymentHistoryProps> = ({
  paymentHistory,
  handlePaymentDetailModal,
  setPaymentDetailData,
}) => {
  const [isPaymentHistoryModalVisible, setIsPaymentHistoryModalVisible] =
    useState(false);

  const handlePaymentHistoryModal = (): void => {
    setIsPaymentHistoryModalVisible(!isPaymentHistoryModalVisible);
  };

  return (
    <Container>
      <Wrapper>
        {paymentHistory?.map((payment, index) => {
          return (
            <div
              style={{
                borderBottom:
                  index === paymentHistory.length - 1
                    ? 'none'
                    : '1px solid #404040',
              }}
            >
              <PaymentHistoryCard
                handlePaymentDetailModal={() => {
                  handlePaymentDetailModal();
                  setPaymentDetailData(payment);
                }}
                paymentData={payment}
              />
            </div>
          );
        })}
      </Wrapper>
      <ModalOverlay
        height="55%"
        open={isPaymentHistoryModalVisible}
        onCloseClick={handlePaymentHistoryModal}
        title="More filters"
      >
        <PaymentHistoryFilterModal
          onCloseClick={handlePaymentHistoryModal}
          dataDay={data}
        />
      </ModalOverlay>
    </Container>
  );
};

export default MorePaymentHistory;
