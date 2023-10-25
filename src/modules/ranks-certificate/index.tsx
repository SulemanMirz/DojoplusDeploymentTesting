import React, { useEffect, useRef, useState } from 'react';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import download from 'downloadjs';
import { toJpeg } from 'html-to-image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import CertificateHeader from './components/CertificateHeader';
import { useFireBaseAuth } from '../../context/FirebaseContext';
import UserAvatar from '../userAvatar';
import {
  AccountButton,
  AvatarContentContainer,
  AvatarContentWrapper,
  AvatarLogo,
  ButtonContainer,
  ButtonContainerWrapper,
  CertificateDetailIconId,
  CertificateDetailSection,
  CertificateIdWrapper,
  CertificateIssueTitle,
  CertificateLink,
  CertificateSection,
  CertificateTitle,
  ContentDescription,
  ContentHeader,
  ContentSection,
  ContentWrapper,
  CopyIcon,
  CopyText,
  CopyWrapper,
  DownloadFile,
  FooterSection,
  GridContainer,
  Icon,
  Icon3,
  ImageWrapper,
  LinkCertificate,
  MartialArtContainer,
  MartialArtCredentails,
  MartialArts,
  MasterImage,
  PhotoSection,
  ShareCertificate,
  ShareTitle,
  SocialIcon,
  SocialText,
  StyledButton,
  VerifiedDetailIcon,
  VerifiedDetailId,
} from './components/certificate-styled';
import { socialButtons } from './components/share-button-data';
import { Toastify } from '../../shared/components/Tosatify';
import CertificateComponent from './components/CertificateComponent';
import { RankType } from '../../shared/models/Rank.model';
import { BASE_URL } from '../../../services/config';

type RankCertificateProps = {
  rankData?: RankType;
  windowsUrl?: string;
};

