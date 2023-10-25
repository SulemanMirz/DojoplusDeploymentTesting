import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import { StyledTab, StyledTabs } from '../../../shared/components/StyledTabs';
import { Title } from '../../../shared/components/Title';
import { useFireBaseAuth } from '../../../context/FirebaseContext';

type FollowListTabsProps = {
  username: string;
  nickname: string;
};

export const FollowListTabs: React.FC<FollowListTabsProps> = ({
  username,
  nickname,
}) => {
  const { push, query } = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const slug = query?.slug;
  const tab = slug?.[1] || '';

  const { authUser } = useFireBaseAuth();
  const authUsername = authUser?.userInfo?.username || '';

  const isAuthUser = username === authUsername;

  const handleChange = useCallback(
    (_, newValue) => {
      push(`/${username}/${newValue}`, null, {
        shallow: true,
      });
    },
    [push, username],
  );
  const { t } = useTranslation('common');
  const MutualText = t('Mutual');
  const FollowersText = t('Followers');
  const FollowingText = t('Following');
  return (
    <>
      <Title name={nickname} slug={tab} />
      <StyledTabs
        sx={{ top: '98px' }}
        onChange={handleChange}
        variant={matches ? 'fullWidth' : 'scrollable'}>
        {!isAuthUser && authUser && (
          <StyledTab label={MutualText.toUpperCase()} value="mutual" />
        )}

        <StyledTab label={FollowersText.toUpperCase()} value="followers" />
        <StyledTab label={FollowingText.toUpperCase()} value="following" />
      </StyledTabs>
    </>
  );
};
