import React, { useEffect } from 'react';

import Head from 'next/head';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import { Section } from '../../../shared/components/layout/Section';
import { MainProfile } from '../../../shared/components/layout/Main';
import { Container } from '../../../shared/components/layout/Container';
import SchoolProfile from '../../../modules/school-profile';
import http from '../../../../services/http';
import {
  Plans,
  PlanSubscriber,
  SchoolRating,
  Schedule,
  School,
} from '../../../shared/models/school.model';
import { BASE_URL } from '../../../../services/config';
import { CheckIns } from '../../../shared/models/CheckIns';
// import { getSchoolSlugs } from '../../../../services/SchoolMoizedService';

type Data = {
  schoolData: School;
  plansData: Plans[];
  scheduleData: { classData: Schedule[]; zoneTime: Date };
  plansMembers: PlanSubscriber[];
  checkInsLeader: CheckIns[];
  reviewData: SchoolRating[];
};

const SchedulesView: NextPage<Data> = ({
  schoolData,
  plansData,
  scheduleData,
  plansMembers,
  checkInsLeader,
  reviewData,
}) => {
  const { query } = useRouter();
  useEffect(() => {
    // This useEffect is just for re-rendering the page if the data updates
  }, [schoolData, plansData, scheduleData]);

  if (!schoolData || !plansData || !scheduleData) {
    return null;
  }
  return (
    <>
      <Head>
        <title>{query.schoolId} · DOJO+</title>
      </Head>
      <Section>
        <MainProfile>
          <Container isFlexGrow isFluid>
            <SchoolProfile
              schoolData={schoolData}
              plansData={plansData}
              scheduleData={scheduleData}
              plansMembers={plansMembers}
              checkInsLeader={checkInsLeader}
              reviewData={reviewData}
            />
          </Container>
        </MainProfile>
      </Section>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

export const getStaticProps: GetStaticProps<Data> = async (context) => {
  const { params } = context;
  const { schoolId, classId } = params;

  if (typeof schoolId || classId === 'string') {
    try {
      const baseUrl = `${BASE_URL}api/`;
      const requests = [];
      let schoolData = [];
      let plansData = [];
      let scheduleData = {};
      let plansMembers = [];
      let checkInsLeader = [];
      let reviewData = [];

      requests.push(
        http.get(`${baseUrl}Schools/get-school`, {
          params: {
            key: 'slug',
            value: schoolId,
          },
        }),
      );

      requests.push(
        http.get(`${baseUrl}Plans`, {
          params: {
            schoolId,
          },
        }),
      );

      requests.push(
        http.get(`${baseUrl}CheckIn`, {
          params: {
            schoolName: schoolId,
            allWeek: true,
          },
        }),
      );
      requests.push(
        http.get(`${baseUrl}Plans/members`, {
          params: {
            slug: schoolId,
          },
        }),
      );
      requests.push(
        http.get(`${baseUrl}CheckIn/count`, {
          params: {
            slug: schoolId,
          },
        }),
      );

      requests.push(
        http.get(`${baseUrl}Schools/reviews`, {
          params: {
            slug: schoolId,
          },
        }),
      );

      await Promise.all(requests).then((res) => {
        schoolData = { ...res[0].data };
        plansData = [...res[1].data];
        scheduleData = { ...res[2].data };
        plansMembers = [...res[3].data];
        checkInsLeader = [...res[4].data];
        reviewData = [...res[5].data];
      });
      return {
        revalidate: 1000,
        props: {
          schoolData,
          plansData,
          scheduleData,
          plansMembers,
          checkInsLeader,
          reviewData,
        },
      };
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      return {
        props: {},
        notFound: true,
        revalidate: 10,
      };
    }
  }
  return {
    props: {},
    notFound: true,
    revalidate: 10,
  };
};

// export const getStaticPaths: GetStaticPaths<{
//   schoolId: string;
//   schoolSlug: string;
//   // eslint-disable-next-line consistent-return
// }> = async () => {
//   try {
//     const schoolSlugs = await getSchoolSlugs();
//     const suffixes = ['info', 'schedules', 'plan', 'reviews'];
//     return {
//       paths: schoolSlugs
//         .map((slug) => {
//           return suffixes.map((suffix) => ({
//             params: {
//               schoolId: slug.slug.toString(),
//               schoolSlug: suffix,
//             },
//           }));
//         })
//         .flat(1),
//       fallback: true,
//     };
//   } catch (error) {
//     console.log('Error::::::::::: ', error);
//     return {
//       paths: [],
//       fallback: true,
//     };
//   }
// };

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => ({
  paths: [],
  fallback: 'blocking',
});

export default SchedulesView;
