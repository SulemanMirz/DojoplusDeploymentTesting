import React from 'react';
import styled from 'styled-components';

const MartialImage = styled.img`
  height: 113px;
  width: 100%;
  border-radius: 0px;
`;

export interface ClintSideImageProps {
  src: string;
}

const ClintSideImage: React.FC<ClintSideImageProps> = ({ src }) => {
  const addImageFallback = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ): void => {
    e.currentTarget.src = '/assets/fallback_images/image-404040.png';
  };

  return <MartialImage src={src} onError={addImageFallback} />;
};

export default ClintSideImage;
