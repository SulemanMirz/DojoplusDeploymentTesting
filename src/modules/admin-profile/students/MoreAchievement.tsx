import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid, Button } from '@mui/material';
import { AchievementItem } from '../../achievements/components/AchievementItem';
import { Achievement } from '../../../shared/models/achievement.model';
import ModalOverlay from '../../modal-overlay';
import AddAchievementModal from '../../achievements/components/AddAchievementModal';
import { addRankButtonStyles } from '../../../shared/styles/Button-style';
import { Plans } from '../../../shared/models/school.model';

const Wrapper = styled.div`
  margin-top: 10px;
  padding-inline: 16px;
  max-height: calc(100vh - 10px);
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  border-radius: 4px;
`;

const AddAchivementContiner = styled.div`
  display: flex;
  justify-content: center;
  padding: 0px 8px 0px 8px;
  width: 100%;
  padding-bottom: 53px;
`;

const AddIcon = styled.img`
  height: 24;
  width: 24;
`;

const Container = styled.div``;

type MoreAchievementProps = {
  achievementData?: Achievement[];
  studentData?: Plans;
  getAchievement?: () => void;
};

const MoreAchievement: React.FC<MoreAchievementProps> = ({
  achievementData,
  studentData,
  getAchievement,
}) => {
  const [isAchievementModalVisible, setIsAchievementModalVisible] =
    useState(false);

  const handleAchievementModal = (): void => {
    setIsAchievementModalVisible(!isAchievementModalVisible);
  };

  return (
    <Container>
      <Wrapper>
        <Grid container>
          {achievementData?.map((data) => {
            return (
              <Grid xs={4} sm={3} md={2.4} lg={2.4} paddingBottom="10px">
                <AchievementItem
                  achievement={data}
                  containerStyle={{
                    margin: '0px',
                  }}
                  achievementNameStyle={{
                    overflow: 'unset',
                    whiteSpace: 'unset',
                    maxWidth: '86px',
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </Wrapper>
      <AddAchivementContiner>
        <Button
          sx={addRankButtonStyles}
          onClick={() => {
            handleAchievementModal();
          }}
          variant="contained"
          startIcon={<AddIcon src="/assets/icons/plus-icon.svg" />}
        >
          add new achievement
        </Button>
      </AddAchivementContiner>
      <ModalOverlay
        open={isAchievementModalVisible}
        height="90%"
        onCloseClick={handleAchievementModal}
        title="Add Achievement"
      >
        <AddAchievementModal
          handleModal={handleAchievementModal}
          studentData={studentData}
          getAchievement={getAchievement}
        />
      </ModalOverlay>
    </Container>
  );
};

export default MoreAchievement;
