import React, { useRef, useState } from 'react';

import styled from 'styled-components';
import dayjs from 'dayjs';
import { Pause, Play } from './Icons';
import { TextGray14CapitalizeRegular } from '../../../shared/components/texts';
import { useTimeOut } from '../../../shared/hooks/useTimeOut';

export const SingleVideoRepro = styled.div`
  display: flex;
  margin: auto;
  max-width: 600px;
  position: relative;
  overflow: hidden;
  @media screen and (max-width: 600px) {
    width: 100%;
    height: 100%;
  }
  :hover > div {
    transition: 0.5s;
    transform: translateY(0px);
  }
`;

const ControlCont = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  z-index: 3;
  width: 100%;
  height: 17%;
  bottom: 0;
  /* transform: translateY(100%); */
`;

const ViewsText = styled(TextGray14CapitalizeRegular)`
  margin-left: 10px;
  display: flex;
  align-items: center;
  color: white;
  font-weight: 400;
`;

const Space = styled.div`
  display: flex;
  flex: 1;
`;

const TextWraper = styled.div`
  display: flex;
  margin-right: 20px;
  align-items: center;
`;

const TimeText = styled(TextGray14CapitalizeRegular)`
  background-color: #333333;
  padding: 3px;
  padding-left: 5px;
  padding-right: 5px;
  color: white;
  border-radius: 3px;
  font-weight: 400;
`;

const TimeLineBack = styled.div`
  position: absolute;
  /* display: flex; */
  margin-left: 2%;
  top: -5px;
  width: 95%;
  background-color: rgba(252, 252, 252, 0.3);
  height: 5px;
  border-radius: 2px;
  overflow: hidden;
`;

const TimeLineFront = styled.div<{ time: number }>`
  width: ${({ time }) => time || 0}%;
  background-color: #7062ff;
  height: 5px;
  border-radius: 2px;
`;

const PlayCont = styled.button`
  background-color: transparent;
  position: relative;
  display: flex;
  border-width: 0;
  align-items: center;
  padding-left: 15px;
  :hover {
    transform: scale(1.2);
    transition: 0.2s;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
`;

type VideosCardProps = {
  video: string;
};

export const VideoControls = ({ video }: VideosCardProps): JSX.Element => {
  const [currentTime, setCurrentTime] = useState(0);
  const [currentPercent, setCurrentPercent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const day = dayjs().set('hour', 0).set('minutes', 0).set('second', 0);

  const videoUrl = video;
  const videoRef = useRef<HTMLVideoElement>();
  const videoCont = videoRef?.current;

  const handlePayPause = (): void => {
    if (videoCont.paused) {
      setIsPaused(true);
      videoCont.play();
    } else {
      setIsPaused(false);
      videoCont.pause();
    }
  };

  useTimeOut(() => {
    setCurrentTime(videoCont?.currentTime);
    setCurrentPercent((videoCont?.currentTime / videoCont?.duration) * 100);
  }, 1000);

  return (
    <SingleVideoRepro>
      <Video ref={videoRef} preload="metadata">
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl} type="video/wav" />
        <track kind="captions" />
        Your browser does not support the video
      </Video>
      <ControlCont>
        <TimeLineBack>
          <TimeLineFront time={currentPercent} />
        </TimeLineBack>
        <PlayCont onClick={handlePayPause}>
          {isPaused ? <Pause size={15} /> : <Play size={15} />}
        </PlayCont>
        <ViewsText>10K VIEWS</ViewsText>
        <Space />
        <TextWraper>
          <TimeText>
            {day.set('seconds', currentTime || 0).format('mm:ss')}
          </TimeText>
        </TextWraper>
      </ControlCont>
    </SingleVideoRepro>
  );
};
