import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { SAFE_AREA_VIEW_PADDING_BOTTOM } from '../../shared/styles/SafeAreaView';
import HeaderDojo from '../headers/HeaderDojo';
import UserAvatar from '../userAvatar';
import ChatHeaderContent from './components/ChatHeaderContent';
import ChatMessage from './components/ChatMessage';
import { db } from '../../../firebaseConfig';
import { LoadingWrapper } from '../../pages';
import ModalOverlay from '../modal-overlay';
import GroupInfoModal from './components/GroupInfoModal';
import GroupChatMessage from './components/GroupChatMessage';
import { MessageType } from '.';

const Icon = styled.img``;
const MessageWrapper = styled.div`
  background-color: '#282828';
  margin-top: 110px;
  padding: 0px 16px;
  display: flex;
  height: 100%;
  z-index: 100;
  padding-bottom: 88px;
  align-items: flex-end;
`;
const ChatInputFooter = styled.div`
  display: flex;
  flex-direction: row;
  padding: 6px 16px calc(${SAFE_AREA_VIEW_PADDING_BOTTOM}px + 6px) 16px;
  align-items: center;
  gap: 8px;
  width: 100%;
  position: fixed;
  bottom: -0.5px;
  background-color: #111111;
  left: 0px;
  box-shadow: 0px -3px 0px rgba(24, 24, 24, 0.35);
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  width: 100%;
`;

const SendIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const DateLine = styled.div`
  font-size: small;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  &:before {
    content: '';
    display: block;
    height: 1px;
    width: 24px;
    background-color: #3c3c3c;
    width: 30%;
    margin-right: 10px;
  }
  &:after {
    content: '';
    display: block;
    height: 1px;
    width: 24px;
    background-color: #3c3c3c;
    width: 30%;
    margin-left: 10px;
  }
`;

const Notif = styled.div`
  font-size: small;
  margin-bottom: 16px;
  width: 100%;
  text-align: center;
`;

type Inputs = {
  text: string;
  isNotif?: boolean;
};

