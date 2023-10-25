import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import router from 'next/router';
import {
  collection,
  doc,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { CircularProgress } from '@mui/material';
import HeaderDojo from '../headers/HeaderDojo';
import ChatCard from './components/ChatCard';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import AddChatModal from './components/AddChatModal';
import { db } from '../../../firebaseConfig';
import { DEFAULT_AVATAR_URL } from '../../shared/utils/ultils';
import { TextWhite18Regular400 } from '../../shared/components/texts';
import { LoadingWrapper } from '../../pages';

export type MessageType = {
  Message: string;
  isRead: boolean;
  username: string;
  uid: string;
  createdAt;
  fullName: string;
  readBy?: string[];
  isNotif?: boolean;
};

const IconWrapper = styled.img``;
const SchoolCardWrapper = styled.div`
  padding: 98px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Inbox: React.FC<{ userEmail?: string }> = ({ userEmail }) => {
  const { authUser } = useFirebaseAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModal = (): void => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    if (authUser) {
      setDoc(
        doc(db, 'users', authUser.uid),
        {
          email: authUser.email,
          lastActive: serverTimestamp(),
          photoURL: authUser?.userInfo?.photo?.[0]?.url || DEFAULT_AVATAR_URL,
        },
        { merge: true },
      );
    }
  }, [authUser]);

  const [chatValues] = useCollection(
    query(collection(db, 'chats'), where('users', 'array-contains', userEmail)),
  );
  const users =
    chatValues?.docs
      .map((chat) => {
        return {
          user: chat?.data()?.users,
          id: chat?.id,
          lastSent: chat.data().lastSent,
          lastMessage: chat.data().lastMessage,
          userInfo: chat.data().userInfo,
          ...(chat.data().schoolName && { schoolName: chat.data().schoolName }),
          ...(chat.data().schoolLogo && { schoolLogo: chat.data().schoolLogo }),
        };
      })
      ?.sort(
        (a, b) =>
          +new Date(b?.lastSent?.toDate()) - +new Date(a?.lastSent?.toDate()),
      ) || [];

  return (
    <>
      <HeaderDojo
        title="Chats"
        IconRight={<IconWrapper src="/assets/icons/chat-icon.svg" />}
        onIconRightClick={() => handleModal()}
      />
      <AddChatModal
        open={isModalVisible}
        onCloseClick={handleModal}
        existingUsers={users}
      />
      {typeof chatValues !== 'undefined' ? (
        <SchoolCardWrapper>
          {users?.length ? (
            users?.map((chat) => {
              const otherUser = chat?.userInfo?.filter(
                (user) => user.email !== userEmail,
              )?.[0];
              return (
                <ChatCard
                  key={chat?.id}
                  onClick={() => router.push(`/inbox/${chat.id}`)}
                  isUser={!chat?.schoolName}
                  title={chat?.schoolName || otherUser?.fullName}
                  lastMessage={chat?.lastMessage || 'message'}
                  lastSent={chat?.lastSent}
                  id={chat?.id}
                  username={otherUser?.username}
                  schoolLogo={chat?.schoolLogo}
                />
              );
            })
          ) : (
            <TextWhite18Regular400 style={{ marginTop: '20px' }}>
              Try starting a chat with the &apos;Add Chat&apos; button.
            </TextWhite18Regular400>
          )}
        </SchoolCardWrapper>
      ) : (
        <LoadingWrapper>
          <CircularProgress size={20} color="primary" />
        </LoadingWrapper>
      )}
    </>
  );
};

export default Inbox;
