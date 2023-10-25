import React from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Head from 'next/head';
import { useFireBaseAuth } from '../../context/FirebaseContext';

import { Section } from '../../shared/components/layout/Section';
import { MainProfile } from '../../shared/components/layout/Main';
import { Container } from '../../shared/components/layout/Container';
import BottomNavBar from '../bottom-nav/BottomNav';
import { FollowList } from './components/FollowList';
import { FollowListTabs } from './components/FollowTabs';
import HeaderDojo from '../headers/HeaderDojo';

const Icon = styled('img')('');

const TabPanelItem = styled(TabPanel)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.backgroundLightGray.main,
  padding: theme.spacing(1, 0),
  overflowX: 'hidden',
  height: '100vh',
}));

type FollowListingProps = {
  title: string;
};

export const FollowListing: React.FC<FollowListingProps> = ({ title }) => {
  const { query, back } = useRouter();

  const username = query?.slug?.[0] || '';
  const tab = query?.slug?.[1] || '';

  const { authUser } = useFireBaseAuth();

  return (
    <>
      <Head>
        <title>{tab}</title>
      </Head>
      <Section>
        <HeaderDojo
          title={title}
          IconLeft={<Icon src="/assets/icons/back-arrow.svg" />}
          onIconLeftCLick={() => back()}
        />
        <MainProfile>
          <Container
            style={{ paddingBottom: authUser ? 65 : undefined }}
            notGutters
            isFlexGrow>
            <TabContext value={tab}>
              <FollowListTabs username={username} nickname="" />
              <TabPanelItem
                value="followers"
                style={{ paddingBottom: authUser ? 51 : undefined }}>
                <FollowList tab={tab} usernameProfile={username} />
              </TabPanelItem>
              <TabPanelItem
                value="following"
                style={{ paddingBottom: authUser ? 51 : undefined }}>
                <FollowList tab={tab} usernameProfile={username} />
              </TabPanelItem>
              <TabPanelItem
                value="mutual"
                style={{ paddingBottom: authUser ? 51 : undefined }}>
                <FollowList tab={tab} usernameProfile={username} />
              </TabPanelItem>
            </TabContext>
            {authUser && <BottomNavBar />}
          </Container>
        </MainProfile>
      </Section>
    </>
  );
};
