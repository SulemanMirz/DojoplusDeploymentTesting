import React, { useState } from 'react';
import styledComponent from 'styled-components';
import { styled } from '@mui/material/styles';

import Link from 'next/link';

import { TextWhite14HoverUnderline, TextWhite12Regular } from './texts';
import { COLOR_BUTTON_RED } from '../styles/colors';
import { useFireBaseAuth } from '../../context/FirebaseContext';

export const ClaimDojoProfileContainer = styledComponent.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-block: 20px;

  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #111111 100%);
  position: fixed;
  width: 100%;
  bottom: 0px;
  left: 0px;
`;

export const ClaimDojoProfileBadge = styledComponent.div`
  width: fit-content;
  border-radius: 50px;
  background-color: ${COLOR_BUTTON_RED};
  padding-block: 13px;
  padding-inline: 22px;
  margin-bottom: 4px;
  cursor: pointer;
`;

const Icon = styled('img')(({ theme }) => ({
  maxWidth: 130,
  paddingLeft: 12,
  cursor: 'pointer',
}));

export const ClaimProfileBadge: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { authUser, loading } = useFireBaseAuth();

  return isVisible && !authUser && !loading ? (
    <ClaimDojoProfileContainer>
      <Link href="/register">
        <ClaimDojoProfileBadge>
          <TextWhite12Regular>dojo.plus/@yournamehere</TextWhite12Regular>
          <Icon
            src="/assets/icons/close.svg"
            alt="close"
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
          />
        </ClaimDojoProfileBadge>
      </Link>
      <Link href="/register">
        <TextWhite14HoverUnderline>
          Claim your DOJO+ profile now!
        </TextWhite14HoverUnderline>
      </Link>
    </ClaimDojoProfileContainer>
  ) : null;
};
