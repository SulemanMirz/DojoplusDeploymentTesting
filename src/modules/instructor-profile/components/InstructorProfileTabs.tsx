import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import { StyledTab, StyledTabs } from '../../../shared/components/StyledTabs';
import { Title } from '../../../shared/components/Title';

type ProfileTabsProps = {
  username: string;
  nickname: string;
};

export const InstructorProfileTabs: React.FC<ProfileTabsProps> = ({
  username,
  nickname,
}) => {
  const { push, query } = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const slug = query?.slug;
  const tab = slug?.[1] || '';

  const handleChange = useCallback(
    (_, newValue) => {
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
  const textVideos = t('videos');
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
        <StyledTab label={textProfile} value={textProfile.toLowerCase()} />
        <StyledTab label={textVideos} value={textVideos.toLowerCase()} />
        <StyledTab label={textSeminars} value={textSeminars} />
        <StyledTab label={textNews} value={textNews} />
      </StyledTabs>
    </>
  );
};
