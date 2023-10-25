import { Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import UserAvatar from '../../modules/userAvatar';
import { buttonStylesRegular } from '../styles/Button-style';
import {
  TextGray12Regular,
  TextWhite14CapitalizeThin,
  TextWhite14Regular,
} from './texts';

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-top: 1px #404040 solid;
  padding: 24px 16px;
`;

const ImageAndTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
`;

const TextContainer = styled.div`
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

type ProfileCardProps = {
  username: string;
  name: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ username, name }) => {
  return (
    <>
      <CardContainer>
        <ImageAndTextContainer>
          <UserAvatar avatarDimension={64} username={username} />
          <TextContainer>
            <TextWhite14Regular>{name}</TextWhite14Regular>
            <TextWhite14CapitalizeThin style={{ textTransform: 'none' }}>
              {username}
            </TextWhite14CapitalizeThin>
            <TextGray12Regular>Member Since 2021</TextGray12Regular>
          </TextContainer>
        </ImageAndTextContainer>
        <Link href={`/${username}`}>
          <Button variant="contained" sx={buttonStylesRegular}>
            View
          </Button>
        </Link>
      </CardContainer>
    </>
  );
};

export default ProfileCard;
