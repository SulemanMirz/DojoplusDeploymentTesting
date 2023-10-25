import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Button } from '@mui/material';

import { ProfileTabLoading } from '../../shared/components/TabLoading';
import { ProfileTabEmptyMessage } from '../../shared/components/ProfileTabEmptyMessage';

import { AchievementItem } from './components/AchievementItem';
import { COLOR_BACKGROUND_LIGHT } from '../../shared/styles/colors';
import { TextWhite18UppercaseRegular } from '../../shared/components/texts';
import { Achievement } from '../../shared/models/achievement.model';
import { addRankButtonStyles } from '../../shared/styles/Button-style';
import AddAchievementModal from './components/AddAchievementModal';
import ModalOverlay from '../modal-overlay';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';

const LastestSection = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const AllAchievementBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: ${COLOR_BACKGROUND_LIGHT};
  padding: 1rem;
  justify-content: center;
`;

const AllAchievementSection = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
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

type AchievementsProps = {
  username: string;
};

export const Achievements: React.FC<AchievementsProps> = ({ username }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState<Achievement[]>();
  console.log('TTTesting')
  const { authUser } = useFirebaseAuth();
  const isAuthUser = authUser?.userInfo?.username === username;

  useEffect(() => {
    if (username) {
      axios('/api/Achievement', {
        params: {
          username,
        },
      }).then((res) => {
        setAchievements(res.data);
        setLoading(false);
      });
    }
  }, [username, isModalVisible]);

  const handleModal: () => void = () => {
    setIsModalVisible(!isModalVisible);
  };

  const { t } = useTranslation();
  const textLastAchi = t('LastAchie').toUpperCase();
  const textAllAchie = t('AllAchie').toUpperCase();

  if (isLoading) {
    return <ProfileTabLoading />;
  }

  if (!username || !achievements || achievements.length === 0) {
    return (
      <>
        <ProfileTabEmptyMessage value="There is no achievements to show" />
        {isAuthUser && (
          <AddAchivementContiner>
            <Button
              sx={addRankButtonStyles}
              onClick={() => {
                handleModal();
              }}
              variant="contained"
              startIcon={<AddIcon src="/assets/icons/plus-icon.svg" />}
            >
              add new achievement
            </Button>
          </AddAchivementContiner>
        )}
        <ModalOverlay
          title="Add Achievement"
          height="90%"
          open={isModalVisible}
          onCloseClick={handleModal}
        >
          <AddAchievementModal handleModal={handleModal} />
        </ModalOverlay>
      </>
    );
  }
  const lastestAchivement = achievements[0];
  const allAchievements =
    achievements.length > 1 ? achievements.slice(1, achievements.length) : [];

  return (
    <>
      <LastestSection>
        <TextWhite18UppercaseRegular>
          {textLastAchi}
        </TextWhite18UppercaseRegular>
        <AchievementItem achievement={lastestAchivement} />
      </LastestSection>
      {allAchievements.length > 0 ? (
        <AllAchievementBar>
          <TextWhite18UppercaseRegular>
            {textAllAchie}
          </TextWhite18UppercaseRegular>
        </AllAchievementBar>
      ) : undefined}

      <AllAchievementSection>
        {allAchievements.length > 0
          ? allAchievements.map((achievement) => (
            <AchievementItem achievement={achievement} key={achievement.id} />
          ))
          : null}
      </AllAchievementSection>
      {isAuthUser && (
        <AddAchivementContiner>
          <Button
            sx={addRankButtonStyles}
            onClick={() => {
              handleModal();
            }}
            variant="contained"
            startIcon={<AddIcon src="/assets/icons/plus-icon.svg" />}
          >
            add new achievement
          </Button>
        </AddAchivementContiner>
      )}
      <ModalOverlay
        title="Add Achievement"
        height="90%"
        open={isModalVisible}
        onCloseClick={handleModal}
      >
        <AddAchievementModal handleModal={handleModal} />
      </ModalOverlay>
    </>
  );
};
