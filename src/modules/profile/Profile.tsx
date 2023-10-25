import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';

import { useTranslation } from 'react-i18next';

import { ProfileAvatar } from '../../shared/components/ProfileAvatar';
import { ProfileSocialMedia } from './components/ProfileSocialMedia';
import { ProfileTabs } from './components/ProfileTabs';
import { ProfileUsername } from '../../shared/components/ProfileUsername';

import { UserInformation } from '../user-information/UserInformation';
import { Achievements } from '../achievements/Achievements';
import { Groups } from '../groups/Groups';
import { Ranks } from '../ranks/Ranks';
import { Container, ProfileButtons } from '../../shared/components/Profile';
import { User } from '../../shared/models/user.model';
import { IRank } from '../../shared/models/Rank.model';
import { orderRanks } from '../../shared/utils/ranks-utils';
import { ClaimProfileBadge } from '../../shared/components/ClaimProfileBadge';
import { Seminars } from '../seminars';
import { News } from '../news';
import { useFireBaseAuth } from '../../context/FirebaseContext';
import FollowButtons from '../instructor-profile/components/FollowButtons';
import Follow from '../instructor-profile/components/follow';
import MessageButton from '../instructor-profile/components/MessageButton';

export const TabPanelItem = styled(TabPanel)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.backgroundLightGray.main,
  padding: theme.spacing(1, 0),
  overflowX: 'hidden',
}));

type UserProfileProps = {
  initialData: { profile: User };
  ranks: IRank[];
  followers: string[];
  following: string[];
  followed: boolean;
  isLoading: boolean;
  followNow: number;
  handleFollow: () => void;
  checkIns: number;
};

export const Profile: React.FC<UserProfileProps> = ({
  initialData,
  ranks,
  followers,
  following,
  followed,
  isLoading,
  followNow,
  handleFollow,
  checkIns,
}) => {
  const { query, push } = useRouter();
  const { t, i18n } = useTranslation('common');
  const textRank = t('ranks')?.toLowerCase();
  const textAchievements = t('achievements')?.toLowerCase();
  const textProfile = t('profile')?.toLowerCase();
  const textSchool = t('School')?.toLowerCase();
  const textSeminars = t('seminars')?.toLowerCase();
  const textNews = t('news')?.toLowerCase();

  const { profile } = initialData;
  const tab = query?.slug?.[1] || '';
  const nickName = profile?.nickname ? `"${profile?.nickname}"` : '';
  const name = `${profile?.firstName || ''} ${nickName} ${
    profile?.lastName || ''
  }`;
  const username = query.slug[0];

  const { authUser, loading } = useFireBaseAuth();
  const isAuthUser = authUser?.userInfo?.username === username;

  useEffect(() => {
    if (!i18n.isInitialized) {
      return;
    }
    if (!tab) {
      push(`/${username}/${textRank}`, null, {
        shallow: true,
      });
    }
  }, [i18n.isInitialized, profile, query, push, textRank, tab, username]);

  const featureRank = ranks.find((rank) => rank.featuredRank)
    ?.rankImageW375H24FromMartialArtsRanks[0].url;
  const recentBelt = ranks[0]
    ? orderRanks(ranks)[0].rankImageW375H24FromMartialArtsRanks[0].url
    : '';

  return (
    <Container>
      <ProfileAvatar
        src={profile?.photo ? profile?.photo[0]?.url : ''}
        beltSrc={featureRank || recentBelt}
      />
      <ProfileUsername value={name} />
      <Follow
        followers={followers}
        following={following}
        currentFollow={followNow}
        checkIns={checkIns}
        username={username}
      />
      <ProfileButtons>
        {!isAuthUser && !loading && (
          <FollowButtons
            followed={followed}
            isLoading={isLoading}
            handleFollow={handleFollow}
          />
        )}
        {profile?.instagram && (
          <ProfileSocialMedia instagramSRC={profile?.instagram} />
        )}
        {authUser && authUser?.userInfo?.username !== username && (
          <MessageButton authUser={authUser} profile={profile} />
        )}
      </ProfileButtons>
      <TabContext value={tab}>
        <ProfileTabs
          nickname={name}
          username={profile?.username}
          data={initialData}
        />
        <TabPanelItem value={textRank} style={{ paddingBottom: 115 }}>
          <Ranks username={profile?.username} profile={profile} />
          <ClaimProfileBadge />
        </TabPanelItem>
        <TabPanelItem value={textAchievements}>
          <Achievements username={profile?.username} />
        </TabPanelItem>
        <TabPanelItem value={textSchool}>
          <Groups profileId={profile?.id} />
        </TabPanelItem>
        <TabPanelItem value={textProfile}>
          <UserInformation initialData={{ ...initialData }} />
        </TabPanelItem>
        <TabPanelItem value={textSeminars}>
          <Seminars username={profile?.username} />
        </TabPanelItem>
        <TabPanelItem value={textNews}>
          <News username={profile?.username} />
        </TabPanelItem>
      </TabContext>
    </Container>
  );
};
