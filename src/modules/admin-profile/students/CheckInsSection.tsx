import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, CircularProgress } from '@mui/material';
import CheckInCard from './Components/CheckInCard';
import { ProfileTabEmptyMessage } from '../../../shared/components/ProfileTabEmptyMessage';
import ModalOverlay from '../../modal-overlay';
import MoreCheckIns from './MoreCheckIns';
import { CheckIns } from '../../../shared/models/CheckIns';

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

const CheckInsContainer = styled.div``;

type CheckInsSectionProps = {
  checkInsStudentData?: CheckIns[];
  isCheckInsLoading: boolean;
};

const CheckInsSection: React.FC<CheckInsSectionProps> = ({
  checkInsStudentData,
  isCheckInsLoading,
}) => {
  const [isCheckInsModalVisible, setIsCheckInsModalVisible] = useState(false);
  const handleCheckInsModal = (): void => {
    return setIsCheckInsModalVisible(!isCheckInsModalVisible);
  };
  return (
    <>
      <CheckInsContainer>
        <SectionHeader>
          <SectionTitle>Check-Ins</SectionTitle>
          {checkInsStudentData?.length > 2 ? (
            <Button
              color="secondary"
              onClick={() => handleCheckInsModal()}
              sx={{
                width: '62px',
                height: '40px',
                backgroundColor: 'transparent',
                border: '1px solid #4F4F4F',
                fontSize: '12px',
                fontWeight: '600',
                color: '#FCFCFC',
              }}
            >
              MORE
            </Button>
          ) : null}
        </SectionHeader>
        {isCheckInsLoading ? (
          <LoadingWrapper style={{ marginBottom: 20 }}>
            <CircularProgress color="primary" size={20} />
          </LoadingWrapper>
        ) : (
          <>
            {checkInsStudentData.length !== 0 ? (
              <>
                {checkInsStudentData?.slice(0, 2)?.map((data) => {
                  return <CheckInCard checkInData={data} />;
                })}
              </>
            ) : (
              !isCheckInsLoading && (
                <ProfileTabEmptyMessage value="There is No CheckIns Available" />
              )
            )}
          </>
        )}
      </CheckInsContainer>
      <ModalOverlay
        open={isCheckInsModalVisible}
        onCloseClick={handleCheckInsModal}
        height="100%"
        title="Check In History"
      >
        <MoreCheckIns studentCheckInsData={checkInsStudentData} />
      </ModalOverlay>
    </>
  );
};

export default CheckInsSection;
