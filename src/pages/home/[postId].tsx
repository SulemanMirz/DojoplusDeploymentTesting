import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import CommentSectionHome from '../../modules/home-page/CommentSectionHome';
import {
  GoogleManagerNoScript,
  GoogleManagerScript,
} from '../../shared/components/SchoolScripts';
import { Section } from '../../shared/components/layout/Section';
import { MainSchool } from '../../shared/components/layout/Main';
import { Container } from '../../shared/components/layout/Container';
import { useFireBaseAuth } from '../../context/FirebaseContext';

const CommentSection: React.FC = () => {
  const { query } = useRouter();
  const { authUser } = useFireBaseAuth();
  return (
    <>
      <Head>
        <GoogleManagerScript />
        <title>Home · DOJO+</title>
      </Head>
      <Section>
        <GoogleManagerNoScript />
        <MainSchool>
          <Container
            style={{ marginTop: '98px', marginBottom: '98px' }}
            isFlexGrow
            isFluid>
            {query?.postId && authUser && <CommentSectionHome />}
          </Container>
        </MainSchool>
      </Section>
    </>
  );
};

export default CommentSection;
