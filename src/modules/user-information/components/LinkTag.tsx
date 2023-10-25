import React from 'react';
import styled from 'styled-components';
import { styled as styledMUI } from '@mui/material/styles';
import { Button as ButtonMUI } from '@mui/material';
import { darkButtonStyles } from '../../../shared/styles/Button-style';

export const Container = styled.div`
  margin-bottom: 5px;
`;

export const Content = styled.a`
  margin-right: 5px;
  text-decoration: none;
`;

const Button = styledMUI(ButtonMUI)(() => ({
  '&.MuiButton-root': {
    width: 'auto',
    boxShadow: 'none !important',
  },
  '&:hover': {
    background: '#333',
  },
}));

interface LinkTagProps {
  btnText: string;
  link: string;
}

export const LinkTag: React.FC<LinkTagProps> = ({ btnText, link }) => {
  let StartIcon = null;
  const linkIcon = '/assets/icons/link.svg';
  const facebookIcon = '/assets/icons/facebook.svg';
  const instagramIcon = '/assets/icons/instagram.svg';
  const twitterIcon = '/assets/icons/twitter.svg';
  const youtubeIcon = '/assets/icons/youtube.svg';
  switch (true) {
  case btnText.toLocaleLowerCase().includes('youtube'):
    StartIcon = youtubeIcon;
    break;
  case btnText.toLocaleLowerCase().toLocaleLowerCase().includes('instagram'):
    StartIcon = instagramIcon;
    break;
  case btnText.toLocaleLowerCase().includes('facebook'):
    StartIcon = facebookIcon;
    break;
  case btnText.toLocaleLowerCase().includes('twitter'):
    StartIcon = twitterIcon;
    break;
  default:
    StartIcon = linkIcon;
  }

  return (
    <Container>
      <Content href={link} target="_blank" rel="noreferrer">
        <Button
          sx={darkButtonStyles}
          variant="contained"
          startIcon={<img src={StartIcon} alt="icon" />}
        >
          {btnText}
        </Button>
      </Content>
    </Container>
  );
};
