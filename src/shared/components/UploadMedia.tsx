import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import CloudinaryService from '../../../services/CloudinaryService';
import { AirtableImage } from '../models/AirtableImage';
import { AirtableVideo } from '../models/AirtableVideo';
import VideoPlayer from './layout/VideoPlayer';
import { TextWhite12UppercaseBold } from './texts';

const MorePosterImgPlaceholder = styled.div`
  width: 160px;
  height: 120px;
  border-radius: 4px 4px 4px 4px;
  margin-inline: 4px;
  margin-top: 7px;
  margin-left: 10px;
`;

const UploadImageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 166px;
  height: 40px;
  border: 1px solid #4f4f4f;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
`;

const Icon = styled.img`
  height: 20px;
  width: 20px;
`;

const UploadImageInput = styled.input`
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  top: 0px;
  cursor: pointer;
`;

const ImagesRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  width: 95%;
  margin-bottom: 1rem;
  overflow: scroll;
  padding: 0px 15px 0.5rem 8px;
  margin-top: 4px;
`;

const MorePosterImg = styled.img`
  width: 160px;
  min-height: 100%;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px 4px 4px 4px;
  margin-inline: 4px;
`;

interface UploadMediaProps {
  style?: {
    [key: string]: string | number;
  };
  setUrls?: (urls: AirtableImage[]) => void;
  setUrlsVideos?: (urls: AirtableVideo[]) => void;
  images?: AirtableImage[] | undefined;
  videos?: AirtableVideo[] | undefined;
  imagesOnly?: boolean;
  multiple?: boolean;
}

const UploadMedia: React.FC<UploadMediaProps> = ({
  style,
  setUrls,
  images,
  videos,
  setUrlsVideos,
  imagesOnly,
  multiple = true,
}) => {
  const { t } = useTranslation();
  const UploadMediaText = t('UploadMedia');
  const [loading, setLoading] = useState(false);
  const accepted = imagesOnly ? 'image/*' : 'video/*|image/*';
  return (
    <>
      {Boolean(images?.length) && (
        <>
          <ImagesRow>
            {images?.map((value, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <MorePosterImg key={idx} src={value?.url} />
            ))}
          </ImagesRow>
        </>
      )}
      {Boolean(videos?.length) && (
        <>
          <ImagesRow>
            {videos?.map((value, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <VideoPlayer key={idx} src={value?.url} width="160px" />
            ))}
          </ImagesRow>
        </>
      )}
      <MorePosterImgPlaceholder
        style={{
          ...(style || {}),
        }}>
        <UploadImageWrapper>
          {!loading ? (
            <>
              <Icon src="/assets/icons/upload-images.svg" />
              <TextWhite12UppercaseBold>
                {UploadMediaText}
              </TextWhite12UppercaseBold>
              <UploadImageInput
                type="file"
                multiple={multiple}
                accept={accepted}
                onChange={async (e) => {
                  if (!e) {
                    return;
                  }
                  setLoading(true);
                  const urlArray = await CloudinaryService.upload(e);
                  setUrls([
                    ...urlArray.filter((file) => file.type === 'image'),
                  ]);
                  if (setUrlsVideos) {
                    setUrlsVideos([
                      ...urlArray.filter((file) => file.type === 'video'),
                    ]);
                  }
                  setLoading(false);
                }}
              />
            </>
          ) : (
            <CircularProgress color="primary" size={20} />
          )}
        </UploadImageWrapper>
      </MorePosterImgPlaceholder>
    </>
  );
};

export default UploadMedia;
