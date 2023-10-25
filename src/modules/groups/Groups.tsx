import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSubscription } from '@cobuildlab/react-simple-state';

import { ProfileTabLoading } from '../../shared/components/TabLoading';
import { GroupCard } from './components/GroupCard';
import { ProfileTabEmptyMessage } from '../../shared/components/ProfileTabEmptyMessage';

import { GetProfileGroupsQuery as GetProfileGroupsQueryType } from '../../shared/types/generated';
import { GroupsStore } from './groups-store';
// import { getProfileGroups } from './groups-actions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

type GroupsProps = {
  profileId: string;
};

export const Groups: React.FC<GroupsProps> = ({ profileId }) => {
  const [data, setData] = useState<GetProfileGroupsQueryType>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // getProfileGroups(profileId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useSubscription(GroupsStore, (state) => {
    setData(state);
    setLoading(false);
  });

  if (isLoading) {
    return <ProfileTabLoading />;
  }

  if (!data || data?.schoolsList?.items?.length === 0) {
    return <ProfileTabEmptyMessage value="There is no groups to show" />;
  }

  return (
    <Container>
      {data.schoolsList.items?.map((school) => (
        <GroupCard key={school.id} group={school} />
      ))}
    </Container>
  );
};
