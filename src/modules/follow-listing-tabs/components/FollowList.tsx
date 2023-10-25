import React, { useEffect, useState } from 'react';
import router from 'next/router';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import styled from 'styled-components';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import { useFireBaseAuth } from '../../../context/FirebaseContext';
import { buttonStyles } from '../../../shared/styles/Button-style';
import { IconButton } from '../../instructor-profile/components/instructorProfile-styled';
import usePageTransition from '../../../hooks/usePageTransition';
import { ProfileTabEmptyMessage } from '../../../shared/components/ProfileTabEmptyMessage';
import UserAvatar from '../../userAvatar';
import { User } from '../../../shared/models/user.model';

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

export const PromotedByImage = styled.img`
  object-fit: cover;
  height: 64px;
  width: 64px;
  margin-right: -25px;
`;
export const UserAvatarWrapper = styled.div`
  margin-left: 16px;
`;

export const UserBeltModal = styled.img`
  background-color: #484848;
  margin-left: -39px;
  margin-right: -25px;
  height: 7px;
  position: relative;
`;

export const BeltImgCont = styled.div``;

export const ImageAndTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
`;

const TextContainer = styled.div`
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TextName = styled.span`
  font-family: 'Saira';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
  color: #fcfcfc;
`;

const TextUsername = styled.span`
  @media screen and (max-width: 320px) {
    white-space: nowrap;
    width: 92px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 120%;
  color: #bdbdbd;
`;

const ListItemContainer = styled.div``;

type LIstCardProps = {
  followdata: User[];
  index: number;
  authUsername: string;
  initialFollowedList: string[];
};

const ListCard: React.FC<LIstCardProps> = ({
  followdata,
  index,
  authUsername,
  initialFollowedList,
}) => {
  const { authUser } = useFireBaseAuth();
  const email = authUser?.email || '';
  const [loading, setLoading] = useState(false);
  const [followedList, setFollowedList] = useState(initialFollowedList);

  const isFollowing = followedList.indexOf(followdata[index].username) !== -1;
  const nickName = followdata[index]?.nickname
    ? `"${followdata[index]?.nickname}"`
    : '';
  const name = `${followdata[index]?.firstName || ''} ${nickName} ${
    followdata[index]?.lastName || ''
  }`;

  const handleFollow = (username, followed): void => {
    if (!authUser) {
      router.push(
        `${window.location.origin}/login?returnTo=${window.location.href}`,
      );
      return;
    }
    if (!loading) {
      if (!followed) {
        setLoading(true);
        axios
          .put(
            '/api/Follows',
            {},
            {
              params: {
                destinationUser: username,
                sourceUser: email,
                follow: true,
              },
            },
          )
          .then(() => {
            setFollowedList([...followedList, username]);
            setLoading(false);
          })
          .catch((e) => {
            setLoading(false);
            console.log(e);
          });
      } else {
        setLoading(true);
        axios
          .put(
            '/api/Follows',
            {},
            {
              params: {
                destinationUser: username,
                sourceUser: email,
                unfollow: true,
              },
            },
          )
          .then(() => {
            setFollowedList(
              followedList.filter((e) => {
                return e !== username;
              }),
            );
            setLoading(false);
          })
          .catch((e) => {
            setLoading(false);
            console.log(e);
          });
      }
    }
  };

  return (
    <>
      <ListItemButton
        style={{ paddingInline: '0px' }}
        onClick={() => {
          if (followdata[index].username) {
            router.push(`${followdata[index].username}`);
          }
        }}
      >
        <ImageAndTextContainer>
          <UserAvatarWrapper>
            <UserAvatar
              avatarDimension={64}
              username={followdata[index].username}
            />
          </UserAvatarWrapper>
          <TextContainer>
            <TextName>{name}</TextName>
            <TextUsername>{followdata[index]?.username}</TextUsername>
          </TextContainer>
        </ImageAndTextContainer>
      </ListItemButton>
      {authUsername !== followdata[index].username && (
        <Button
          style={{
            ...buttonStyles,
            maxWidth: 102,
            minWidth: 102,
            width: 102,
            backgroundColor: isFollowing ? 'transparent' : '#D21632',
            border: isFollowing ? '1px solid #4F4F4F' : '',
            boxShadow: 'none',
          }}
          variant="contained"
          onClick={() => {
            handleFollow(followdata[index].username, isFollowing);
          }}
          disabled={loading}
          startIcon={
            !isFollowing && <IconButton src="/assets/icons/person-add.svg" />
          }
        >
          {loading && (
            <CircularProgress
              color={isFollowing ? 'primary' : 'secondary'}
              size={20}
            />
          )}
          {!loading && <>{isFollowing ? 'Unfollow' : 'Follow'}</>}
        </Button>
      )}
    </>
  );
};

type FollowListType = {
  usernameProfile: string;
  tab: string;
};

export const FollowList: React.FC<FollowListType> = ({
  usernameProfile,
  tab,
}) => {
  const { authUser } = useFireBaseAuth();
  const authUsername = authUser?.userInfo?.username || '';
  const [followedList, setFollowedList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [followdata, setFollowdata] = useState([]);
  const count = followdata?.length || 0;

  const pageLoading = usePageTransition();

  useEffect(() => {
    if (pageLoading) setIsLoading(true);
  }, [pageLoading]);
  useEffect(() => {
    setIsLoading(true);
    if (authUsername) {
      axios('/api/Follows', {
        params: {
          username: authUsername,
          following: true,
        },
      })
        .then((res) => {
          setFollowedList(res.data);
        })
        .catch((e) => {
          setIsLoading(false);
          console.log(e);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (tab === 'followers') {
      axios('/api/Follows', {
        params: {
          username: usernameProfile,
          detailedFollowers: true,
        },
      })
        .then((res) => {
          setIsLoading(false);
          setFollowdata(res.data);
        })
        .catch((e) => {
          setIsLoading(false);
          console.log(e);
        });
    } else if (tab === 'following') {
      axios('/api/Follows', {
        params: {
          username: usernameProfile,
          detailedFollowings: true,
        },
      })
        .then((res) => {
          setIsLoading(false);
          setFollowdata(res.data);
        })
        .catch((e) => {
          setIsLoading(false);
          console.log(e);
        });
    } else if (tab === 'mutual') {
      axios('/api/Follows', {
        params: {
          sourceUser: authUsername,
          destinationUser: usernameProfile,
          detailedMutualFollowings: true,
        },
      })
        .then((res) => {
          setIsLoading(false);
          setFollowdata(res.data);
        })
        .catch((e) => {
          setIsLoading(false);
          console.log(e);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const renderRow = (
    props: ListChildComponentProps<FollowListType>,
  ): React.ReactElement => {
    const { index, style } = props;

    return (
      <ListItemContainer>
        <ListItem
          style={{
            ...style,
            padding: '10px 16px',
            borderBottom: '1px #404040 solid',
          }}
          key={index}
          disablePadding
        >
          <ListCard
            followdata={followdata}
            index={index}
            authUsername={authUsername}
            initialFollowedList={followedList}
          />
        </ListItem>
      </ListItemContainer>
    );
  };

  if (pageLoading || isLoading) {
    return (
      <LoadingWrapper>
        <CircularProgress size={20} />
      </LoadingWrapper>
    );
  }
  if (count === 0) {
    return (
      <LoadingWrapper>
        <ProfileTabEmptyMessage value="No follow data to show" />
      </LoadingWrapper>
    );
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          style={{ marginTop: '85px' }}
          width={width}
          height={height}
          itemSize={100}
          itemCount={count}
        >
          {renderRow}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};
