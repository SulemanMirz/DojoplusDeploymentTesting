import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ProfileTabLoading } from '../../shared/components/TabLoading';
import { ProfileTabEmptyMessage } from '../../shared/components/ProfileTabEmptyMessage';
import { SeminarData } from '../../shared/models/Seminar.model';
import { SeminarCard } from './components/SeminarCard';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
  @media screen and (max-width: 600px) {
    justify-content: center;
  }
`;

interface SeminarViewProps {
  username: string;
}
export const Seminars: React.FC<SeminarViewProps> = ({ username }) => {
  const [isLoading, setLoading] = useState(true);
  const [seminars, setSeminars] = useState<SeminarData[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    axios('/api/Seminars', {
      params: {
        username,
      },
    }).then((res) => {
      setSeminars(res.data.seminars);
      setLoading(false);
    });
  }, [username]);

  if (isLoading) {
    return <ProfileTabLoading />;
  }

  if (!seminars || seminars.length === 0) {
    return <ProfileTabEmptyMessage value="There is no seminars to show" />;
  }

  return (
    <Container>
      {seminars &&
        seminars.map((data) => {
          return <SeminarCard data={data} />;
        })}
    </Container>
  );
};
