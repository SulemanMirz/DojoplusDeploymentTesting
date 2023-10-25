import { Button } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ProfileTabEmptyMessage } from '../../../shared/components/ProfileTabEmptyMessage';
import { TextWhite18CapitalizeBold } from '../../../shared/components/texts';
import { Plans } from '../../../shared/models/school.model';
import { buttonStylesTransparent } from '../../../shared/styles/Button-style';
import ModalOverlay from '../../modal-overlay';
import BuyPlanModal from '../school-plans/components/BuyPlanModal';
import ConfirmPaymentModal from '../school-plans/components/ConfirmPaymentModal';

const Container = styled.div`
  margin-top: 49px;
`;
const TitleContainer = styled.div``;
const Title = styled.div`
  font-family: Saira;
  font-size: 18px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0em;
`;
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #333333;
  width: 343px;
  height: 158px;
  min-width: 343px;
  margin-top: 12px;
  padding: 16px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin-bottom: 9px;
  margin-right: 8px;
`;

const Description = styled.div`
  margin-top: 16px;
  font-family: Saira;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  color: #828282;
`;

const CardWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  @media screen and (min-width: 700px) {
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

type PlansCategoryProps = {
  plansData: Plans[];
};
const PlansCategory: React.FC<PlansCategoryProps> = ({ plansData }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [addPlansData, setAddPlansData] = useState<Plans>();
  const [confirmDetailsVisible, setConfirmDetailsVisible] = useState(false);
  const [failureCase] = useState(true);
  const handleDetailsModal = (): void => {
    setDetailsVisible(!detailsVisible);
  };
  const handleConfirmModal = (): void => {
    setDetailsVisible(false);
    setConfirmDetailsVisible(!confirmDetailsVisible);
  };
  return (
    <Container>
      <TitleContainer>
        <Title>Plans</Title>
      </TitleContainer>
      {plansData?.length !== 0 ? (
        <CardWrapper>
          {plansData?.map((data) => (
            <CardContainer>
              <TextWhite18CapitalizeBold
                style={{
                  whiteSpace: 'nowrap',
                  minWidth: '150px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {`${data?.nameFromCategory} • ${data?.planName}`}
              </TextWhite18CapitalizeBold>

              <Description>{data?.planDescription}</Description>
              <Button
                color="secondary"
                variant="contained"
                sx={buttonStylesTransparent}
                style={{ marginTop: '16px' }}
                onClick={() => {
                  setAddPlansData(data);
                  handleDetailsModal();
                }}
              >
                buy this membership
              </Button>
            </CardContainer>
          ))}
          <ModalOverlay
            title="Confirm and pay"
            height="90%"
            onCloseClick={() => {
              handleDetailsModal();
            }}
            open={detailsVisible}
          >
            <BuyPlanModal
              addPlansData={addPlansData}
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
        </CardWrapper>
      ) : (
        <ProfileTabEmptyMessage value="No plans found." />
      )}
    </Container>
  );
};

export default PlansCategory;
