import React from 'react';
import styled from 'styled-components';
import AvatarMUI from '@mui/material/Avatar';
import { DefaultAvatar } from './DefaultAvatar';

export const AvatarContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: -5px;
  z-index: 99;
`;

export const Avatar = styled(AvatarMUI)`
  width: 96px !important;
  height: 96px !important;
`;

const Belt = styled.img`
  background-color: #333333;
  font-size: 2.3vw;
  position: absolute;
  padding-top: 0;
  top: 0.28em;
  width: 100%;
  @media screen and (min-width: 903px) {
    top: 6.5px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  /* padding: 0.35em 0; */
  height: 4.83vw;
  box-sizing: content-box;
  object-fit: contain;
  font-size: 2.3vw;
  background-color: #333333;
  position: absolute;
  width: 100%;
  @media screen and (min-width: 903px) {
    height: 44px;
    font-size: 18px;
  }
`;

type ProfileAvatarProps = {
  src?: string;
  beltSrc?: string;
};

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  src,
  beltSrc,
}) => {
  return (
    <AvatarContainer>
      {beltSrc && (
        <Wrapper>
          <Belt src={beltSrc} alt="belt" />
        </Wrapper>
      )}
      <Avatar variant="square" src={src || DefaultAvatar} />
    </AvatarContainer>
  );
};
