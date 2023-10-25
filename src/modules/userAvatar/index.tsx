import { Skeleton } from '@mui/material';
// import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { useAvatar } from '../../redux/slices/avatarSlice';
import { getAvatar } from '../../redux/thunk/avatarThunk';
import { DefaultAvatar } from '../../shared/components/DefaultAvatar';
import { useOnScreen } from '../../shared/hooks/UseOnScreen';
import { orderRanks } from '../../shared/utils/ranks-utils';
import {
  Avatar,
  Belt,
  UserAvatarWrapper,
} from './components/userAvatar-styled';

type UserAvatarProps = {
  username?: string;
  beltHeight?: number;
  avatarDimension?: number;
  disableClick?: boolean | undefined;
};

const UserAvatar: React.FC<UserAvatarProps> = ({
  username,
  avatarDimension = 48,
  beltHeight = 7,
  disableClick = false,
}) => {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const avatarData = useAvatar(username);

  const { push } = useRouter();

  const ref = useRef();
  const isVisible = useOnScreen(ref);

  useEffect(() => {
    if (isVisible) {
      try {
        if (!avatarData && username && isVisible) {
          setLoading(true);
          dispatch(getAvatar(username)).then(() => setLoading(false));
        } else {
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
        console.log(e, 'error in userAvatar of ', username);
      }
    }
  }, [avatarData, dispatch, isVisible, username]);

  if (isLoading && username) {
    return (
      <div ref={ref}>
        <Skeleton
          variant="rectangular"
          width={avatarDimension}
          height={avatarDimension}
        />
      </div>
    );
  }

  const avatar = avatarData?.photo ? avatarData.photo[0]?.url : '';
  const featuredRank = avatarData?.ranks?.find((rank) => rank.featuredRank)
    ?.rankImageW64H8FromMartialArtsRanks[0].url;
  let recentBelt: any = avatarData?.ranks[0]
    ? orderRanks(avatarData.ranks)[0].rankImageW64H8FromMartialArtsRanks
    : undefined;
  recentBelt = recentBelt ? recentBelt[0].url : '';
  const belt = featuredRank || recentBelt || '/assets/medals/beltDefault.png';

  return (
    <UserAvatarWrapper
      onClick={(e) => {
        if (!disableClick && username) {
          push(`/${username}/ranks?returnTo=${window.location.href}`);
          e.stopPropagation();
        }
      }}
      ref={ref}
      avatarDimension={avatarDimension}>
      <Avatar
        avatarDimension={avatarDimension}
        src={avatar || DefaultAvatar}
        alt={username}
      />
      <Belt
        avatarDimension={avatarDimension}
        beltHeight={beltHeight}
        src={belt || '/assets/medals/beltDefault.png'}
        alt={username}
      />
    </UserAvatarWrapper>
  );
};

export default UserAvatar;
