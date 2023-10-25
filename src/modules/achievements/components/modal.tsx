import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import {
  MainDiv,
  ButtonDiv,
  ModalCard,
  ModalText,
  CompetitionAndYear,
  Category,
  RankAndIcon,
  Medal,
  TextContainer,
  MorePosterImg,
  ImagesRow,
} from './modalAchievement-styled';
import { DefaultMedal } from '../../../shared/components/DefaultMedal';
import {
  TextGray14CapitalizeThin,
  TextWhite14CapitalizeRegular,
  TextWhite18UppercaseRegular,
  TextWhite24CapitalizeBold,
  TextGray12UppercaseBold,
  TextGray10UppercaseRegular,
} from '../../../shared/components/texts';
import { CloseIcon } from '../../../shared/components/CloseIcon';
import { Achievement } from '../../../shared/models/achievement.model';
import { ProfileCardVerification } from '../../ranks/components/ranks-styled';
import { COLOR_BACKGROUND_DARK } from '../../../shared/styles/colors';
import { SAFE_AREA_VIEW_PADDING_TOP } from '../../../shared/styles/SafeAreaView';
import { Container } from '../../../shared/components/layout/Container';

const VerificationSection = styled.div`
  display: inline-block;
  background-color: ${COLOR_BACKGROUND_DARK};
  border-radius: 12px;
  margin-top: 6px;
`;

type ModalAchievementProps = {
  achievement: Achievement;
  handleModal: () => void;
  medal: string;
  resultposition: string;
};

export const ModalAchievement: React.FC<ModalAchievementProps> = ({
  achievement,
  handleModal,
  medal,
  resultposition,
}) => {
  const { t } = useTranslation();
  const verified = t('verified');
  const noVerified = t('noVerified');

  return (
    <Container notGutters isFlexGrow>
      <MainDiv>
        <ButtonDiv>
          <CloseIcon
            height="15"
            width="15"
            onClick={handleModal}
            extraStyle={{ top: SAFE_AREA_VIEW_PADDING_TOP }}
          />
        </ButtonDiv>
        <ModalCard>
          <ModalText>
            <TextWhite24CapitalizeBold>
              {achievement.martialArtFromBeltLevel
                ? achievement.martialArtFromBeltLevel[0]
                : ''}
            </TextWhite24CapitalizeBold>
            <RankAndIcon>
              <TextWhite24CapitalizeBold>
                {resultposition}
              </TextWhite24CapitalizeBold>
            </RankAndIcon>
            <VerificationSection>
              {achievement.verified ? (
                <ProfileCardVerification>
                  <CheckCircleIcon color="success" fontSize="inherit" />
                  <TextGray12UppercaseBold>{verified}</TextGray12UppercaseBold>
                </ProfileCardVerification>
              ) : (
                <ProfileCardVerification>
                  <WarningIcon color="warning" fontSize="inherit" />
                  <TextGray12UppercaseBold>
                    {noVerified}
                  </TextGray12UppercaseBold>
                </ProfileCardVerification>
              )}
            </VerificationSection>
            <CompetitionAndYear>
              <br />
              <TextWhite18UppercaseRegular style={{ textAlign: 'center' }}>
                {achievement.eventNameFromEventName
                  ? achievement.eventNameFromEventName[0]
                  : achievement.eventNameUserEntry || ''}
              </TextWhite18UppercaseRegular>
              <TextWhite14CapitalizeRegular>
                {achievement.location}{' '}
                {typeof achievement.year === 'number' ? achievement.year : ''}
              </TextWhite14CapitalizeRegular>
              {medal ? (
                <Medal src={medal} alt="Medal" />
              ) : (
                <DefaultMedal width="140px" height="140px" />
              )}
            </CompetitionAndYear>
            <Category>
              <TextGray14CapitalizeThin>
                {achievement.rankLevelFromMartialArtsLevels
                  ? achievement.rankLevelFromMartialArtsLevels[0]
                  : ''}
              </TextGray14CapitalizeThin>
              {achievement.ageDivision && (
                <TextGray14CapitalizeThin>
                  {achievement.ageDivision}
                </TextGray14CapitalizeThin>
              )}
              {achievement.weightDivision && (
                <TextGray14CapitalizeThin>
                  {achievement.weightDivision}
                </TextGray14CapitalizeThin>
              )}
            </Category>
          </ModalText>
        </ModalCard>
        {achievement?.photos && (
          <>
            <TextContainer style={{ marginTop: 18 }}>
              <TextGray10UppercaseRegular style={{ fontSize: '12px' }}>
                PHOTOS
              </TextGray10UppercaseRegular>
            </TextContainer>
            <ImagesRow>
              {achievement?.photos?.map((value) => (
                <MorePosterImg key={value.url} src={value?.url} />
              ))}
            </ImagesRow>
          </>
        )}
      </MainDiv>
    </Container>
  );
};
