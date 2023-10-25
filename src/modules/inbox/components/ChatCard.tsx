import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import AvatarMUI from '@mui/material/Avatar';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import UserAvatar from '../../userAvatar';
import { db } from '../../../../firebaseConfig';
import { useFireBaseAuth } from '../../../context/FirebaseContext';

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  border-bottom: 0.5px #404040 solid;
  cursor: pointer;
  width: 100%;
`;

const Avatar = styled(AvatarMUI)`
  width: 48px !important;
  height: 48px !important;
`;

const SchoolNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SchoolNameText = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  color: #080808;
  max-width: calc(100vw - 215px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fcfcfc;
  margin-bottom: 6px;
`;

const SchoolLocationText = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  color: #828282;
  max-width: calc(100vw - 215px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Counter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  left: 216px;
  top: 0px;
  border-radius: 50px;
  padding: 4px 10px 4px 10px;
  background: #7062ff;
  border-radius: 50px;
  height: 22px;
`;

const TimeStamp = styled.div<{ unRead }>`
  margin-bottom: 3px;
  color: ${({ unRead }) => (unRead ? '#7062ff' : '#fcfcfc')};
`;

const MessageCounter = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: end;
  min-width: fit-content;
`;

const WrapperContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

const AvatarText = styled.div`
  display: 'flex';
  flex-direction: 'column';
`;
type SchoolCardProps = {
  isUser?: boolean;
  onClick?: () => void;
  title?: string;
  lastMessage?: string;
  lastSent;
  id: string;
  username: string;
  schoolLogo?: string;
};

const ChatCard: React.FC<SchoolCardProps> = ({
  isUser = false,
  onClick,
  title,
  lastMessage,
  lastSent,
  id,
  username,
  schoolLogo,
}) => {
  const { authUser } = useFireBaseAuth();

  const DefaultSchoolAvatar = '/assets/fallback_images/DefaultSchoolGrey.svg';

  const isSameDayMessage =
    new Date(lastSent?.toDate()).toDateString() === new Date().toDateString();

  const lastSentTime =
    new Date(lastSent?.toDate()).toLocaleTimeString('en-GB', {
      timeStyle: 'short',
    }) || 'loading...';

  const messageDate = new Date(lastSent?.toDate()).toLocaleDateString();

  const lastMessageTime =
    lastSentTime.toUpperCase() === 'INVALID DATE' ? 'loading...' : lastSentTime;

  const chatVals = useCollectionData(
    query(
      collection(db, 'chats', id as string, 'messages'),
      orderBy('createdAt', 'desc'),
    ),
  )?.[0]?.filter((chat) => !chat?.isRead && chat?.uid !== authUser?.uid).length;

  const mesCount = useRef(0);

  const allMessages = useCollectionData(
    query(
      collection(db, 'chats', id as string, 'messages'),
      orderBy('createdAt', 'desc'),
    ),
  )?.[0];

  useEffect(() => {
    if (!isUser) {
      for (let idx = 0; idx < allMessages?.length; idx += 1) {
        if (
          allMessages[idx]?.readBy?.indexOf(authUser?.userInfo?.username) === -1
        ) {
          mesCount.current = idx + 1;
        } else {
          break;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMessages]);

  return (
    <CardContainer onClick={onClick}>
      <WrapperContent>
        <SchoolNameContainer>
          <AvatarContainer>
            {isUser ? (
              <UserAvatar disableClick username={username} />
            ) : (
              <Avatar
                variant="circular"
                src={schoolLogo || DefaultSchoolAvatar}
              />
            )}
          </AvatarContainer>
          <AvatarText
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            <SchoolNameText>{title || 'Chat'}</SchoolNameText>
            <SchoolLocationText>{lastMessage || 'Message'}</SchoolLocationText>
          </AvatarText>
        </SchoolNameContainer>
        <MessageCounter>
          <TimeStamp unRead={chatVals || mesCount.current}>
            {(isSameDayMessage && lastMessageTime) || messageDate || '00:00'}
          </TimeStamp>
          {(chatVals || mesCount.current > 0) && (
            <Counter>{chatVals || mesCount.current}</Counter>
          )}
        </MessageCounter>
      </WrapperContent>
    </CardContainer>
  );
};

export default ChatCard;
