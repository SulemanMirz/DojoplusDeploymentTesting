import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';

import axios from 'axios';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Section } from '../../shared/components/layout/Section';
import { MainSchool } from '../../shared/components/layout/Main';
import { Container } from '../../shared/components/layout/Container';
import { ConfirmationStatus } from '../../modules/confirmatiom-status/ConfirmationStatus';
import { LoadingWrapper } from '../../modules/school-list/SchoolList';

const Confirmation: NextPage = () => {
  const { query } = useRouter();
  const verified = query?.status === 'success';

  const { t } = useTranslation();
  const RankApproved = t('RankApproved');
  const SomethingWentWrong = t('SomethingWentWrong');

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && verified) {
      setLoading(true);
      axios
        .put('/api/Rank', {
          recordId: query?.recordId,
          verified,
        })
        .then(() => {
          setLoading(false);
        })
        .catch((e) => {
          setSuccess(false);
          setLoading(false);
          console.log(e);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verified]);

  if (!success) {
    return (
      <ConfirmationStatus
        title=""
        message={SomethingWentWrong}
        success={false}
      />
    );
  }

  return (
    <Section>
      <MainSchool>
        <Container isFlexGrow>
          {loading ? (
            <LoadingWrapper>
              <CircularProgress size={20} />
            </LoadingWrapper>
          ) : (
            <>
              <ConfirmationStatus title="" message={RankApproved} success={success} />
            </>
          )}
        </Container>
      </MainSchool>
    </Section>
  );
};

export default Confirmation;
