import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Section } from '../../shared/components/layout/Section';
import { MainSchool } from '../../shared/components/layout/Main';
import { Container } from '../../shared/components/layout/Container';
import ChatScreen from '../../modules/inbox/ChatScreen';
import { useFireBaseAuth } from '../../context/FirebaseContext';

const ChatPage: NextPage = () => {
  const { query } = useRouter();
  const { id } = query;
  const { authUser } = useFireBaseAuth();
  return (
    <>
      <Head>
        <title>Chat · DOJO+</title>
      </Head>
      <Section>
        <MainSchool>
          <Container isFlexGrow isFluid>
            {id && authUser && <ChatScreen authUser={authUser} />}
          </Container>
        </MainSchool>
      </Section>
    </>
  );
};

export default ChatPage;
