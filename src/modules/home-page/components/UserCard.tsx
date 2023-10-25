import React from 'react';
import router from 'next/router';
import styled from 'styled-components';
import UserAvatar from '../../userAvatar';
import { User } from '../../../shared/models/user.model';

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
  border-bottom: 0.5px #f2f2f2 solid;
  cursor: pointer;
`;

const UserCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 16px;
`;

const DisplayName = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
  color: #080808;
`;

const UserName = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  color: #646464;
`;
type UserCardProps = {
  handleModal: () => void;
  data: User;
  background?: string;
  schoolNameColor?: string;
  dividerColor?: string;
};

const UserCard: React.FC<UserCardProps> = ({
  handleModal,
  data,
  background,
  schoolNameColor,
  dividerColor,
}) => {
  return (
    <>
      <CardContainer
        style={{
          backgroundColor: background || '#ffffff',
          borderBottom: dividerColor
            ? `0.5px ${dividerColor} solid`
            : '0.5px #f2f2f2 solid',
        }}
        onClick={() => {
          router.push(`/${data.username}/ranks`);
          handleModal();
        }}
      >
        <UserAvatar avatarDimension={64} username={data.username} />
        <UserCardContainer>
          <DisplayName
            style={{
              color: schoolNameColor || '#080808',
            }}
          >
            {data.displayName || ''}
          </DisplayName>
          <UserName>{data.username || ''}</UserName>
        </UserCardContainer>
      </CardContainer>
    </>
  );
};

export default UserCard;
