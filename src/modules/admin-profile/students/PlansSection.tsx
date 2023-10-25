import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, CircularProgress } from '@mui/material';
import { ProfileTabEmptyMessage } from '../../../shared/components/ProfileTabEmptyMessage';
import PlansCard from './Components/PlansCard';
import ModalOverlay from '../../modal-overlay';
import MorePlans from './MorePlans';
import { Plans } from '../../../shared/models/school.model';

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  justify-content: center;
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

type PlansSectionProps = {
  plansData?: Plans[];
  isPlansLoading: boolean;
};

const PlansSection: React.FC<PlansSectionProps> = ({
  plansData,
  isPlansLoading,
}) => {
  const [isPlanVisible, setIsPlanVisible] = useState(false);

  const handlePlanModal = (): void => {
    return setIsPlanVisible(!isPlanVisible);
  };

  return (
    <div>
      <SectionHeader>
        <SectionTitle>Plans</SectionTitle>
        {plansData?.length > 2 ? (
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
            onClick={handlePlanModal}
          >
            MORE
          </Button>
        ) : null}
      </SectionHeader>
      {isPlansLoading ? (
        <LoadingWrapper style={{ marginBottom: 20 }}>
          <CircularProgress color="primary" size={20} />
        </LoadingWrapper>
      ) : (
        <>
          {plansData?.length !== 0 ? (
            <>
              {plansData.slice(0, 2).map((data) => {
                return <PlansCard plans={data} />;
              })}
            </>
          ) : (
            !isPlansLoading && (
              <ProfileTabEmptyMessage value="There is No Plans Available" />
            )
          )}
        </>
      )}
      <ModalOverlay
        open={isPlanVisible}
        onCloseClick={handlePlanModal}
        height="100%"
        title="More Plans"
      >
        <MorePlans plansData={plansData} />
      </ModalOverlay>
    </div>
  );
};

export default PlansSection;
