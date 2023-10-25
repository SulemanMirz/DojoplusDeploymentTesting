import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  collection,
  doc,
  query,
  where,
  addDoc,
  serverTimestamp,
  deleteDoc,
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import router from 'next/router';
import { TextGray12Regular } from '../../../shared/components/texts';
import { Post, PostType } from '../../../shared/models/post.model';
import UserAvatar from '../../userAvatar';
import CheckInPostCard from './CheckInPostCard';
import RankPostCard from './RankPostCard';
import AchievementPostCard from './AchievementPostCard';
import {
  CardContainer,
  CommentButtonWrapper,
  Icon,
  PostDescription,
  PostHeader,
  ReactionRow,
  TextWhite13Regular400,
  NameWrapper,
  SchoolNameWrapper,
} from './posts.styled';
import { FeaturedNewsCard, NonFeaturedNewsCard } from './NewsCard';
import { db } from '../../../../firebaseConfig';
import useFirebaseAuth from '../../../hooks/useFirebaseAuth';

dayjs.extend(relativeTime);

interface PostCardProps {
  post?: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { authUser } = useFirebaseAuth();

  const username =
    post?.usernameFromCheckIns?.[0] ||
    post?.usernameFromRankId?.[0] ||
    post?.usernameFromAchievement?.[0];

  const likesRef = collection(db as any, 'posts', post?.id, 'likes');

  const likesVals = useCollectionData(
    query(
      collection(db as any, 'posts', post?.id, 'likes'),
      where('postId', '==', post?.id as string),
    ),
  );

  const likes = likesVals?.[3]?.docs?.map((lik) => {
    return {
      id: lik?.id,
      data: lik?.data(),
    };
  });

  const commentsVals = useCollectionData(
    query(
      collection(db as any, 'posts', post?.id, 'comments'),
      where('postId', '==', post?.id as string),
    ),
  );
  const commentsCount = commentsVals?.[3]?.docs?.length;

  const userExists = likes?.find((like) => like?.data?.uid === authUser?.uid);

  const handleLike = async (): Promise<void> => {
    if (!userExists) {
      addDoc(likesRef, {
        createdAt: serverTimestamp(),
        uid: authUser?.uid,
        username: authUser?.userInfo?.username,
        postId: post?.id,
      });
    } else {
      deleteDoc(doc(db as any, 'posts', post?.id, 'likes', userExists?.id));
    }
  };

  if (post?.postType === PostType.NEWS) {
    return (
      <>
        {post?.featuredFromAllArticles?.[0] ? (
          <a
            style={{ cursor: 'pointer' }}
            href={post?.linkFromAllArticles?.[0]}
            target="__blank"
          >
            <FeaturedNewsCard data={post} />
          </a>
        ) : (
          <a
            style={{ cursor: 'pointer' }}
            href={post?.linkFromAllArticles?.[0]}
            target="__blank"
          >
            <NonFeaturedNewsCard data={post} />
          </a>
        )}
      </>
    );
  }

  if (post?.postType === PostType.CHECK_IN && !post?.schoolLinkFromCheckIns) {
    return <></>;
  }

  return (
    <CardContainer>
      <PostHeader>
        <UserAvatar username={username} />
        <PostDescription>
          <TextWhite13Regular400>
            <NameWrapper
              onClick={() => {
                router.push(
                  `/${username}/ranks?returnTo=${window.location.href}`,
                );
              }}
            >
              {post?.displayNameFromCheckIns ||
                post?.displayNameFromRankId ||
                post?.displayNameFromAchievement}{' '}
            </NameWrapper>
            <TextWhite13Regular400 style={{ margin: 0, color: '#828282' }}>
              {post?.action}
            </TextWhite13Regular400>{' '}
            {post?.levelFromRankId ||
              post?.eventNameFromAchievement ||
              post?.eventNameUserEntryFromAchievement ||
              post?.classNameFromCheckIns}
            {post?.postType === PostType.CHECK_IN && (
              <>
                <TextWhite13Regular400 style={{ margin: 0, color: '#828282' }}>
                  {' '}
                  at{' '}
                </TextWhite13Regular400>
                <SchoolNameWrapper
                  onClick={() =>
                    router.push(`/school/${post?.slugLookupFromCheckIns}/info`)
                  }
                >
                  {post?.schoolNameFromCheckIns}
                </SchoolNameWrapper>
              </>
            )}
          </TextWhite13Regular400>
          <TextWhite13Regular400 style={{ color: '#828282' }}>
            {dayjs().to(dayjs(post?.posted))}
          </TextWhite13Regular400>{' '}
        </PostDescription>
      </PostHeader>
      {post?.postType === PostType.RANK && (
        <>
          <RankPostCard
            beltSource={post?.rankImageW375H24FromRankId?.[0]?.url}
            rankName={post?.levelFromRankId}
            verified={post?.verifiedFromRankId?.[0]}
            schoolName={post?.schoolNameFromRankId?.[0]}
            username={post?.usernameFromRankId?.[0]}
          />
        </>
      )}
      {post?.postType === PostType.ACHIEVEMENT && (
        <>
          <AchievementPostCard
            position={post?.rankFromAchievement?.[0]}
            matchName={
              post?.eventName2FromAchievement?.[0] ||
              post?.eventNameUserEntryFromAchievement?.[0]
            }
            location={`${post?.locationFromAchievement?.[0] || ''} ${
              post?.yearFromAchievement || ''
            }`}
            medalUrl={post?.medalFromAchievement?.[0]?.url}
          />
        </>
      )}
      {post?.postType === PostType.CHECK_IN && (
        <>
          <CheckInPostCard
            caption={post?.caption}
            lat={post?.latFromCheckIns}
            lng={post?.longFromCheckIns}
            mapId={post?.id}
            schoolAvatar={post?.schoolLogoFromCheckIns?.[0]?.url}
            schoolName={post?.schoolNameFromCheckIns}
            schoolLocation={`${post?.cityFromCheckIns}, ${post?.stateFromCheckIns}`}
            schoolSlug={post?.slugLookupFromCheckIns?.[0]}
          />
        </>
      )}
      <ReactionRow>
        <Icon
          onClick={handleLike}
          style={{ marginInline: 5, cursor: 'pointer' }}
          src={
            userExists
              ? '/assets/icons/thumb-up-colored.svg'
              : '/assets/icons/thumb-up.svg'
          }
        />
        <TextGray12Regular
          style={{ color: userExists ? '#FF595F' : '#E0E0E0' }}
        >
          {likes?.length || ''}
        </TextGray12Regular>
        <CommentButtonWrapper onClick={() => router.push(`/home/${post?.id}`)}>
          <Icon
            style={{ marginInline: 5, cursor: 'pointer' }}
            src="/assets/icons/comment.svg"
          />
          <TextGray12Regular>{commentsCount || ''}</TextGray12Regular>
        </CommentButtonWrapper>
      </ReactionRow>
    </CardContainer>
  );
};

export default PostCard;
