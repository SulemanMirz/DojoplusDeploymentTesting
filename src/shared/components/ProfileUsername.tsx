import React from 'react';
import styled from 'styled-components';
import { COLOR_BACKGROUND_DARK } from '../styles/colors';
import { TextWhite18CapitalizeBold } from './texts';

const Text = styled.span`
  position: -webkit-sticky;
  position: sticky;
  top: 39px;
  background-color: ${COLOR_BACKGROUND_DARK};
  z-index: 81;
  display: block;
  text-align: center;
  padding: 11px 0px;
`;

type ProfileUsernameProps = {
  value: string;
};

export const ProfileUsername: React.FC<ProfileUsernameProps> = ({ value }) => {
  return (
    <Text>
      <TextWhite18CapitalizeBold>{value}</TextWhite18CapitalizeBold>
    </Text>
  );
};
