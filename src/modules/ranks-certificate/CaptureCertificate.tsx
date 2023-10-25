import React, { useRef } from 'react';
import dayjs from 'dayjs';
import {
  AboutCertification,
  AboutSkills,
  AssistanceBelt,
  AwardedDate,
  BeltImage,
  CardDescription,
  CardDetailDescription,
  CertificateCard,
  CertificateCardWrapper,
  CertificateDescriptionContainer,
  CertificateDetailCardWrapper,
  CertificateIconId,
  CertificateId,
  CertificateIdTitle,
  CertificateTitleForm,
  Designation,
  Id,
  Logo,
  LogoContainer,
  LogoWrapper,
  SchoolLogo,
  SignatureLine,
  SignatureName,
  UserName,
  VerifiedIcon,
} from './components/capture-certificate-styled';
import { RankType } from '../../shared/models/Rank.model';

type CaptureCertificateProps = {
  rankData?: RankType;
  featureRankData?: RankType;
};

const CaptureCertificate: React.FC<CaptureCertificateProps> = ({
  rankData,
  featureRankData,
}) => {
  const dateString = rankData?.graduated;
  const dateObj = dayjs(dateString);
  const certificateRef = useRef();

  const year = dateObj.format('YYYY');
  const month = dateObj.format('MMM');
  const day = dateObj.format('D');

  const formattedDay = dateObj.date() < 10 ? `0${day}` : day;
  return (
    <div ref={certificateRef} style={{ height: '100%', background: '#000' }}>
      <CertificateDetailCardWrapper>
        <CertificateCard>
          <CertificateCardWrapper id="main-certificate-div">
            <CardDescription>
              <CertificateTitleForm>
                CERTIFICATE OF ACHIEVEMENT
              </CertificateTitleForm>
              <UserName>{rankData?.displayNameFromUsername?.[0]}</UserName>
              <BeltImage
                src={rankData?.rankImageW375H24FromMartialArtsRanks?.[0]?.url}
              />

              <CertificateDescriptionContainer>
                <AboutCertification>
                  This certificate acknowledges{' '}
                  <span style={{ fontWeight: 'bold' }}>
                    {rankData?.displayNameFromUsername?.[0]}
                  </span>{' '}
                  significant progress in {rankData?.teamFromAllSchools?.[0]},
                  reaching the esteemed{' '}
                  <span style={{ fontWeight: 'bold' }}>
                    {rankData?.levelFromMartialArtsRanks?.[0]}
                  </span>{' '}
                  level{' '}
                  <span style={{ fontWeight: 'bold' }}>
                    {rankData?.martialArtFromMartialArtsRanks?.[0]}
                  </span>
                </AboutCertification>
                <AboutSkills>
                  We commend{' '}
                  <span style={{ fontWeight: 'bold' }}>
                    {rankData?.displayNameFromUsername?.[0]}
                  </span>{' '}
                  dedication, skill, and commitment to mastering the techniques
                  and principles of this martial art. It is our hope that this
                  achievement inspires continued growth, knowledge-seeking, and
                  the promotion of the culture, morals, and respect within our
                  sport.
                </AboutSkills>
                <AwardedDate>
                  Awarded on this {formattedDay} day of {month}, {year}
                </AwardedDate>
              </CertificateDescriptionContainer>
              <SignatureLine>
                <SignatureName>
                  {rankData?.displayNameFromMaster || 'Master'}
                </SignatureName>
                <Designation>
                  {rankData?.displayNameFromMaster || 'Master'}
                </Designation>
                <AssistanceBelt>
                  {featureRankData?.martialArtFromMartialArtsRanks}{' '}
                  {featureRankData?.levelFromMartialArtsRanks}
                </AssistanceBelt>
              </SignatureLine>
            </CardDescription>
            <CardDetailDescription>
              <LogoContainer>
                <SchoolLogo
                  src={
                    rankData?.schoolLogoFromAllSchools?.[0]?.url ||
                    'https://res.cloudinary.com/de1kz0ucq/image/upload/v1687426855/Team_School_Logo_xwuz93.svg'
                  }
                />
              </LogoContainer>
              <LogoWrapper>
                <CertificateId>
                  <CertificateIdTitle>
                    VERIFIED CERTIFICATE ID
                  </CertificateIdTitle>
                  <CertificateIconId>
                    <VerifiedIcon src="/assets/icons/verified.svg" />
                    <Id>{rankData?.recordId || '21381239 1238u12'}</Id>
                  </CertificateIconId>
                </CertificateId>
                <div>
                  <Logo src="https://res.cloudinary.com/de1kz0ucq/image/upload/v1690279958/Union_cdrdtx.svg" />
                </div>
              </LogoWrapper>
            </CardDetailDescription>
          </CertificateCardWrapper>
        </CertificateCard>
      </CertificateDetailCardWrapper>
    </div>
  );
};

export default CaptureCertificate;
