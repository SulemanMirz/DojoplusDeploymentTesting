import React, { useState } from 'react';
import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ModalAchievement } from './modal';
import { DefaultMedal } from '../../../shared/components/DefaultMedal';
import {
  TextGray14CapitalizeRegular,
  TextTruncation,
  TextWhite14CapitalizeRegular,
} from '../../../shared/components/texts';
import { useWindowSize } from '../../../shared/hooks/useWindowsSize';
import { Achievement } from '../../../shared/models/achievement.model';
import { ProfileCardVerification } from '../../ranks/components/ranks-styled';

const Medal = styled.img`
  layout: intrinsic;
  width: 80px;
  height: 80px;
`;

const Container = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 85px;
  align-items: center;
  margin: 16px;
`;

const ArchivementName = styled(TextWhite14CapitalizeRegular)`
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100px;
`;

const ArchivementLoc = styled(TextGray14CapitalizeRegular)`
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 110px;
`;

type AchievementItemProps = {
  achievement: Achievement;
  containerStyle?: React.CSSProperties;
  achievementNameStyle?: React.CSSProperties;
};

export const AchievementItem: React.FC<AchievementItemProps> = ({
  achievement,
  containerStyle,
  achievementNameStyle,
}) => {
  const [modal, setModal] = useState(false);

  let medalimage = null;
  let resultposition = '';
  if (achievement.rank === 1) {
    resultposition = '1st';
    medalimage = '/assets/medals/1st-place.png';
  } else if (achievement.rank === 2) {
    resultposition = '2nd';
    medalimage = '/assets/medals/2nd-place.png';
  } else if (achievement.rank === 3) {
    resultposition = '3rd';
    medalimage = '/assets/medals/3rd-place.png';
  } else {
    resultposition = 'No rank';
    medalimage = '/assets/medals/nomedal.png';
  }

  const handleModal = (): void => {
    setModal(!modal);
  };

  const { width } = useWindowSize();
  const isMobile = width < 600;
  return (
    <>
      {modal && (
        <Dialog fullScreen={isMobile} open={modal}>
          <ModalAchievement
            achievement={achievement}
            resultposition={resultposition}
            medal={achievement.medal ? achievement.medal[0]?.url : medalimage}
            handleModal={handleModal}
          />
        </Dialog>
      )}
      <Container
        style={{
          ...containerStyle,
        }}
        onClick={handleModal}
      >
        {medalimage ? (
          <Medal
            src={achievement.medal ? achievement.medal[0]?.url : medalimage}
            alt="medal"
          />
        ) : (
          <DefaultMedal width="80px" height="80px" />
        )}
        {achievement.verified ? (
          <ProfileCardVerification>
            <CheckCircleIcon color="success" fontSize="inherit" />
          </ProfileCardVerification>
        ) : (
          <ProfileCardVerification>
            <WarningIcon color="warning" fontSize="inherit" />
          </ProfileCardVerification>
        )}
        <TextGray14CapitalizeRegular>
          {resultposition}
        </TextGray14CapitalizeRegular>
        <TextTruncation lines={2}>
          <ArchivementName
            style={{
              ...achievementNameStyle,
            }}
          >
            {achievement.eventNameFromEventName
              ? achievement.eventNameFromEventName[0]
              : achievement.eventNameUserEntry || ''}
          </ArchivementName>
        </TextTruncation>
        <ArchivementLoc>{achievement.location}</ArchivementLoc>
        <TextGray14CapitalizeRegular>
          {typeof achievement.year === 'number' ? achievement.year : ''}
        </TextGray14CapitalizeRegular>
      </Container>
    </>
  );
};
