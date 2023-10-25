import React, { useCallback } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import ContainerMUI from '@mui/material/Container';
import ButtonMUI from '@mui/material/Button';

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const Spacer = styled.div`
  padding-top: 60px;
`;

const FixedContainer = styled.div`
  width: 100%;
  background-color: #111111;
  position: fixed;
  top: 0;
  z-index: 10;
  box-shadow: 0px 3px 0px rgba(24, 24, 24, 0.35);
`;

const Wrapper = styled(ContainerMUI)`
  padding: 8px 0;
  display: flex !important;
  align-items: center !important;
  height: 60px;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 16px;
  cursor: pointer;
`;

const Button = styled(ButtonMUI)`
  margin-left: auto !important;
`;

const Item = styled.h1`
  font-size: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0 15px 0 0;
  cursor: pointer;
  text-decoration: 'none';
`;

type SchoolHeaderProps = {
  schoolName: string;
  shcoolLogo: string;
};

export const SchoolHeader: React.FC<SchoolHeaderProps> = ({
  schoolName,
  shcoolLogo,
}) => {
  const { push, query } = useRouter();
  const schoolId = typeof query?.schoolId === 'string' ? query.schoolId : '';

  const onClick = useCallback(
    () => {
      push(`/school/${schoolId}/trial`, null, {
        shallow: true,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [schoolId],
  );

  const { t } = useTranslation();
  const tryForFree = t('tryForFree');

  return (
    <>
      <Spacer />
      <Container>
        <FixedContainer>
          <Wrapper maxWidth="md">
            <Link href={`/school/${encodeURIComponent(schoolId)}`}>
              <Image src={shcoolLogo} alt="school logo" />
            </Link>
            <Link href={`/school/${encodeURIComponent(schoolId)}`}>
              <Item>{schoolName}</Item>
            </Link>
            <Button variant="contained" onClick={onClick}>
              {tryForFree}
            </Button>
          </Wrapper>
        </FixedContainer>
      </Container>
    </>
  );
};
