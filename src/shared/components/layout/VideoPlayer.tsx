import React, { useState } from 'react';

import ReactPlayer from 'react-player';

import { Box } from '@mui/material';

interface VideoPlayerProps {
  src: string;
  height?: string | number;
  width?: string | number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, height, width }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const onLoadedData: () => void = () => {
    setIsVideoLoaded(true);
  };
  return (
    <Box>
      <ReactPlayer
        style={{ opacity: isVideoLoaded ? 1 : 0, marginInline: '4px' }}
        url={src}
        width={width || '100%'}
        height={height || '100%'}
        playing
        controls
        loop
        muted
        playsinline
        onReady={onLoadedData}
      />
    </Box>
  );
};

export default VideoPlayer;
