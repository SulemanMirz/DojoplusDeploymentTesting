import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { StepContainer } from '../components/StepContainer';
import { StepTitle } from '../components/StepTitle';
import {
  CertificateImage,
  CertificateImageContainer,
  CertificateImagePlaceholder,
  CertificateWrapper,
  Icon,
  ImagesRow,
  MorePosterImg,
  MorePosterImgPlaceholder,
  TextContainer,
  UploadImageInput,
  UploadImageWrapper,
} from '../../ranks/components/ranks-styled';
import {
  TextGray10UppercaseRegular,
  TextWhite12UppercaseBold,
} from '../../../shared/components/texts';
import CloudinaryService from '../../../../services/CloudinaryService';

const CertificateUploadContainer = styled(CertificateImageContainer)`
  margin-top: -30px;
`;

type StepProps = {
  setCertificate: (value) => void;
  setMoreRankImages: (value) => void;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
};

const Step6: React.FC<StepProps> = ({
  setCertificate,
  setMoreRankImages,
  style,
  containerStyle
}): JSX.Element => {
  const [imageUrl, setImageUrl] = useState<any>();
  const [moreImages, setMoreImages] = useState([]);

  const { t } = useTranslation();
  const UploadCertificate = t('UploadCertificate');
  const UploadImages = t('UploadImages');
  const Photos = t('Photos');
  const AddCertificatePicture = t('AddCertificatePicture');
  const AllRanksWillBeVerified = t('AllRanksWillBeVerified');

  const UploadMoreImages: React.FC = () => (
    <MorePosterImgPlaceholder>
      <UploadImageWrapper>
        <Icon src="/assets/icons/upload-images.svg" />
        <TextWhite12UppercaseBold>{UploadImages}</TextWhite12UppercaseBold>
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
            setMoreImages(urlArrayPut?.map((img) => ({ url: img?.url })));
            setMoreRankImages(urlArrayPut?.map((img) => ({ url: img?.url })));
          }}
        />
      </UploadImageWrapper>
    </MorePosterImgPlaceholder>
  );

  return (
    <StepContainer
      style={{ height: 'calc(100vh - 110px)', overflowY: 'scroll', ...containerStyle }}
    >
      <StepTitle
        title={AddCertificatePicture}
        subTitle={AllRanksWillBeVerified}
        style={{
          ...style,
        }}
      />
      <CertificateUploadContainer>
        <CertificateWrapper>
          {imageUrl ? (
            <CertificateImage src={imageUrl} />
          ) : (
            <CertificateImagePlaceholder>
              <UploadImageWrapper>
                <Icon src="/assets/icons/fileIcon.svg" />
                <TextWhite12UppercaseBold>
                  {UploadCertificate}
                </TextWhite12UppercaseBold>
                <UploadImageInput
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    if (!e) {
                      return;
                    }
                    const urlArray = await CloudinaryService.upload(e);
                    console.log(urlArray?.[0]?.url);
                    setImageUrl(urlArray?.[0]?.url);
                    setCertificate(urlArray?.map((img) => ({ url: img?.url })));
                  }}
                />
              </UploadImageWrapper>
            </CertificateImagePlaceholder>
          )}
        </CertificateWrapper>
      </CertificateUploadContainer>
      {moreImages ? (
        <>
          <TextContainer style={{ marginTop: 18 }}>
            <TextGray10UppercaseRegular>{Photos}</TextGray10UppercaseRegular>
          </TextContainer>
          <ImagesRow>
            {moreImages?.map((value, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <MorePosterImg key={idx} src={value?.url} />
            ))}
            <UploadMoreImages />
          </ImagesRow>
        </>
      ) : (
        <>
          <TextContainer style={{ marginTop: 18 }}>
            <TextGray10UppercaseRegular>{Photos}</TextGray10UppercaseRegular>
          </TextContainer>
          <UploadMoreImages />
        </>
      )}
    </StepContainer>
  );
};

export default Step6;
