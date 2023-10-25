import React, { useState } from 'react';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import axios from 'axios';
import { useRouter } from 'next/router';
import LaunchIcon from '@mui/icons-material/Launch';
import { Button } from '@mui/material';
import {
  TextGray10UppercaseRegular,
  TextGray12UppercaseBold,
  TextWhite16UppercaseRegular,
  TextWhite12UppercaseBold,
} from '../../../shared/components/texts';
import { Section } from '../../../shared/components/layout/Section';
import { MainProfile } from '../../../shared/components/layout/Main';
import { Container } from '../../../shared/components/layout/Container';
import { Rank } from '../../../shared/models/Rank.model';
import { calcDateDifference } from '../../../shared/utils/ranks-utils';
import {
  BtnContainer,
  Button as IconButton,
  ButtonAlone,
  CertificateImage,
  CertificateImageContainer,
  CertificateImagePlaceholder,
  CertificateWrapper,
  Icon,
  ImageAndTextContainer,
  ImagesRow,
  MasterImageContainer,
  MorePosterImg,
  MorePosterImgPlaceholder,
  SchoolImage,
  TextContainer,
  UploadImageInput,
  UploadImageWrapper,
  VerificationBoxModal,
  VerifiedContainer,
  CredentialWrapper,
  ListItemWrapper,
} from './ranks-styled';
import LineItem from './LineItem';
import { useFireBaseAuth } from '../../../context/FirebaseContext';
import CloudinaryService from '../../../../services/CloudinaryService';
import UserAvatar from '../../userAvatar';
import { AirtableImage } from '../../../shared/models/AirtableImage';

dayjs.extend(advancedFormat);

type RankDetailsModalProps = {
  handleModal: () => void;
  rankData: Rank;
  handleConfirmModal?: () => void;
};

