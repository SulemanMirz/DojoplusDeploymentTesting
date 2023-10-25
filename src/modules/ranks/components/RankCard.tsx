import React from 'react';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  RankContainer,
  DateAndVerification,
  VerificationBox,
  ProfileCardVerification,
  ContainerCategory,
  BeltImage,
  ContainerSchoolMaster,
  NamesSchoolMaster,
  ContainerImgText,
  SchoolLogo,
  NoBelt,
} from './ranks-styled';
import {
  TextGray12UppercaseBold,
  TextGray14CapitalizeRegular,
  TextTruncation,
  TextWhite12UppercaseBold,
  TextWhite14CapitalizeRegular,
  TextWhite24CapitalizeBold,
} from '../../../shared/components/texts';
import { IRank, Rank } from '../../../shared/models/Rank.model';
import UserAvatar from '../../userAvatar';

type RanksProps = {
  data: Rank | IRank;
  onClick?: () => void;
  rankCardStyle?: React.CSSProperties;
};

export const RankCard: React.FC<RanksProps> = ({
  data,
  onClick,
  rankCardStyle,
}) => {
  const schoollogo = data.school?.schoolLogo
    ? data.school?.schoolLogo[0].url
    : '';
  const belt = data.rankImageW375H24FromMartialArtsRanks
    ? data.rankImageW375H24FromMartialArtsRanks[0]?.url
    : '';

  const logo = '/assets/logo/dojo.png';
  const schoolname = data.school?.schoolName || '';
  const masterfullname =
    data.master?.displayName ||
    data.master?.fullName ||
    `${data.master?.firstName || ''} ${data.master?.nickName || ''} ${
      data.master?.lastName || ''
    }`;

  // graduation date
  const { t } = useTranslation();
  const verified = t('verified');
  const noVerified = t('noVerified');

  const local = t('local');
  const monthDay = dayjs().locale(local);
  const months = [...Array(12)].map((_, i) => monthDay.month(i).format('MMMM'));

  const year = data.graduated?.split('-')[0] || '';
  const month = data.graduated?.split('-')[1] || '';

  return (
    <RankContainer
      style={{
        ...rankCardStyle,
      }}
      onClick={onClick}
    >
      <DateAndVerification>
        <TextGray14CapitalizeRegular>
          {months[parseInt(month) - 1]} {year}
        </TextGray14CapitalizeRegular>
        <VerificationBox>
          {data.verified ? (
            <ProfileCardVerification>
              <CheckCircleIcon color="success" fontSize="inherit" />
              <TextGray12UppercaseBold>{verified}</TextGray12UppercaseBold>
            </ProfileCardVerification>
          ) : (
            <ProfileCardVerification>
              <WarningIcon color="warning" fontSize="inherit" />
              <TextGray12UppercaseBold>{noVerified}</TextGray12UppercaseBold>
            </ProfileCardVerification>
          )}
        </VerificationBox>
      </DateAndVerification>
      <ContainerCategory>
        <div>
          <div style={{ marginBottom: '0.5rem', marginTop: '-1.5rem' }}>
            <TextWhite12UppercaseBold>
              {data.martialArtFromMartialArtsRanks
                ? data.martialArtFromMartialArtsRanks[0]
                : ''}
            </TextWhite12UppercaseBold>
          </div>
          <div style={{ marginBlock: '-0.5rem' }}>
            <TextWhite24CapitalizeBold>
              {data.levelFromMartialArtsRanks
                ? data.levelFromMartialArtsRanks[0].split('–')[0]
                : ''}
            </TextWhite24CapitalizeBold>
          </div>
        </div>
        <div style={{ marginBlock: '-6px', marginLeft: 'auto' }}>
          <TextGray14CapitalizeRegular>
            {data.levelFromMartialArtsRanks
              ? data.levelFromMartialArtsRanks[0].split('–')[1]
              : ''}
          </TextGray14CapitalizeRegular>
        </div>
      </ContainerCategory>
      {belt ? <BeltImage src={belt} alt="belt" /> : <NoBelt />}
      <ContainerSchoolMaster>
        <ContainerImgText>
          <UserAvatar username={data?.master?.username} />
          <NamesSchoolMaster>
            <TextWhite14CapitalizeRegular>
              <TextTruncation>{schoolname}</TextTruncation>
            </TextWhite14CapitalizeRegular>
            <TextWhite14CapitalizeRegular>
              {masterfullname}
            </TextWhite14CapitalizeRegular>
          </NamesSchoolMaster>
        </ContainerImgText>
        <SchoolLogo src={schoollogo || logo} alt="school logo" />
      </ContainerSchoolMaster>
    </RankContainer>
  );
};
