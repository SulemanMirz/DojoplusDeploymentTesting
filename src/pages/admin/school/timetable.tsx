import Head from 'next/head';
import * as React from 'react';
import { NextPage } from 'next';

import { Section } from '../../../shared/components/layout/Section';
import { MainSchool } from '../../../shared/components/layout/Main';
import { Container } from '../../../shared/components/layout/Container';
import { Schedule } from '../../../shared/models/school.model';
import BottomNavAdmin from '../../../modules/bottom-nav/BottomNavAdmin';
import AdminSideTimeTable from '../../../modules/admin-profile/AdminSideTimeTable';

type SchedulesViewProps = {
  data?: {
    scheduleSchool: Schedule[];
    zoneTime: string | undefined;
  };
};

const TimeTable: NextPage<SchedulesViewProps> = () => {
  return (
    <>
      <Head>
        <title>TimeTable · DOJO+</title>
      </Head>
      <Section>
        <MainSchool>
          <Container isFlexGrow isFluid>
            <AdminSideTimeTable />
          </Container>
        </MainSchool>
      </Section>
      <BottomNavAdmin />
    </>
  );
};

export default TimeTable;
