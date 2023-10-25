import React from 'react';
import styled from 'styled-components';
import AvatarMUI from '@mui/material/Avatar';
import MapComponent from '../../location/components/MapComponent';

export const AvatarContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  width: 100%;
`;

export const Avatar = styled(AvatarMUI)`
  width: 96px !important;
  height: 96px !important;
  border-radius: 48px !important;
  top: 48px;
`;

const MapWrapper = styled.div`
  position: absolute;
  height: 96px;
  width: 100%;
`;

type SchoolAvatarProps = {
  src?: string;
  onClick?: () => void;
  lat?: number;
  lng?: number;
  title?: string;
};

export const SchoolAvatar: React.FC<SchoolAvatarProps> = ({
  src,
  onClick,
  lat,
  lng,
  title,
}) => {
  const DefaultAvatar = '/assets/logo/dojo.png';
  return (
    <AvatarContainer>
      <MapWrapper
        style={{ height: 96, width: '100%', position: 'absolute' }}
        onClick={onClick}>
        <MapComponent zoomControl={false} lat={lat} lng={lng} title={title} />
      </MapWrapper>
      <Avatar variant="square" src={src || DefaultAvatar} />
    </AvatarContainer>
  );
};