const RankCertificate: React.FC<RankCertificateProps> = ({
  rankData,
  windowsUrl,
}) => {
  const router = useRouter();

  const { username, martialArt, ranks } = router.query;
  const { authUser, loading } = useFireBaseAuth();
  const [certificateData, setCertificateData] = useState<RankType>(rankData);
  const [isLoading, setIsLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const isAuthUser = authUser?.email;
  const successAlert = useRef(null);
  const getData = async (): Promise<void> => {
    try {
      if (!rankData?.certificatePhoto?.[0]?.url) {
        setIsLoading(true);
        const url = `${BASE_URL}${username}/ranks/${martialArt}/${ranks}/certificate`;

        const sendCertificate = await axios.get('/api/Certificate', {
          params: {
            id: rankData?.id,
            url,
          },
        });

        setCertificateData(sendCertificate?.data);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };

  const handleImageDownload = async (): Promise<void> => {
    if (imageRef.current) {
      const imageURL = imageRef.current;
      const imageName = 'downloaded_image.jpg';
      download(await toJpeg(imageURL), imageName);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <CertificateHeader
        IconLeft={<Icon src="/assets/logo/dojo_plus_Logo.png" />}
        IconRight={
          !loading && !isAuthUser && <AccountButton>Login</AccountButton>
        }
        IconRight2={
          !loading &&
          !isAuthUser && <AccountButton>Create Account</AccountButton>
        }
        onIconRight2Click={() => router.push('/register')}
        onIconRightClick={() => router.push('/login')}
        IconLeft2={<Icon3 src={rankData?.schoolLogoFromAllSchools?.[0]?.url} />}
      />
      <ContentSection>
        <GridContainer>
          <Grid container>
            <Grid item lg={8} xs={12} sm={12} md={7.5}>
              <CertificateSection>
                <CertificateTitle>
                  {rankData?.levelFromMartialArtsRanks} certificate for{' '}
                  {rankData?.martialArtFromMartialArtsRanks?.[0]}{' '}
                </CertificateTitle>
                <Button
                  variant="outlined"
                  onClick={() => handleImageDownload()}
                  sx={{
                    border: 'none !important',
                    backgroundColor: '#333333',
                    fontSize: { md: '16px', xs: '12px' },
                    fontWeight: '600',
                    padding: { md: '16Px', xs: '12px' },
                    color: '#FCFCFC',
                    marginBlock: { md: '12px', xs: '20px' },
                    width: { md: '320px', xs: '240px' },
                    '&:hover': {
                      backgroundColor: '#4d4a4a',
                    },
                  }}
                  startIcon={
                    <DownloadFile src="/assets/icons/download-file.svg" />
                  }
                >
                  download pdf certificate
                </Button>
                <CertificateComponent
                  certificateData={certificateData}
                  isLoading={isLoading}
                  imageRef={imageRef}
                />

                <ShareCertificate>
                  <ShareTitle>SHARE LINK CERTIFICATE</ShareTitle>
                  <CertificateLink>
                    <LinkCertificate>{windowsUrl}</LinkCertificate>
                    <CopyWrapper
                      onClick={() => {
                        navigator.clipboard
                          .writeText(`${windowsUrl}`)
                          .then(() => successAlert.current.call());
                      }}
                    >
                      <CopyIcon src="/assets/icons/copy.svg" />
                      <CopyText>COPY</CopyText>
                      <Toastify
                        ref={successAlert}
                        message="Link copied to clipboard!"
                        type="success"
                      />
                    </CopyWrapper>
                  </CertificateLink>
                  <ButtonContainer>
                    <SocialText>SHARE ON SOCIAL MEDIA</SocialText>
                    <ButtonContainerWrapper>
                      <Grid
                        container
                        sx={{ textAlign: { xs: 'center', md: 'left' } }}
                      >
                        {socialButtons.map((button) => (
                          <Grid item xs={6} sm={4} lg={3}>
                            <button.component
                              title={button.title}
                              url={windowsUrl}
                            >
                              <StyledButton
                                startIcon={<SocialIcon src={button.iconSrc} />}
                              >
                                {button.buttonText}
                              </StyledButton>
                            </button.component>
                          </Grid>
                        ))}
                      </Grid>
                    </ButtonContainerWrapper>
                  </ButtonContainer>
                </ShareCertificate>
              </CertificateSection>
            </Grid>
            <Grid item lg={4} xs={12} sm={12} md={3.5}>
              <CertificateDetailSection>
                {rankData?.recordId && (
                  <CertificateIdWrapper>
                    <ContentHeader>CERTIFICATE ID</ContentHeader>

                    <CertificateDetailIconId>
                      <VerifiedDetailIcon src="/assets/icons/verified-white.svg" />
                      <VerifiedDetailId
                        style={{
                          color: '#FCFCFC',
                        }}
                      >
                        {rankData?.recordId}
                      </VerifiedDetailId>
                    </CertificateDetailIconId>
                  </CertificateIdWrapper>
                )}
                {rankData?.graduated && (
                  <ContentWrapper>
                    <ContentHeader>DATE (ISSUED ON)</ContentHeader>
                    <ContentDescription>
                      {rankData?.graduated}
                    </ContentDescription>
                  </ContentWrapper>
                )}
                {rankData?.martialArtFromMartialArtsRanks?.[0] && (
                  <ContentWrapper>
                    <ContentHeader>MARTIAL ART</ContentHeader>
                    <ContentDescription>
                      {rankData?.martialArtFromMartialArtsRanks?.[0]}
                    </ContentDescription>
                  </ContentWrapper>
                )}
                {rankData?.levelFromMartialArtsRanks && (
                  <ContentWrapper>
                    <ContentHeader>BELT</ContentHeader>
                    <ContentDescription>
                      {rankData?.levelFromMartialArtsRanks}
                    </ContentDescription>
                  </ContentWrapper>
                )}
                {rankData?.schoolNameFromAllSchools?.[0] && (
                  <ContentWrapper>
                    <ContentHeader>LOCATION</ContentHeader>
                    <ContentDescription>
                      {rankData?.schoolNameFromAllSchools?.[0]}
                    </ContentDescription>
                  </ContentWrapper>
                )}
                {rankData?.usernameFromAllProfiles?.[0] && (
                  <AvatarContentWrapper>
                    <ContentHeader>CERTIFICATE RECIPIENT</ContentHeader>
                    <AvatarContentContainer>
                      <UserAvatar
                        username={rankData?.usernameFromAllProfiles?.[0]}
                        avatarDimension={64}
                      />
                      <MartialArtContainer>
                        <MartialArts>
                          {rankData?.displayNameFromUsername?.[0]}
                        </MartialArts>
                        <MartialArtCredentails>
                          <Link
                            href={`/${rankData?.usernameFromAllProfiles?.[0]}/profile`}
                          >
                            <a
                              style={{
                                color: '#FCFCFC',
                                textDecoration: 'none',
                              }}
                            >
                              View all credentials
                            </a>
                          </Link>
                        </MartialArtCredentails>
                      </MartialArtContainer>
                    </AvatarContentContainer>
                  </AvatarContentWrapper>
                )}
                <AvatarContentWrapper>
                  {rankData?.displayNameFromMaster?.[0] && (
                    <>
                      <ContentHeader>PROMOTED BY</ContentHeader>
                      <AvatarContentContainer>
                        <UserAvatar
                          username={rankData?.masterFromAllProfiles?.[0]}
                          avatarDimension={64}
                        />
                        <MartialArtContainer>
                          <MartialArts>
                            {rankData?.displayNameFromMaster?.[0]}
                          </MartialArts>
                          <MartialArtCredentails>
                            <Link
                              href={`/${rankData?.masterFromAllProfiles?.[0]}/profile`}
                            >
                              <a
                                style={{
                                  color: '#FCFCFC',
                                  textDecoration: 'none',
                                }}
                              >
                                View all credentials
                              </a>
                            </Link>
                          </MartialArtCredentails>
                        </MartialArtContainer>
                      </AvatarContentContainer>
                    </>
                  )}
                  {rankData?.schoolNameFromAllSchools?.[0] && (
                    <AvatarContentContainer style={{ marginTop: '32px' }}>
                      <AvatarLogo
                        style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '40px',
                          cursor: 'pointer',
                        }}
                        src={
                          rankData?.schoolLogoFromAllSchools?.[0]?.url ||
                          '/assets/fallback_images/school-fallback.png'
                        }
                        onClick={() =>
                          router.push(
                            `/school/${rankData?.slugFromSchool?.[0]}/info`,
                          )
                        }
                      />
                      <MartialArtContainer>
                        <MartialArts
                          style={{
                            fontWeight: '400',
                            fontSize: '16px',
                            color: '#828282',
                          }}
                        >
                          SCHOOL
                        </MartialArts>
                        <MartialArtCredentails
                          style={{ fontWeight: '600', fontSize: '18px' }}
                          onClick={() =>
                            router.push(
                              `/school/${rankData?.slugFromSchool?.[0]}/info`,
                            )
                          }
                        >
                          {rankData?.schoolNameFromAllSchools?.[0]}
                        </MartialArtCredentails>
                      </MartialArtContainer>
                    </AvatarContentContainer>
                  )}
                </AvatarContentWrapper>
                {rankData?.photos && (
                  <PhotoSection>
                    <ContentHeader>PHOTOS</ContentHeader>
                    <Grid
                      container
                      rowSpacing={2}
                      style={{ marginTop: '8px' }}
                      columnSpacing={{ xs: 1, sm: 2, md: 12, lg: 0 }}
                    >
                      {rankData?.photos.map((data) => {
                        return (
                          <Grid item xs={6} sm={4} md={6} lg={6}>
                            <ImageWrapper>
                              <MasterImage src={data?.url} />
                            </ImageWrapper>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </PhotoSection>
                )}
              </CertificateDetailSection>
            </Grid>
          </Grid>
        </GridContainer>
        <FooterSection>
          <CertificateIssueTitle>
            HOW TO ISSUE CERTIFICATES
          </CertificateIssueTitle>
          <CertificateIssueTitle>ABOUT DOJO+</CertificateIssueTitle>
        </FooterSection>
      </ContentSection>
    </div>
  );
};

export default RankCertificate;
