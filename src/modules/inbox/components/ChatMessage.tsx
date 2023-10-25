import React from 'react';
import styled from 'styled-components';
import { MessageType } from '..';
import UserAvatar from '../../userAvatar';

const MessageWrapper = styled.div<{ isTogether; isSend }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ isSend }) => (isSend ? 'flex-end' : 'flex-start')};
  padding: 10px;
  gap: 4px;
  width: fit-content;
  max-width: calc(100vw - 114px);
  min-width: 44px;
  height: 100%;
  flex-wrap: wrap;
  background: ${({ isSend }) => (isSend ? '#2c68f6' : '#419388')};
  border-radius: ${({ isTogether }) =>
    !isTogether ? '16px 16px 0px 16px' : '16px'};
  border-bottom-left-radius: ${({ isSend, isTogether }) =>
    isSend || isTogether ? '16px' : '0px'};
  border-bottom-right-radius: ${({ isSend, isTogether }) =>
    isSend && !isTogether ? '0px' : '16px'};
  margin-bottom: 7px;
`;

const Message = styled.div<{ isSend }>`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #ffffff;
  width: 100%;
  word-wrap: break-word;
  text-align: ${({ isSend }) => (isSend ? 'right' : 'left')};
`;

const ReadTimeStamp = styled.div<{ isSend }>`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 16px;
  color: ${({ isSend }) => (isSend ? '#ffffff' : '#111111')};
`;
const Time = styled.span``;
const Read = styled.span``;

const MessageUserAvatar = styled.div``;

const MessageContainer = styled.div<{ isTogether; isSend }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: ${({ isSend }) => (isSend ? 'flex-end' : 'flex-start')};
  margin-bottom: ${({ isTogether }) => (isTogether ? '0px' : '16px')};
`;

interface MessageProps {
  isTogether?: boolean;
  isSend: boolean;
  data: MessageType;
  time: string;
  username: string;
}

const ChatMessage: React.FC<MessageProps> = ({
  isTogether = false,
  isSend,
  data,
  time,
  username,
}) => {
  return (
    <MessageContainer isTogether={isTogether} isSend={isSend}>
      <MessageWrapper isSend={isSend} isTogether={isTogether}>
        <Message isSend={isSend}>{data.Message}</Message>
        {!isTogether ? (
          <ReadTimeStamp isSend={isSend}>
            <Time>{time}</Time> {data.isRead ? <Read>- Read</Read> : ''}{' '}
          </ReadTimeStamp>
        ) : (
          ''
        )}
      </MessageWrapper>
      {!isTogether && (
        <MessageUserAvatar>
          <UserAvatar avatarDimension={40} beltHeight={4} username={username} />
        </MessageUserAvatar>
      )}
    </MessageContainer>
  );
};

export default ChatMessage;
