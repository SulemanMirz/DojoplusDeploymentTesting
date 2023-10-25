import { Avatar, Divider } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ModalOverlay from '../../modal-overlay';
import CreateGroupModal from './CreateGroupModal';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 20px;
`;
const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 20px;
  cursor: pointer;
`;
const UserName = styled.div`
  padding-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

interface AddParticipantProps {
  onAddMember: (users) => void;
  members: { username: string; email: string; uid: string; fullName: string }[];
}

const AddParticipant: React.FC<AddParticipantProps> = ({
  onAddMember,
  members,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleGroupCreateModal = (): void => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <>
      <Container onClick={() => handleGroupCreateModal()}>
        <UserContainer>
          <Avatar
            sx={{ backgroundColor: '#D21632', width: '54px', height: '54px' }}>
            <PersonAddIcon />
          </Avatar>
          <UserName>
            <Name>Add participant</Name>
          </UserName>
        </UserContainer>
      </Container>
      <ModalOverlay
        title="Add Members"
        open={isModalVisible}
        onCloseClick={handleGroupCreateModal}
        height="95%">
        <CreateGroupModal
          handleModal={handleGroupCreateModal}
          onAddMember={onAddMember}
          members={members}
        />
      </ModalOverlay>
      <Divider sx={{ backgroundColor: 'gray' }} />
    </>
  );
};

export default AddParticipant;
