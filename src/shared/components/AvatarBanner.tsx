import React from 'react';
import styled from 'styled-components';
import AvatarMUI from '@mui/material/Avatar';
import { DefaultAvatar } from './DefaultAvatar';

const Container = styled.div<{ width?: string; height?: string }>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
  display: flex;
  flex-direction: column;
`;

const Avatar = styled(AvatarMUI)`
  width: 100% !important;
  height: 100% !important;
  flex: 1;
`;

const Belt = styled.img`
  width: 100%;
  height: 5px;
`;

type AvatarBannerProps = {
  width?: string;
  height?: string;
  src?: string;
  srcBelt?: string;
};

export const AvatarBanner: React.FC<AvatarBannerProps> = ({
  width,
  height,
  src,
  srcBelt,
}) => {
  return (
    <Container width={width} height={height}>
      <Avatar variant="square" src={src || DefaultAvatar} alt="Avatar" />
      {srcBelt && <Belt src={srcBelt} alt="team belt" />}
    </Container>
  );
};
