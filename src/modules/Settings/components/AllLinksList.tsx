import React from 'react';
import styled from 'styled-components';

import { PrivateClassDivider } from './SettingsDivider';

const ListItem = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PrimaryText = styled.p`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 120%;
  color: #fcfcfc;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  margin: 0px;
  max-width: calc(100vw - 113px);
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SecondryText = styled.p`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 120%;
  color: #828282;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  margin: 0px 0px 8px;
`;

const SocialText = styled.div`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #828282;
`;

const Svg = styled.svg``;

type PrivateClassItemProps = {
  onSelect: () => void;
  primaryText: string;
  socialText?: string;
  secondaryText?: string;
};

export const AllLinksList: React.FC<PrivateClassItemProps> = ({
  onSelect,
  primaryText,
  secondaryText,
  socialText,
}) => {
  return (
    <>
      <ListItem onClick={onSelect}>
        <Item>
          <img
            src="/assets/icons/link.svg"
            alt="icon"
            style={{
              marginRight: 14,
              height: 20,
              width: 20,
            }}
          />

          <div>
            {secondaryText && <SecondryText>{secondaryText}</SecondryText>}
            <PrimaryText>{primaryText}</PrimaryText>
            {socialText && <SocialText>{socialText}</SocialText>}
          </div>
        </Item>
        <Svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.17192 6.99999L0.221924 2.04999L1.63592 0.635986L7.99992 6.99999L1.63592 13.364L0.221924 11.95L5.17192 6.99999Z"
            fill="#FCFCFC"
          />
        </Svg>
      </ListItem>
      <PrivateClassDivider variant="inset" />
    </>
  );
};