export const RankDetailsModal: React.FC<RankDetailsModalProps> = ({
  handleModal,
  rankData,
  handleConfirmModal,
}) => {
  const { t } = useTranslation();
  const verified = t('verified');
  const noVerified = t('noVerified');

  const { query, push } = useRouter();
  const username = query?.slug?.[0];

  const { authUser } = useFireBaseAuth();
  const handleClick = (): void => {
    const url = `/${query?.slug?.[0]}/ranks/${rankData?.martialArtFromMartialArtsRanks?.[0]}/${rankData?.levelFromMartialArtsRanks?.[0]}`;
    window.open(url, '_blank');
  };

  const isAuthUser: boolean = authUser?.userInfo?.username === username;

  // Extended dayjs with this format because we needed ordinals on the day, 'Do' provided with that.
  dayjs().format('Q Do k kk X x');

  const today = new Date();
  const past = new Date(rankData?.graduated);

  const isVerified = rankData?.verified;

  const masterfullname =
    rankData.master?.displayName ||
    rankData.master?.fullName ||
    `${rankData.master?.firstName || ''} ${rankData.master?.nickName || ''} ${
      rankData.master?.lastName || ''
    }`;

  const defaultSchoolLogo = '/assets/logo/dojo.png';
  const [imageUrl, setImageUrl] = useState<string>();
  const certificateImage = rankData?.certificate?.[0]?.url || imageUrl;
  const [moreImages, setMoreImages] = useState(rankData?.photos || []);

  const putURLs = (
    id: string,
    fieldName: string,
    urls: AirtableImage[],
  ): void => {
    axios
      .put(
        '/api/Rank',
        {
          fieldName,
          urls: urls?.map((el) => ({ url: el?.url })),
        },
        {
          params: {
            id,
          },
        },
      )
      .catch((e) => console.warn(e, 'catch'));
  };

  const UploadMoreImages: React.FC<{
    style?: {
      [key: string]: string | number;
    };
  }> = ({ style }) => (
    <MorePosterImgPlaceholder
      style={{
        ...(style || {}),
      }}
    >
      <UploadImageWrapper>
        <Icon src="/assets/icons/upload-images.svg" />
        <TextWhite12UppercaseBold>Upload Images</TextWhite12UppercaseBold>
        <UploadImageInput
          type="file"
          multiple
          accept="image/*"
          onChange={async (e) => {
            if (!e) {
              return;
            }
            const urlArray = await CloudinaryService.upload(e);
            const urlArrayPut = [...moreImages, ...urlArray];
            putURLs(rankData.recordId, 'photos', urlArrayPut);
            setMoreImages(urlArrayPut);
          }}
        />
      </UploadImageWrapper>
    </MorePosterImgPlaceholder>
  );
  return (
    <Section
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: '#282828',
        overflowY: 'scroll',
      }}
    >
      <MainProfile>
        <Container notGutters isFlexGrow>
          <>
            <CertificateImageContainer>
              <CertificateWrapper>
                <VerificationBoxModal
                  style={{
                    ...(isVerified
                      ? { right: 15, width: 86 }
                      : { right: 15, width: 114 }),
                  }}
                >
                  {isVerified ? (
                    <VerifiedContainer>
                      <CheckCircleIcon color="success" fontSize="inherit" />
                      <TextGray12UppercaseBold>
                        {verified}
                      </TextGray12UppercaseBold>
                    </VerifiedContainer>
                  ) : (
                    <VerifiedContainer>
                      <WarningIcon color="warning" fontSize="inherit" />
                      <TextGray12UppercaseBold>
                        {noVerified}
                      </TextGray12UppercaseBold>
                    </VerifiedContainer>
                  )}
                </VerificationBoxModal>
                {certificateImage ? (
                  <CertificateImage src={certificateImage} />
                ) : (
                  <CertificateImagePlaceholder>
                    {isAuthUser && !isVerified && (
                      <UploadImageWrapper>
                        <Icon src="/assets/icons/fileIcon.svg" />
                        <TextWhite12UppercaseBold>
                          Upload Certificate
                        </TextWhite12UppercaseBold>
                        <UploadImageInput
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            if (!e) {
                              return;
                            }
                            const urlArray = await CloudinaryService.upload(e);
                            putURLs(rankData.recordId, 'certificate', urlArray);
                            const url = URL.createObjectURL(e.target.files[0]);
                            setImageUrl(url);
                          }}
                        />
                      </UploadImageWrapper>
                    )}
                  </CertificateImagePlaceholder>
                )}
              </CertificateWrapper>
            </CertificateImageContainer>
            <ListItemWrapper>
              <div>
                {rankData?.graduated ? (
                  <LineItem
                    text1="ISSUED ON"
                    text2={dayjs(rankData?.graduated).format('MMMM Do,YYYY')}
                  />
                ) : undefined}
              </div>

              {isVerified && (
                <CredentialWrapper>
                  <Button
                    sx={{
                      fontSize: '10px',
                      borderRadius: '4px',
                      background: 'transparent',
                      border: '1px solid #333333',
                    }}
                    endIcon={<LaunchIcon />}
                    onClick={handleClick}
                  >
                    View Credential
                  </Button>
                </CredentialWrapper>
              )}
            </ListItemWrapper>

            {rankData?.graduated ? (
              <LineItem
                text1="Rank Held For"
                text2={calcDateDifference(today, past)}
              />
            ) : undefined}

            {rankData?.school?.location ? (
              <LineItem text1="Location" text2={rankData?.school?.location} />
            ) : undefined}

            <ImageAndTextContainer>
              <MasterImageContainer>
                <UserAvatar username={rankData?.master?.username} />
              </MasterImageContainer>
              <LineItem
                style={{ marginTop: 7, paddingLeft: 8 }}
                text1="Promoted by"
                text2={masterfullname}
              />
            </ImageAndTextContainer>
            <ImageAndTextContainer
              onClick={() => push(`/school/${rankData?.slugFromSchool}/info`)}
            >
              <SchoolImage
                src={
                  rankData.school?.schoolLogo
                    ? rankData.school?.schoolLogo[0].url
                    : defaultSchoolLogo
                }
              />
              <LineItem
                style={{ marginTop: 7 }}
                text1="School"
                text2={rankData?.school?.schoolName}
              />
            </ImageAndTextContainer>
            {((isAuthUser && !isVerified) || moreImages?.length !== 0) && (
              <TextContainer style={{ marginTop: 18 }}>
                <TextGray10UppercaseRegular>PHOTOS</TextGray10UppercaseRegular>
              </TextContainer>
            )}
            {moreImages?.length !== 0 && (
              <>
                <ImagesRow>
                  {moreImages?.map((value, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <MorePosterImg key={idx} src={value?.url} />
                  ))}
                </ImagesRow>
              </>
            )}
            {isAuthUser && !isVerified && (
              <UploadMoreImages style={{ marginLeft: 33 }} />
            )}
            {!isVerified && isAuthUser ? (
              <BtnContainer>
                <IconButton
                  onClick={() => {
                    handleConfirmModal();
                    handleModal();
                  }}
                >
                  <Icon src="/assets/icons/remove.svg" />
                  <TextWhite16UppercaseRegular>
                    remove
                  </TextWhite16UppercaseRegular>
                </IconButton>
                <IconButton>
                  <Icon src="/assets/icons/edit.svg" />
                  <TextWhite16UppercaseRegular>
                    change
                  </TextWhite16UppercaseRegular>
                </IconButton>
              </BtnContainer>
            ) : (
              <BtnContainer>
                <ButtonAlone onClick={handleModal}>
                  <Icon src="/assets/icons/close.svg" />
                  <TextWhite16UppercaseRegular>
                    close
                  </TextWhite16UppercaseRegular>
                </ButtonAlone>
              </BtnContainer>
            )}
          </>
        </Container>
      </MainProfile>
    </Section>
  );
};
