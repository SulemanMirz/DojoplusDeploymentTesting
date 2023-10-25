import React from 'react';
import styled from 'styled-components';
import AuthGuard from '../auth/AuthGuard';
import { ScheduleNavBar } from '../schedule/components/ScheduleNavBar';
import DayListView from './components/DayListView';

const Container = styled.div``;
const ScheduleSection = styled.div`
  margin-top: 30px;
`;

const ScheduleListContainer = styled.div`
  padding-inline: 16px;
  padding-top: 62px;
`;

const AdminSideTimeTable: React.FC = () => {
  return (
    <AuthGuard>
      <Container>
        <ScheduleSection>
          <ScheduleNavBar style={{ marginTop: '36px' }} />
          <ScheduleListContainer>
            <DayListView />
          </ScheduleListContainer>
        </ScheduleSection>
      </Container>
    </AuthGuard>
  );
};

export default AdminSideTimeTable;
