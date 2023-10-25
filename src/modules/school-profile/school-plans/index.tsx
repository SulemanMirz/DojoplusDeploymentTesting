import React, { useState } from 'react';
import styled from 'styled-components';
import { ProfileTabEmptyMessage } from '../../../shared/components/ProfileTabEmptyMessage';

import { TextWhite24CapitalizeBold } from '../../../shared/components/texts';
import { Plans } from '../../../shared/models/school.model';
import { COLOR_LETTERS_WHITE } from '../../../shared/styles/colors';
import ModalOverlay from '../../modal-overlay';
import BasicSelect from '../../../shared/components/BasicSelect/BasicSelect';
import BuyPlanModal from './components/BuyPlanModal';
import ConfirmPaymentModal from './components/ConfirmPaymentModal';

const TextWhite14UppercaseRegular = styled.p`
  text-transform: uppercase;
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 14px;
  color: ${COLOR_LETTERS_WHITE};
  font-weight: 600;
  margin: 0;
`;

const ScheduleItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Item = styled.div`
  display: flex;
  padding-top: 12px;
  display: flex;
  align-items: center;
`;

export const ScheduleItem = styled.div`
  padding: 16px;
  font-size: 12px;
  background-color: #333333;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const PlanButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px;
  gap: 8px;
  background: #d21632;
  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
  cursor: pointer;
  margin-top: 12px;
`;

const PlanButtonContent = styled.p`
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

const TextGray12Regular = styled.p`
  font-family: Saira, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;
  font-size: 12px;
  color: #828282;
  font-weight: 400;
  line-height: 14px;
  padding-top: 12px;
  margin: 0px;
`;

const Container = styled.div`
  padding-bottom: 100px;
  margin: 0px 20px;
`;

const SelectWrapper = styled.div`
  margin: 16px 0px 8px;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 28px;
`;
type PlansDataProps = {
  plansData: Plans[];
};

const SchoolPlans: React.FC<PlansDataProps> = ({ plansData }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [confirmDetailsVisible, setConfirmDetailsVisible] = useState(false);
  const [addPlansData, setAddPlansData] = useState<Plans>();
  const [addCategory, setAddCategory] = useState('');
  const [selectedPlansData, setSelectedPlansData] = useState('');
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [failureCase] = useState(true);

  const unique = [
    `All Plans (${plansData.length})`,
    ...new Set(plansData?.map((item) => item.nameFromCategory?.[0])),
  ];

  const SelectedPlans = (): Plans[] => {
    if (
      selectedPlansData &&
      selectedPlansData !== `All Plans (${plansData.length})`
    ) {
      return plansData.filter(
        (cat) => cat.nameFromCategory?.[0] === selectedPlansData,
      );
    }
    return plansData;
  };

  const handleDetailsModal = (): void => {
    setDetailsVisible(!detailsVisible);
  };
  const handleConfirmModal = (): void => {
    setDetailsVisible(false);
    setConfirmDetailsVisible(!confirmDetailsVisible);
  };

  return plansData?.length !== 0 ? (
    <Container>
      <SelectWrapper>
        <BasicSelect
          value={addCategory || `All Plans (${plansData?.length})` || ''}
          onChange={(value) => {
            setAddCategory(value.toString());
            setSelectedPlansData(value.toString());
          }}
          width="100%"
          backgroundColor="#1B1B1B"
          label="Plans"
          options={unique}
        />
      </SelectWrapper>
      {SelectedPlans()?.map((data) => {
        return (
          <ScheduleItem>
            <ScheduleItemWrapper>
              <TextWhite14UppercaseRegular>
                {`${data?.nameFromCategory} • ${data?.planName}`}
              </TextWhite14UppercaseRegular>
              <Item>
                <TextWhite24CapitalizeBold
                  style={{
                    whiteSpace: 'pre',
                  }}
                >
                  {data?.price}
                </TextWhite24CapitalizeBold>
                <TextGray12Regular style={{ paddingTop: 0 }}>
                  {data?.frequency && !data.frequency.includes('undefined') && (
                    <TextGray12Regular style={{ paddingTop: 0 }}>
                      {`/${data?.frequency}`}
                    </TextGray12Regular>
                  )}
                </TextGray12Regular>
              </Item>
              <TextGray12Regular>{data?.planDescription}</TextGray12Regular>
              <PlanButtonWrapper
                onClick={() => {
                  setAddPlansData(data);
                  handleDetailsModal();
                }}
              >
                <PlanButtonContent>buy this membership</PlanButtonContent>
              </PlanButtonWrapper>
            </ScheduleItemWrapper>
          </ScheduleItem>
        );
      })}
      <ModalOverlay
        height="90%"
        onCloseClick={() => {
          handleDetailsModal();
        }}
        open={detailsVisible}
        title="Confirm and pay"
      >
        <BuyPlanModal
          addPlansData={addPlansData}
          isUserAuthenticated={isUserAuthenticated}
          setIsUserAuthenticated={setIsUserAuthenticated}
          handleConfirmModal={handleConfirmModal}
        />
      </ModalOverlay>
      <ModalOverlay
        onCloseClick={handleConfirmModal}
        open={confirmDetailsVisible}
        title={failureCase ? 'Payment confirmed' : 'Payment Decline'}
      >
        <ConfirmPaymentModal
          addPlansData={addPlansData}
          failureCase={failureCase}
        />
      </ModalOverlay>
    </Container>
  ) : (
    <ProfileTabEmptyMessage value="There is no Plans Data" />
  );
};

export default SchoolPlans;
