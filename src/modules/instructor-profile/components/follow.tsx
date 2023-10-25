import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const FollowMainDiv = styled.div`
  display: flex;
  width: inherit;
  justify-content: center;
  align-items: center;
  margin: 15px 0px 20px 0px;
`;
const NumberTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 1rem;
  padding-left: 1rem;
  cursor: pointer;
`;
const Numbers = styled.p`
  font-size: 16px;
  margin-block: 0px;
  font-weight: 600;
`;
const Text = styled.span`
  font-size: 12px;
  color: gray;
`;

const VerticalDivider = styled.span`
  width: 1px;
  height: 50%;
  background-color: #404040; ;
`;

type FollowData = {
  followers?: string[];
  following?: string[];
  currentFollow?: number;
  checkIns?: number | undefined;
  username: string;
};

const Follow: React.FC<FollowData> = ({
  followers,
  following,
  currentFollow,
  checkIns,
  username,
}) => {
  const { push } = useRouter();

  const { t } = useTranslation();
  const FollowersText = t('Followers');
  const FollowingText = t('Following');
  const CheckInsText = t('CheckIns');

  return (
    <FollowMainDiv>
      <NumberTextDiv
        onClick={() => {
          push(`/${username}/following`);
        }}>
        <Numbers>{following.length || 0}</Numbers>
        <Text>{FollowingText}</Text>
      </NumberTextDiv>
      <VerticalDivider />
      <NumberTextDiv
        onClick={() => {
          push(`/${username}/followers`);
        }}>
        <Numbers>{followers.length + currentFollow || 0}</Numbers>
        <Text>{FollowersText}</Text>
      </NumberTextDiv>
      <VerticalDivider />
      <NumberTextDiv
        style={{ border: 'none' }}
        onClick={() => push(`/${username}/activity/week`)}>
        <Numbers>{checkIns}</Numbers>
        <Text>{CheckInsText || 0}</Text>
      </NumberTextDiv>
    </FollowMainDiv>
  );
};

export default Follow;
