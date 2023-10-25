import React, { useState } from 'react';
import { CircularProgress, styled } from '@mui/material';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
  addDoc,
  collection,
  query as fbQuery,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { useRouter } from 'next/router';

import { User } from '../../../shared/models/user.model';
import { db } from '../../../../firebaseConfig';

const MessageIconContainer = styled('span')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '40px',
  width: '40px',
  marginLeft: '3px',
  backgroundColor: '#444',
  cursor: 'pointer',
});

const TabIconSvg = styled('svg')({
  height: '24px',
  width: '24px',
});

type MessageButtonProps = {
  profile: User;
  authUser;
};

const MessageButton: React.FC<MessageButtonProps> = ({ profile, authUser }) => {
  const [chatLoading, setChatLoading] = useState(false);

  const { push } = useRouter();

  const [chatValues] = useCollection(
    fbQuery(
      collection(db, 'chats'),
      where('users', 'array-contains', authUser?.email),
    ),
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
        };
      })
      ?.sort(
        (a, b) =>
          +new Date(b?.lastSent?.toDate()) - +new Date(a?.lastSent?.toDate()),
      ) || [];

  const addChat = async (): Promise<void> => {
    if (authUser) {
      setChatLoading(true);
      const chatExists = users.filter(
        (chat) =>
          chat?.userInfo?.filter((user) => user?.username === profile?.username)
            .length,
      );

      if (!chatExists.length) {
        await addDoc(collection(db, 'chats'), {
          users: [authUser?.email, profile?.email],
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
              email: profile?.email,
              username: profile?.username,
              fullName: profile?.displayName,
              uid: profile?.firebaseId,
            },
          ],
        })
          .then((res) => {
            push(`/inbox/${res.id}`);
          })
          .catch((err) => {
            console.log('Could not create a chat: ', err);
            setChatLoading(false);
          });
      } else {
        push(`/inbox/${chatExists?.[0]?.id}`);
        setChatLoading(false);
      }
      setChatLoading(false);
    }
  };

  return (
    <>
      <MessageIconContainer onClick={addChat}>
        {chatLoading ? (
          <CircularProgress color="primary" size={20} />
        ) : (
          <TabIconSvg>
            <path
              d="M6.955 19L2.5 22.5V4C2.5 3.73478 2.60536 3.48043 2.79289 3.29289C2.98043 3.10536 3.23478 3 3.5 3H21.5C21.7652 3 22.0196 3.10536 22.2071 3.29289C22.3946 3.48043 22.5 3.73478 22.5 4V18C22.5 18.2652 22.3946 18.5196 22.2071 18.7071C22.0196 18.8946 21.7652 19 21.5 19H6.955ZM6.263 17H20.5V5H4.5V18.385L6.263 17ZM11.5 10H13.5V12H11.5V10ZM7.5 10H9.5V12H7.5V10ZM15.5 10H17.5V12H15.5V10Z"
              fill="#fff"
            />
          </TabIconSvg>
        )}
      </MessageIconContainer>
    </>
  );
};

export default MessageButton;
