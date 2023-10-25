import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Section } from '../../shared/components/layout/Section';
import { MainSchool } from '../../shared/components/layout/Main';
import { Container } from '../../shared/components/layout/Container';
import { ConfirmationStatus } from '../../modules/confirmatiom-status/ConfirmationStatus';
import { ProfileTabLoading } from '../../shared/components/TabLoading';

const Rejection: NextPage = () => {
  const { query } = useRouter();
  const recordId = query?.recordId;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (recordId) {
      setLoading(true);
      axios
        .delete('/api/Rank', {
          params: {
            id: recordId,
          },
        })
        .then((res) => {
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    }
  }, [recordId]);

  const { t } = useTranslation();
  const RankRejected = t('RankRejected');

  if (loading) {
    return <ProfileTabLoading />;
  }

  return (
    <Section>
      <MainSchool>
        <Container isFlexGrow>
          <ConfirmationStatus title="" message={RankRejected} success />
        </Container>
      </MainSchool>
    </Section>
  );
};

export default Rejection;
