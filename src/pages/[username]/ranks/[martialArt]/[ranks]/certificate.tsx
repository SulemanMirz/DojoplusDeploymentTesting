import React from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { BASE_URL } from '../../../../../../services/config';
import http from '../../../../../../services/http';
import {
  GoogleManagerNoScript,
  GoogleManagerScript,
} from '../../../../../shared/components/SchoolScripts';
import { Section } from '../../../../../shared/components/layout/Section';
import { MainProfile } from '../../../../../shared/components/layout/Main';
import CaptureCertificate from '../../../../../modules/ranks-certificate/CaptureCertificate';
import { RankType } from '../../../../../shared/models/Rank.model';

type CertificateComponentProps = {
  data?: RankType;
  featureRankData?: RankType;
};

const Certificate: React.FC<CertificateComponentProps> = ({
  data,
  featureRankData,
}) => {
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
        <title>Certificate</title>
      </Head>
      <Section>
        <GoogleManagerNoScript />
        <MainProfile>
          <CaptureCertificate
            rankData={data?.[0]}
            featureRankData={featureRankData}
          />
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
    const martialArtRank = await http.get(`${baseUrl}Rank/get-feature-ranks`, {
      params: {
        username: data?.[0]?.masterFromAllProfiles?.[0],
      },
    });

    if (data.length === 0) {
      return {
        props: {
          notFound: true,
          data: [],
          featureRankData: [],
        },
      };
    }
    return {
      props: {
        notFound: false,
        data,
        featureRankData: martialArtRank?.data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
        featureRankData: null,
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
  paths: [],
  fallback: 'blocking',
});

export default Certificate;
