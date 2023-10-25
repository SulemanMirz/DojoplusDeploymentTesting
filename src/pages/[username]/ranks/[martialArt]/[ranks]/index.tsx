import React, { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import { Section } from '../../../../../shared/components/layout/Section';

import {
  GoogleManagerNoScript,
  GoogleManagerScript,
} from '../../../../../shared/components/SchoolScripts';
import { MainProfile } from '../../../../../shared/components/layout/Main';
import RankCertificate from '../../../../../modules/ranks-certificate';
import { BASE_URL } from '../../../../../../services/config';
import http from '../../../../../../services/http';
import { RankType } from '../../../../../shared/models/Rank.model';

type CertificatePageProps = {
  data: RankType;
};

const CertificatePage: NextPage<CertificatePageProps> = ({ data }) => {
  const { t } = useTranslation();
  const CertificateText = t('Certificate');
  const router = useRouter();
  const [windowsUrl, setWindowsUrl] = useState('');

  useEffect(() => {
    const currentUrl = window.location.origin + router.asPath;
    setWindowsUrl(currentUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Sassy+Frass&display=swap"
          rel="stylesheet"
        />
        <style jsx>{`
          body {
            font-family: 'Sassy Frass', sans-serif;
          }
        `}</style>
        <GoogleManagerScript />
        <meta property="og:title" content="Check out Achievement!" />
        <meta
          property="og:description"
          content="Where Education Ignites Possibilities"
        />
        <meta property="og:url" content={windowsUrl} />
        <meta
          property="og:image"
          content={
            data?.[0].certificatePhoto?.[0]?.url ||
            'https://res.cloudinary.com/de1kz0ucq/image/upload/v1690876722/Dojo_Certificate_cosgxv.png'
          }
        />
        <title>{CertificateText}</title>
      </Head>
      <Section>
        <GoogleManagerNoScript />
        <MainProfile>
          <RankCertificate rankData={data?.[0]} windowsUrl={windowsUrl} />
        </MainProfile>
      </Section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { username, martialArt, ranks } = params;
  try {
    const baseUrl = `${BASE_URL}api/`;
    const { data } = await http.get(`${baseUrl}Rank/certificate-ranks`, {
      params: {
        username,
        martialArt,
        ranks,
      },
    });

    if (data.length === 0) {
      return {
        revalidate: 100,
        props: {
          notFound: true,
          data: [],
        },
      };
    }
    return {
      revalidate: 100,
      props: {
        notFound: false,
        data,
      },
    };
  } catch (error) {
    return {
      revalidate: 100,
      props: {
        data: null,
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
  paths: [],
  fallback: 'blocking',
});

export default CertificatePage;
