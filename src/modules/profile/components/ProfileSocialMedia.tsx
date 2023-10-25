import React from 'react';
import styled from 'styled-components';
import InstagramIconMUI from '@mui/icons-material/Instagram';

export const Container = styled.div`
  color: white;
  width: 40px;
  height: 40px;
  margin-left: 3px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0;
  background-color: #444;
  :hover {
    background-color: #333;
  }
`;

const LinkWrapper = styled.a`
  align-items: center;
  justify-content: center;
`;

const InstagramIcon = styled(InstagramIconMUI)`
  width: 100%;
  height: 100%;
  color: #fff;
`;

type ProfileSocialIconsProps = {
  instagramSRC?: string;
};

export const ProfileSocialMedia: React.FC<ProfileSocialIconsProps> = ({
  instagramSRC,
}) => {
  const instagram = instagramSRC.includes('@')
    ? instagramSRC.replace('@', '')
    : instagramSRC;

  return (
    <LinkWrapper
      target="_blank"
      href={
        instagram.includes('instagram.com')
          ? instagram
          : `https://www.instagram.com/${instagram}`
      }>
      <Container>
        <InstagramIcon fontSize="small" />
      </Container>
    </LinkWrapper>
  );
};

ProfileSocialMedia.defaultProps = {
  instagramSRC: 'https://www.instagram.com/',
};
