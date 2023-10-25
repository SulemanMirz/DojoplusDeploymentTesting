import React, { useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import { StyledTab, StyledTabs } from '../../../shared/components/StyledTabs';
import { Title } from '../../../shared/components/Title';
import { User } from '../../../shared/models/user.model';
// const Tab = styled(TabMUI)(({ theme }) => ({
//   color: theme.palette.grey['500'],

// }));

type ProfileTabsProps = {
  username: string;
  nickname: string;
  data?: { profile: User };
  // userId: string;
};

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  nickname,
  username,
  data,
}) => {
  const { push, query } = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const hasSchool = data.profile?.profileSchool?.count > 0;
  const slug = query?.slug;
  const tab = slug?.[1] || '';

  const handleChange = useCallback(
    (_, newValue) => {
      console.log(newValue);
      push(
        `/${username}/${newValue}${
          query.returnTo ? `?returnTo=${query.returnTo}` : ''
        }`,
        null,
        {
          shallow: true,
        },
      );
    },
    [push, query.returnTo, username],
  );

  const { t } = useTranslation('common');
  const textRank = t('ranks');
  const textAchievements = t('achievements');
  const textProfile = t('profile');
  const textSchool = t('School');
  const textSeminars = t('seminars')?.toLowerCase();
  const textNews = t('news')?.toLowerCase();
  return (
    <>
      <Title name={nickname} slug={tab} />
      <StyledTabs
        onChange={handleChange}
        variant={matches ? 'fullWidth' : 'scrollable'}
      >
        <StyledTab label={textRank} value={textRank.toLowerCase()} />
        <StyledTab
          label={textAchievements}
          value={textAchievements.toLowerCase()}
        />
        {hasSchool && (
          <StyledTab label={textSchool} value={textSchool.toLowerCase()} />
        )}
        <StyledTab label={textProfile} value={textProfile.toLowerCase()} />
        <StyledTab label={textSeminars} value={textSeminars} />
        <StyledTab label={textNews} value={textNews} />
      </StyledTabs>
    </>
  );
};
