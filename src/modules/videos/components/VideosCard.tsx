import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { PartialDeep } from 'type-fest';
import Dialog from '@mui/material/Dialog';
import { Video as VideoType } from '../../../shared/types/generated';
import {
  TextGray14CapitalizeRegular,
  TextWhite14CapitalizeThin,
} from '../../../shared/components/texts';
import { TextUnderVideo } from './videos-styled';
import { VideoInfo } from './VideoInfo';
import { ModalPlayer } from './ModalPlayer';
import { useWindowSize } from '../../../shared/hooks/useWindowsSize';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 25px;
  width: 220px;
  position: relative;
  border: 15px;
  overflow: hidden;
`;
export const SingleVideoCont = styled.div`
  display: flex;
  width: 220px;
  max-height: 123.75px;
  position: relative;
`;

const Video = styled.video`
  width: 100%;
  height: auto;
`;

export type VideosCardProps = {
  video: PartialDeep<VideoType>;
};

export const VideosCard: React.FC<VideosCardProps> = ({ video }) => {
  const [modal, setModal] = useState(false);
  const videoUrl = video.video?.downloadUrl;
  const videoCont = useRef<HTMLVideoElement>();

  const { width, height } = useWindowSize();
  const isHorizo = height < 600;
  const isMobile = width < 600;

  return (
    <Container>
      <Dialog fullScreen={isMobile || isHorizo} open={modal}>
        <ModalPlayer video={videoUrl} handleModal={() => setModal((b) => !b)} />
      </Dialog>
      <SingleVideoCont>
        <Video ref={videoCont} preload="metadata">
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/wav" />
          <track kind="captions" />
          Your browser does not support the video
        </Video>
        <VideoInfo onClick={() => setModal((b) => !b)} />
      </SingleVideoCont>
      <TextUnderVideo>
        <TextWhite14CapitalizeThin>{video.title}</TextWhite14CapitalizeThin>
        <TextGray14CapitalizeRegular>
          {video.profile?.fullName}
        </TextGray14CapitalizeRegular>
      </TextUnderVideo>
    </Container>
  );
};
