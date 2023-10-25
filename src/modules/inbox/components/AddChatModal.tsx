import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import styled from 'styled-components';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import router from 'next/router';
import ModalOverlay from '../../modal-overlay';
import { db } from '../../../../firebaseConfig';
import useFirebaseAuth from '../../../hooks/useFirebaseAuth';
import AutoComplete from '../../../shared/components/AutoComplete/AutoComplete';
import { User } from '../../../shared/models/user.model';
import UserSearchItem from './UserSearchItem';

const InputButtonContainer = styled.div`
  margin-top: 20px;
  padding-inline: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-block: 20px;
  gap: 8px;
`;

type AddChatModalProps = {
  open: boolean;
  onCloseClick: () => void;
  existingUsers?: {
    user: string;
    id: string;
    lastSent: string;
    lastMessage: string;
    userInfo: { email: string; username: string; uid: string }[];
    schoolName?: string;
  }[];
  isGroupChat?: boolean;
};

const AddChatModal: React.FC<AddChatModalProps> = ({
  open,
  onCloseClick,
  existingUsers,
  isGroupChat,
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [isUserLoading, setIsUserLoading] = useState(false);

  const { authUser } = useFirebaseAuth();
  const addChat = async (): Promise<void> => {
    if (authUser) {
      setLoading(true);
      const chatExists = existingUsers
        ?.filter(
          (chat) =>
            chat?.userInfo?.filter(
              (user) => user?.username === selectedUser?.username,
            ).length,
        )
        .filter((chat) => !chat.schoolName);

      if (!chatExists.length) {
        await addDoc(collection(db, 'chats'), {
          users: [authUser?.email, selectedUser?.email],
          lastSent: serverTimestamp(),
          lastMessage: 'Say Hi!',
          userInfo: [
            {
              email: authUser?.email,
              username: authUser?.userInfo?.username,
              fullName: authUser?.userInfo?.displayName,
              uid: authUser?.uid,
            },
            {
              email: selectedUser?.email,
              username: selectedUser?.username,
              fullName: selectedUser?.displayName,
              uid: selectedUser?.firebaseId,
            },
          ],
        })
          .then((res) => {
            router.push(`/inbox/${res.id}`);
          })
          .catch((err) => {
            console.log('Could not create a chat: ', err);
            setError(true);
            setLoading(false);
          });
      } else {
        router.push(`/inbox/${chatExists?.[0]?.id}`);
        setLoading(false);
      }

      setLoading(false);
    }
  };

  const searchForUsers = (searchText: string): void => {
    setIsUserLoading(true);
    axios('/api/User/search', {
      params: {
        searchText,
      },
    })
      .then((res) => {
        setUsers(
          [...res.data]?.filter((user) => user.email !== authUser?.email),
        );
      })
      .catch((err) => {
        console.log('Could not fetch Users', err);
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  };

  return (
    <>
      <ModalOverlay
        open={open}
        onCloseClick={onCloseClick}
        width="80%"
        alignItems="center"
        height="fit-content"
        borderRadius="8px"
        title="Add Person To Chat">
        <InputButtonContainer>
          <AutoComplete
            value={selectedUser}
            onChange={(_, value) => setSelectedUser(value)}
            onChangeText={searchForUsers}
            options={users}
            label="Enter Name"
            keyName="displayName"
            loading={isUserLoading}
            keyName2="username"
            keyName3="email"
            error={error && 'Something Went Wrong'}
            renderOption={<UserSearchItem />}
          />
          <ButtonContainer>
            <Button
              onClick={onCloseClick}
              variant="contained"
              sx={{
                backgroundColor: '#333333',
                borderRadius: '6px',
                height: '35px',
                fontSize: '12px',
                fontWeight: 600,
              }}>
              Close
            </Button>
            <LoadingButton
              onClick={addChat}
              loading={loading}
              variant="contained"
              loadingIndicator={<CircularProgress color="primary" size={20} />}
              disabled={!selectedUser}
              sx={{
                borderRadius: '6px',
                height: '35px',
                fontSize: '12px',
                fontWeight: 600,
              }}>
              {isGroupChat ? 'Add Participants' : 'Create Chat'}
            </LoadingButton>
          </ButtonContainer>
        </InputButtonContainer>
      </ModalOverlay>
    </>
  );
};

export default AddChatModal;
