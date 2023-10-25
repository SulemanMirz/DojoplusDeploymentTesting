import Head from 'next/head';
import React from 'react';
import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import { GoogleManagerScript } from '../../shared/components/SchoolScripts';
import { Section } from '../../shared/components/layout/Section';
import { MainSchool } from '../../shared/components/layout/Main';
import { Container } from '../../shared/components/layout/Container';

import ResetPassword from '../../modules/reset-password';
import Custom404 from '../404';
import ConfirmPassword from '../../modules/confirm-password';

const ActionsPage: NextPage = () => {
  const { t } = useTranslation();
  const ResetPasswordText = t('resetPassword');

  const { query } = useRouter();

  const modes = ['resetPassword', 'confirmPassword'];

  return (
    <>
      <Head>
        <GoogleManagerScript />
        <title>{`${ResetPasswordText} · DOJO+`}</title>
      </Head>
      <Section>
        <MainSchool>
          <Container isFlexGrow>
            {query.mode === 'resetPassword' && <ResetPassword />}
            {query.mode === 'confirmPassword' && <ConfirmPassword />}
            {query.mode && !modes.includes(query.mode as string) && (
              <Custom404 />
            )}
          </Container>
        </MainSchool>
      </Section>
    </>
  );
};

export default ActionsPage;
