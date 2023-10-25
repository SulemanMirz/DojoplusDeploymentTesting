import React from 'react';
import styled from 'styled-components';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Plans } from '../../../../shared/models/school.model';

const LineTop = styled.div`
  border: 4px solid #00d169;
`;

const Icon = styled(CheckCircleIcon)`
  width: 120px !important;
  height: 120px !important;
  color: #00d169;
`;

const IconCancel = styled(CancelIcon)`
  width: 120px !important;
  height: 120px !important;
  color: #ff4d4f;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 72px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  margin-top: 28px;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
`;

const IconLocation = styled.img`
  padding-right: 17px;
  padding: 17px 17px 0px 0px;
`;
const DescriptionContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const Location = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 35px;
`;
const LocationTitle = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 120%;
`;

const Description = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 120%;
`;

type ConfirmPaymentModalProps = {
  addPlansData: Plans;
  failureCase: boolean;
};

const ConfirmPaymentModal: React.FC<ConfirmPaymentModalProps> = ({
  addPlansData,
  failureCase,
}) => {
  return (
    <>
      <LineTop />
      <IconContainer>{failureCase ? <Icon /> : <IconCancel />}</IconContainer>
      <TitleContainer>
        <Title>
          {addPlansData?.nameFromCategory} • {addPlansData?.planName}
        </Title>
      </TitleContainer>
      <DescriptionContainer>
        <IconLocation src="/assets/icons/location_pin.svg" />
        <Location>
          <LocationTitle>{addPlansData?.schoolNameFromSchool}</LocationTitle>
          <Description>{addPlansData?.fullAddressFromSchool}</Description>
        </Location>
      </DescriptionContainer>
    </>
  );
};

export default ConfirmPaymentModal;
