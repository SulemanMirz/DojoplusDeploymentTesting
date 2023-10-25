import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, CircularProgress } from '@mui/material';
import { ProfileTabEmptyMessage } from '../../../shared/components/ProfileTabEmptyMessage';
import { AchievementItem } from '../../achievements/components/AchievementItem';
import ModalOverlay from '../../modal-overlay';
import MoreAchievement from './MoreAchievement';
import { Achievement } from '../../../shared/models/achievement.model';
import { Plans } from '../../../shared/models/school.model';

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
const AchievementContainer = styled.div``;

const AllAchievementSection = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
`;

type AchievementSectionProps = {
  isAchievementLoading: boolean;
  achievementData?: Achievement[];
  studentData?: Plans;
  getAchievement?: () => void;
};

const AchievementSection: React.FC<AchievementSectionProps> = ({
  achievementData,
  isAchievementLoading,
  studentData,
  getAchievement,
}) => {
  const [isAchievementModalVisible, setIsAchievementModalVisible] =
    useState(false);

  const handleAchievementModal = (): void => {
    return setIsAchievementModalVisible(!isAchievementModalVisible);
  };

  return (
    <>
      <AchievementContainer>
        <SectionHeader>
          <SectionTitle>Achievements</SectionTitle>
          {achievementData?.length > 3 ? (
            <Button
              onClick={handleAchievementModal}
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
            >
              MORE
            </Button>
          ) : null}
        </SectionHeader>
        {isAchievementLoading ? (
          <LoadingWrapper style={{ marginBottom: 20 }}>
            <CircularProgress color="primary" size={20} />
          </LoadingWrapper>
        ) : (
          <>
            {achievementData.length !== 0 ? (
              <AllAchievementSection>
                {achievementData.slice(0, 3).map((data) => (
                  <AchievementItem achievement={data} />
                ))}
              </AllAchievementSection>
            ) : (
              !isAchievementLoading && (
                <ProfileTabEmptyMessage value="There is No Achievement Available" />
              )
            )}
          </>
        )}
      </AchievementContainer>
      <ModalOverlay
        open={isAchievementModalVisible}
        height="100%"
        onCloseClick={handleAchievementModal}
      >
        <MoreAchievement
          achievementData={achievementData}
          studentData={studentData}
          getAchievement={getAchievement}
        />
      </ModalOverlay>
    </>
  );
};

export default AchievementSection;
