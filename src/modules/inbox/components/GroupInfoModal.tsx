import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import AddParticipant from './AddParticipant';
import UserCard from './UserCard';
import SearchBar from '../../add-ranks/components/SearchBar';
import { ProfileTabEmptyMessage } from '../../../shared/components/ProfileTabEmptyMessage';

const Container = styled.div`
  overflow-x: scroll;
  @media screen and (min-width: 700px) {
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.div`
  margin-top: 10px;
  font-size: 20px;
  font-weight: 400;
`;

const Seprate = styled.div`
  margin-top: 15px;
  height: 1px;
  background-color: #4f4f4f;
  width: 100%;
`;

const SubGroup = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin-top: 8px;
  color: #bdbdbd;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const SearchCardContainer = styled.div`
  margin-inline: 16px;
`;

interface GroupChatInfoProps {
  groupData;
  isCurrentAdmin: boolean;
  onAddMember: (users) => void;
  onAddRemove: (user) => void;
}

const GroupChatInfo: React.FC<GroupChatInfoProps> = ({
  groupData,
  isCurrentAdmin,
  onAddMember,
  onAddRemove,
}) => {
  const [finalData, setFinalData] = useState(groupData?.userInfo || []);

  const handleRemove = (user): void => {
    onAddRemove(user);
    setFinalData(groupData?.userInfo);
  };

  const searchForUsers = (txt): void => {
    if (!txt) {
      setFinalData(groupData?.userInfo);
      return;
    }
    setFinalData(
      finalData?.filter(
        (fil) =>
          fil?.displayName?.toLowerCase().includes(txt.toLowerCase()) ||
          fil?.username?.toLowerCase().includes(txt.toLowerCase()),
      ),
    );
  };

  useEffect(() => {
    setFinalData(groupData?.userInfo);
  }, [groupData?.userInfo]);

  const DefaultAvatar = '/assets/logo/dojo.png';

  return (
    <Container>
      <AvatarContainer>
        <Avatar
          sx={{ width: '150px', height: '150px', marginTop: '20px' }}
          src={groupData?.schoolLogo || DefaultAvatar}
        />
        <Title>{groupData?.schoolName || 'Group Name'}</Title>
        <SubGroup>
          Group · {groupData?.users?.length || 0} Participants
        </SubGroup>
        <Seprate />
      </AvatarContainer>
      <SearchCardContainer>
        <>
          <SearchContainer>
            <SearchBar
              dontDebounceOnFirst
              fetch={(txt) => searchForUsers(txt)}
              style={{
                position: 'unset',
              }}
            />
          </SearchContainer>
          {isCurrentAdmin && (
            <AddParticipant
              members={groupData?.userInfo}
              onAddMember={onAddMember}
            />
          )}
          {finalData.length === 0 ? (
            <ProfileTabEmptyMessage value="404 - not found" />
          ) : (
            <>
              {[...finalData]
                ?.sort((a, b) => { // to make the admins come on top
                  if (a.isAdmin) {
                    return -1;
                  }
                  if (b.isAdmin) {
                    return 1;
                  }
                  return 0;
                })
                ?.map((ele) => {
                  return (
                    <UserCard
                      handleRemove={handleRemove}
                      isAdmin={ele.isAdmin}
                      isCurrentAdmin={isCurrentAdmin}
                      groupData={ele}
                    />
                  );
                })}
            </>
          )}
        </>
      </SearchCardContainer>
    </Container>
  );
};

export default GroupChatInfo;
