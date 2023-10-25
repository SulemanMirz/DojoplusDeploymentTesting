import { Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import PaymentHistoryCard from './Components/PaymentHistoryCard';
import { ProfileTabEmptyMessage } from '../../../shared/components/ProfileTabEmptyMessage';
import ModalOverlay from '../../modal-overlay';
import MorePaymentHistory from './MorePaymentHistory';
import { Plans } from '../../../shared/models/school.model';
import PaymentHistoryFilterModal from './Components/PaymentHistoryFilterModal';
import PaymentHistoryDetailModal from './Components/PaymentHistoryDetailModal';

const PaymentContainer = styled.div``;

const PaymentMapContainer = styled.div`
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background-color: #333333;
`;

const SectionHeader = styled.div`
  margin-top: 30px;
  margin-bottom: 27px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SectionTitle = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: '#FFFF';
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  justify-content: center;
`;

const PaymentHistoryWrapper = styled.div`
  margin-top: 18px;
  background-color: #333333;
  margin-inline: 15px;
  border-radius: 4px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
`;

const HeaderIcon = styled.img``;

type PaymentSectionProps = {
  paymentHistory?: Plans[];
  isPaymentLoading?: boolean;
};

const PaymentSection: React.FC<PaymentSectionProps> = ({
  paymentHistory,
  isPaymentLoading,
}) => {
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isPaymentDetailModalVisible, setIsPaymentDetailModalVisible] =
    useState(false);
  const [paymentDetailData, setPaymentDetailData] = useState<Plans>();

  const filterOption = [
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
  const handlePaymentModal = (): void => {
    return setIsPaymentModalVisible(!isPaymentModalVisible);
  };
  const handleFilterModal = (): void => {
    return setIsFilterModalVisible(!isFilterModalVisible);
  };

  const handlePaymentDetailModal = (): void => {
    setIsPaymentDetailModalVisible(!isPaymentDetailModalVisible);
  };

  return (
    <>
      <PaymentContainer>
        <SectionHeader>
          <SectionTitle>Payment History</SectionTitle>
          {paymentHistory?.length > 3 ? (
            <Button
              color="secondary"
              sx={{
                width: '62px',
                height: '40px',
                backgroundColor: 'transparent',
                border: '1px solid #4F4F4F',
                fontSize: '12px',
                fontWeight: '600',
                color: '#FCFCFC',
              }}
              onClick={handlePaymentModal}
            >
              MORE
            </Button>
          ) : null}
        </SectionHeader>
        {isPaymentLoading ? (
          <LoadingWrapper style={{ marginBottom: 20 }}>
            <CircularProgress color="primary" size={20} />
          </LoadingWrapper>
        ) : (
          <>
            {paymentHistory?.length !== 0 ? (
              <PaymentMapContainer>
                {paymentHistory?.slice(0, 3)?.map((data, index) => {
                  return (
                    <div
                      style={{
                        borderBottom:
                          index === paymentHistory?.length - 1
                            ? 'none'
                            : '1px solid #404040',
                      }}
                    >
                      <PaymentHistoryCard
                        handlePaymentDetailModal={() => {
                          handlePaymentDetailModal();
                          setPaymentDetailData(data);
                        }}
                        paymentData={data}
                      />
                    </div>
                  );
                })}
              </PaymentMapContainer>
            ) : (
              !isPaymentLoading && (
                <ProfileTabEmptyMessage value="There is No Payment Available" />
              )
            )}
          </>
        )}
      </PaymentContainer>
      <ModalOverlay
        open={isPaymentModalVisible}
        height="100%"
        onCloseClick={handlePaymentModal}
        IconLeft={<HeaderIcon src="/assets/icons/back-arrow.svg" />}
        onIconLeftClick={handlePaymentModal}
        IconRight={<HeaderIcon src="/assets/icons/filter-icon.svg" />}
        onIconRightClick={handleFilterModal}
        title="Payment History"
      >
        <PaymentHistoryWrapper>
          <MorePaymentHistory
            paymentHistory={paymentHistory}
            handlePaymentDetailModal={handlePaymentDetailModal}
            setPaymentDetailData={setPaymentDetailData}
          />
        </PaymentHistoryWrapper>
      </ModalOverlay>
      <ModalOverlay
        height="55%"
        open={isFilterModalVisible}
        onCloseClick={handleFilterModal}
        title="More filters"
      >
        <PaymentHistoryFilterModal
          onCloseClick={handleFilterModal}
          dataDay={filterOption}
        />
      </ModalOverlay>
      <ModalOverlay
        open={isPaymentDetailModalVisible}
        onCloseClick={handlePaymentDetailModal}
        title="Payment Detail"
      >
        <PaymentHistoryDetailModal
          paymentDetailData={paymentDetailData}
          handlePaymentDetailModal={handlePaymentDetailModal}
        />
      </ModalOverlay>
    </>
  );
};

export default PaymentSection;
