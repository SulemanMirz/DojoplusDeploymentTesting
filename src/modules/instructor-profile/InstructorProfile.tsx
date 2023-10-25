import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import TodayIcon from '@mui/icons-material/Today';
import { useTranslation } from 'react-i18next';

import { InstructorProfileTabs } from './components/InstructorProfileTabs';
import { ProfileAvatar } from '../../shared/components/ProfileAvatar';
import { ProfileUsername } from '../../shared/components/ProfileUsername';
import { UserInformation } from '../user-information/UserInformation';

import { Achievements } from '../achievements/Achievements';

import { Ranks } from '../ranks/Ranks';
import { Container, ProfileButtons } from '../../shared/components/Profile';
import { Videos } from '../videos/Videos';
import { Seminars } from '../seminars';
import { News } from '../news';
import { ProfileSocialMedia } from '../profile/components/ProfileSocialMedia';
import { buttonStyles } from '../../shared/styles/Button-style';
import { PrivateClasses, User } from '../../shared/models/user.model';
import { IRank } from '../../shared/models/Rank.model';
import { orderRanks } from '../../shared/utils/ranks-utils';
import { ClaimProfileBadge } from '../../shared/components/ClaimProfileBadge';
import Follow from './components/follow';
import { useFireBaseAuth } from '../../context/FirebaseContext';
import FollowButtons from './components/FollowButtons';
import MessageButton from './components/MessageButton';

const TabPanelItem = styled(TabPanel)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.backgroundLightGray.main,
  padding: theme.spacing(1, 0),
  overflowX: 'hidden',
}));

type UserProfileProps = {
  initialData: { profile: User };
  ranks: IRank[];
  privateClassesList: PrivateClasses[];
  followers: string[];
  following: string[];
  followed: boolean;
  followNow: number;
  isLoading: boolean;
  handleFollow: () => void;
  checkIns: number;
};

export const InstructorProfile: React.FC<UserProfileProps> = ({
  initialData,
  ranks,
  privateClassesList,
  followers,
  following,
  followed,
  followNow,
  isLoading,
  handleFollow,
  checkIns,
}) => {
  const { t, i18n } = useTranslation('common');
  const textRank = t('ranks')?.toLowerCase();
  const textAchievements = t('achievements')?.toLowerCase();
  const textProfile = t('profile')?.toLowerCase();
  const textVideos = t('videos')?.toLowerCase();
  const textSeminars = t('seminars')?.toLowerCase();
  const textNews = t('news')?.toLowerCase();

  const { query, push } = useRouter();

  const { profile } = initialData;
  const tab = query?.slug?.[1] || '';

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
  }, [i18n.isInitialized, query, push, textRank, tab, username]);

  const instagram = profile.instagram || null;
  const nickName = profile?.nickname ? `"${profile?.nickname}"` : '';
  const name = `${profile?.firstName || ''} ${nickName} ${
    profile?.lastName || ''
  }`;
  const featureRank = ranks.find((rank) => rank.featuredRank)
    ?.rankImageW375H24FromMartialArtsRanks[0].url;
  const recentBelt = ranks[0]
    ? orderRanks(ranks)[0].rankImageW375H24FromMartialArtsRanks?.[0].url
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
        {privateClassesList?.length > 0 && (
          <Button
            sx={buttonStyles}
            variant="contained"
            onClick={() => push(`/${profile?.username}/private-class`)}
            startIcon={<TodayIcon />}
          >
            {t('BookMe')}
          </Button>
        )}
        {!isAuthUser && !loading && (
          <FollowButtons
            followed={followed}
            isLoading={isLoading}
            handleFollow={handleFollow}
          />
        )}

        {instagram && <ProfileSocialMedia instagramSRC={profile?.instagram} />}
        {authUser && authUser?.userInfo?.username !== username && (
          <MessageButton authUser={authUser} profile={profile} />
        )}
      </ProfileButtons>
      <TabContext value={tab}>
        <InstructorProfileTabs username={profile?.username} nickname={name} />
        <TabPanelItem value={textRank} style={{ paddingBottom: 115 }}>
          <Ranks username={profile?.username} profile={profile} />
          <ClaimProfileBadge />
        </TabPanelItem>
        <TabPanelItem value={textAchievements}>
          <Achievements username={profile?.username} />
        </TabPanelItem>
        <TabPanelItem value={textProfile}>
          <UserInformation initialData={{ ...initialData }} />
        </TabPanelItem>
        <TabPanelItem value={textVideos}>
          <Videos
            username={profile?.username}
            youtube={profile.youTube}
            profile={profile}
          />
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
