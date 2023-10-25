import React from 'react';
import { Divider } from '@mui/material';
import styled from 'styled-components';
import UserAvatar from '../../userAvatar';
import OptionMenu from '../../menu';
import { useFireBaseAuth } from '../../../context/FirebaseContext';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-block: 8px;
  margin: 8px 0px;
`;
const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 20px;
`;
const UserName = styled.div`
  padding-left: 16px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const Name = styled.div`
  font-size: 16px;
  font-weight: 600;
`;
const PlaceHolder = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #bdbdbd;
`;
const AdminContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const GroupAdminButton = styled.div`
  padding: 6px 8px;
  border-radius: 2px !important;
  background-color: gray !important;
  font-size: 9px !important;
  font-weight: 200 !important;
  width: max-content;
`;

const OptionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

type UserCardProps = {
  isAdmin: boolean;
  groupData;
  handleRemove;
  isCurrentAdmin: boolean;
};
const options = ['Remove'];
const UserCard: React.FC<UserCardProps> = ({
  isAdmin,
  groupData,
  handleRemove,
  isCurrentAdmin,
}) => {
  const UserRemoveData = (): void => {
    handleRemove(groupData);
  };
  const { authUser } = useFireBaseAuth();

  return (
    <>
      <Container>
        <UserContainer>
          <UserAvatar avatarDimension={64} username={groupData?.username} />
          <UserName>
            <Name>{groupData?.fullName}</Name>
            <PlaceHolder>{groupData?.username}</PlaceHolder>
          </UserName>
        </UserContainer>
        {isAdmin && (
          <>
            <AdminContainer>
              <GroupAdminButton>Group Admin</GroupAdminButton>
            </AdminContainer>
          </>
        )}
        {isCurrentAdmin &&
          authUser?.userInfo?.username !== groupData?.username &&
          !groupData?.isAdmin && (
          <>
            <OptionContainer>
              <OptionMenu
                UserRemoveData={UserRemoveData}
                options={options}
                name={groupData?.fullName}
              />
            </OptionContainer>
          </>
        )}
      </Container>
      <Divider sx={{ backgroundColor: 'gray' }} />
    </>
  );
};

export default UserCard;