interface ChatScreenProps {
  authUser;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ authUser }) => {
  const { control, handleSubmit, watch, setValue } = useForm<Inputs>();
  const router = useRouter();
  const { id } = router?.query;
  const [values] = useDocumentData(doc(db, 'chats', id.toString()));
  const messageRef = collection(db, 'chats', id as string, 'messages');
  const chatPath = doc(db, 'chats', id as string);
  const chatVals = useCollectionData(
    query(
      collection(db, 'chats', id as string, 'messages'),
      orderBy('createdAt', 'desc'),
    ),
  );
  const chatDocs = chatVals?.[3]?.docs;
  const receiverInfo = values?.userInfo?.find(
    (user) => user.email !== authUser?.email,
  );

  const currentUser = values?.userInfo?.find(
    (user) => user.email === authUser?.email,
  );

  const isSchool = Boolean(values?.schoolName);

  const lastMessage = useRef(null);
  const isTogetherLimit = 10;

  const handleFormSubmit = async (data: Inputs): Promise<void> => {
    const { uid, userInfo } = authUser;
    await addDoc(messageRef, {
      ...(data?.isNotif && { isNotif: data?.isNotif }),
      Message: data.text,
      createdAt: serverTimestamp(),
      uid,
      isRead: false,
      ...(isSchool && { username: userInfo?.username }),
      ...(isSchool && { fullName: userInfo?.displayName }),
      ...(isSchool && { readBy: [] }),
    });
    await updateDoc(chatPath, {
      lastSent: serverTimestamp(),
      lastMessage: data.text,
      lastMessageObj: {
        message: data.text,
        uid,
        isRead: false,
      },
      ...(isSchool && { lastReadBy: [userInfo?.username] }),
    });
    setValue('text', '');
  };

  const setReadStatus = async (): Promise<void> => {
    if (chatDocs?.length) {
      for (let idx = 0; idx < chatDocs?.length; idx += 1) {
        if (chatDocs[idx].data().uid !== authUser?.uid) {
          updateDoc(
            doc(
              db,
              'chats',
              id as string,
              'messages',
              chatDocs[idx]?.id.toString(),
            ),
            {
              isRead: true,
            },
          );
          updateDoc(chatPath, {
            lastMessageObj: {
              isRead: true,
            },
          });
        } else {
          break;
        }
      }
      if (isSchool) {
        for (let idx = 1; idx < chatDocs?.length; idx += 1) {
          if (
            chatDocs[idx]
              .data()
              ?.readBy?.indexOf(authUser?.userInfo?.username) !== -1
          ) {
            updateDoc(
              doc(
                db,
                'chats',
                id as string,
                'messages',
                chatDocs[idx]?.id?.toString(),
              ),
              {
                readBy: arrayRemove(authUser?.userInfo?.username),
              },
            );
            break;
          }
        }
        updateDoc(
          doc(
            db,
            'chats',
            id as string,
            'messages',
            chatDocs[0]?.id?.toString(),
          ),
          {
            readBy: arrayUnion(authUser?.userInfo?.username),
            ...(chatDocs[0].data().uid !== authUser?.uid && { isRead: true }),
          },
        );
        updateDoc(chatPath, {
          lastReadBy: arrayUnion(authUser?.userInfo?.username),
        });
      }
    }
  };

  useEffect(() => {
    lastMessage?.current?.scrollIntoView({ behavior: 'smooth' });
    setReadStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatVals?.[0]?.length, lastMessage?.current]);

  // After use for firebase
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleChatScreenModal = (): void => {
    if (isSchool) {
      setIsModalVisible(!isModalVisible);
    }
  };

  const onAddMember = (users): void => {
    updateDoc(chatPath, {
      userInfo: arrayUnion(
        ...users.map((user) => {
          return {
            username: user?.username,
            fullName: user?.displayName,
            uid: user?.firebaseId,
            email: user?.email,
          };
        }),
      ),
      users: arrayUnion(...users.map((user) => user?.email)),
    });
    handleFormSubmit({
      text: `${users?.map((user) => ` ${user?.displayName}`)} got added${
        authUser?.userInfo?.displayName
          ? ` by ${authUser?.userInfo?.displayName}`
          : ''
      }.`.slice(1),
      isNotif: true,
    });
  };

  const onAddRemove = (user): void => {
    updateDoc(chatPath, {
      userInfo: arrayRemove(user),
      users: arrayRemove(user.email),
    });
    handleFormSubmit({
      text: `${user?.fullName} got removed${
        authUser?.userInfo?.displayName
          ? ` by ${authUser?.userInfo?.displayName}`
          : ''
      }.`,
      isNotif: true,
    });
  };

  return (
    <>
      <HeaderDojo
        IconLeft={<Icon src="/assets/icons/back-arrow.svg" />}
        onIconLeftCLick={() => router.back()}
        IconRight={<Icon src="/assets/icons/three-dot.svg" />}
        onIconRightClick={handleChatScreenModal}
        headerContent={
          receiverInfo || isSchool ? (
            <ChatHeaderContent
              uid={receiverInfo?.uid}
              username={receiverInfo?.username}
              title={values?.schoolName || receiverInfo?.fullName}
              isSchool={isSchool}
              schoolLogo={values?.schoolLogo}
            />
          ) : (
            <></>
          )
        }
        titleShow={false}
      />

      <MessageWrapper>
        {typeof chatVals?.[0] === 'undefined' ? (
          <LoadingWrapper>
            <CircularProgress size={20} color="primary" />
          </LoadingWrapper>
        ) : (
          <MessageContainer>
            <div ref={lastMessage} />
            {chatVals?.[0]?.length ? (
              chatVals?.[0]?.map((msg: MessageType, idx, msgs) => {
                const prevMsg = msgs[idx - 1];
                const nextMsg = msgs[idx + 1];
                const isSend = msg.uid === authUser?.uid;
                const isPrevSame = prevMsg?.uid === msg?.uid;
                const isFirstBottom = idx === msgs.length - 1;
                const time = new Date(
                  msg?.createdAt?.toDate(),
                ).toLocaleTimeString('en-GB', { timeStyle: 'short' });
                const difference = Math.abs(
                  (new Date(msg?.createdAt?.toDate()).valueOf() -
                    new Date(prevMsg?.createdAt?.toDate()).valueOf()) /
                    60000,
                );
                const differentDay = Math.abs(
                  new Date(msg?.createdAt?.toDate()).getDate() -
                    new Date(nextMsg?.createdAt?.toDate()).getDate(),
                );
                return (
                  <>
                    {isSchool ? (
                      <>
                        {msg?.isNotif ? (
                          <Notif>{msg?.Message}</Notif>
                        ) : (
                          <GroupChatMessage
                            key={msg?.createdAt?.toDate()}
                            isSend={isSend}
                            isTogether={
                              difference <= isTogetherLimit &&
                              isPrevSame &&
                              !isFirstBottom &&
                              prevMsg.isRead === msg.isRead &&
                              !prevMsg?.isNotif
                            }
                            data={msg}
                            time={
                              time.toLowerCase() !== 'invalid date'
                                ? time
                                : 'loading...'
                            }
                          />
                        )}
                      </>
                    ) : (
                      <ChatMessage
                        key={msg?.createdAt?.toDate()}
                        isSend={isSend}
                        isTogether={
                          difference <= isTogetherLimit &&
                          isPrevSame &&
                          !isFirstBottom &&
                          prevMsg.isRead === msg.isRead
                        }
                        data={msg}
                        time={
                          time.toLowerCase() !== 'invalid date'
                            ? time
                            : 'loading...'
                        }
                        username={
                          isSend
                            ? authUser?.userInfo?.username
                            : receiverInfo?.username
                        }
                      />
                    )}
                    {differentDay !== 0 && (
                      <DateLine>
                        {new Date(msg?.createdAt?.toDate()).toDateString()}
                      </DateLine>
                    )}
                  </>
                );
              })
            ) : (
              <span style={{ marginBottom: '44px' }}>
                Try starting a conversation by saying &quot;Hi&quot;
              </span>
            )}
          </MessageContainer>
        )}
        <ChatInputFooter>
          <UserAvatar
            avatarDimension={40}
            beltHeight={4}
            username={authUser?.userInfo?.username}
          />
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Controller
              name="text"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{
                    width: '100%',
                    border: '1px solid #3C3C3C',
                    borderRadius: '4px',

                    background: '#111111',
                    color: 'white',
                    height: 'fit-content',
                    '& .MuiInputBase-root': {
                      padding: '8px 16px',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                  }}
                  multiline
                  placeholder={`Add a comment as ${authUser?.userInfo?.username}`}
                  value={field.value}
                  maxRows={3}
                  onChange={field.onChange}
                  type="submit"
                />
              )}
            />
            {watch('text') && (
              <Button
                sx={{
                  backgroundColor: '#D21632',
                  marginLeft: '8px',
                  minWidth: '40px',
                  padding: '0px',
                  minHeight: '40px',
                }}
                type="submit"
                variant="contained">
                <SendIcon
                  src="/assets/icons/send.svg"
                  style={{ width: '13px', height: '13px' }}
                />
              </Button>
            )}
          </form>
        </ChatInputFooter>
      </MessageWrapper>
      {isSchool && (
        <ModalOverlay
          height="95%"
          open={isModalVisible}
          onCloseClick={handleChatScreenModal}>
          <GroupInfoModal
            onAddMember={onAddMember}
            isCurrentAdmin={currentUser?.isAdmin}
            groupData={values}
            onAddRemove={onAddRemove}
          />
        </ModalOverlay>
      )}
    </>
  );
};

export default ChatScreen;
