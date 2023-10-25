import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import { Section } from '../../../shared/components/layout/Section';
import { MainProfile } from '../../../shared/components/layout/Main';

import http from '../../../../services/http';
import { PrivateClasses, User } from '../../../shared/models/user.model';
import { SchoolSchedules } from '../../../shared/models/school.model';
import {
  GoogleManagerNoScript,
  GoogleManagerScript,
} from '../../../shared/components/SchoolScripts';
import { AddRank } from '../../../modules/add-ranks/AddRank';

type AddRanksViewProps = {
  data:
    | {
        classesList: PrivateClasses[];
        schoolsList: SchoolSchedules[];
        profile: User;
      }
    | null
    | undefined;
};
const AddRanksView: NextPage<AddRanksViewProps> = ({ data }): JSX.Element => {
  const { t } = useTranslation();
  const AddRankText = t('AddRank');

  return (
    <>
      <Head>
        <GoogleManagerScript />
        <title>{AddRankText}</title>
      </Head>
      <Section>
        <GoogleManagerNoScript />
        <MainProfile>{data && <AddRank data={data} />}</MainProfile>
      </Section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<AddRanksViewProps> = async (
  context,
) => {
  const username = context.query?.username;
  if (typeof username === 'string') {
    try {
      const baseUrl = `${
        process.env.NODE_ENV === 'development' ? 'http' : 'https'
      }://${context.req.headers.host}/api/`;
      const response = await http.get(`${baseUrl}Rank`, {
        params: {
          params: 'MartialArts',
        },
      });

      return {
        props: {
          data: response.data,
        },
      };
    } catch (error) {
      return {
        props: {
          data: null,
        },
      };
    }
  }
  return {
    props: {
      data: null,
    },
  };
};

export default AddRanksView;
