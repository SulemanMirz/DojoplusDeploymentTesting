import { TextField, Button, CircularProgress } from '@mui/material';
import {
  query as fBQuery,
  collection,
  where,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { db } from '../../../firebaseConfig';
import { useFireBaseAuth } from '../../context/FirebaseContext';
import { LoadingWrapper } from '../../pages';
import { ProfileTabEmptyMessage } from '../../shared/components/ProfileTabEmptyMessage';
import { SAFE_AREA_VIEW_PADDING_BOTTOM } from '../../shared/styles/SafeAreaView';
import HeaderDojo from '../headers/HeaderDojo';
import UserAvatar from '../userAvatar';
import Comments from './components/Comments';

const Icon = styled.img``;
const ChatInputFooter = styled.div`
  display: flex;
  flex-direction: row;
  padding: 6px 16px calc(${SAFE_AREA_VIEW_PADDING_BOTTOM}px + 7px) 16px;
  align-items: center;
  gap: 8px;
  width: 100%;
  position: fixed;
  bottom: -1px;
  background-color: #111111;
  left: 0px;
  box-shadow: 0px -3px 0px rgba(24, 24, 24, 0.35);
`;

const SendIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const CommentsWrapper = styled.div`
  padding: 10px;
  display: flex;
`;

const CommentSectionHome: React.FC = () => {
  const { control, handleSubmit, setValue, watch } = useForm();
  const { authUser } = useFireBaseAuth();
  const { query, back } = useRouter();
  const postId = query?.postId as string;

  const commentsRef = collection(db as any, 'posts', postId, 'comments');

  const postVals = useCollectionData(
    fBQuery(
      collection(db as any, 'posts', postId, 'comments'),
      where('postId', '==', postId as string),
    ),
  );

  const postComments = postVals?.[3]?.docs
    ?.map((lik) => {
      return {
        id: lik?.id,
        data: lik?.data(),
      };
    })
    ?.sort(
      (a, b) =>
        +new Date(a?.data?.createdAt?.toDate()) -
        +new Date(b?.data?.createdAt?.toDate()),
    );

  const handleComment = (data): void => {
    addDoc(commentsRef, {
      createdAt: serverTimestamp(),
      uid: authUser?.uid,
      username: authUser?.userInfo?.username,
      displayName: authUser?.userInfo?.displayName,
      postId,
      comment: data?.comment,
    });
    setValue('comment', '');
  };

  return (
    <>
      <HeaderDojo
        backgroundColor="#101010"
        IconLeft={<Icon src="/assets/icons/back-arrow.svg" />}
        onIconLeftCLick={() => back()}
        title="Comments"
      />
      {typeof postComments === 'undefined' ? (
        <LoadingWrapper>
          <CircularProgress size={20} color="primary" />
        </LoadingWrapper>
      ) : (
        <>
          {postComments.length ? (
            [...postComments].map((contentData) => {
              return (
                <CommentsWrapper key={contentData?.id}>
                  <Comments contentData={contentData} />
                </CommentsWrapper>
              );
            })
          ) : (
            <ProfileTabEmptyMessage value="Be the first one to comment." />
          )}
        </>
      )}
      <ChatInputFooter>
        <UserAvatar
          avatarDimension={40}
          beltHeight={4}
          username={authUser?.userInfo?.username}
        />
        <form
          onSubmit={handleSubmit(handleComment)}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Controller
            name="comment"
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
                placeholder="Type a comment..."
                value={field.value}
                maxRows={3}
                onChange={field.onChange}
                type="submit"
              />
            )}
          />
          {watch('comment') && (
            <Button
              sx={{
                backgroundColor: '#D21632',
                marginLeft: '8px',
                minWidth: '40px',
                padding: '0px',
                minHeight: '40px',
              }}
              variant="contained"
              type="submit"
            >
              <SendIcon
                src="/assets/icons/send.svg"
                style={{ width: '13px', height: '13px' }}
              />
            </Button>
          )}
        </form>
      </ChatInputFooter>
    </>
  );
};

export default CommentSectionHome;
