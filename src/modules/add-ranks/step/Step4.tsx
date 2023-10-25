import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Section } from '../../../shared/components/layout/Section';
import { Header } from '../../../shared/components/layout/header/Header';
import { MainProfile } from '../../../shared/components/layout/Main';
import { Container } from '../../../shared/components/layout/Container';
import { StepContainer } from '../components/StepContainer';
import SearchBar from '../components/SearchBar';
import StudentCard from '../../check-ins/components/SudentsCard';
import { TextWhite18UppercaseRegular } from '../../../shared/components/texts';

const FixedContainer = styled.div`
  width: 100%;
  background-color: #282828;
  position: fixed;
  top: 100px;
  left: 0px;
  z-index: 9;
  height: 88px;
`;

const Divider = styled.div`
  height: 0.5px;
  width: 95%;
  background: #404040;
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardWrapper = styled.div<{ selected }>`
  width: 95%;
  background-color: ${({ selected }) => (selected ? '#3b3b3b' : 'transparent')};
`;

const Step4: React.FC<{
  selectedSchool?;
  selectedInstructor;
  setSelectedInstructor: (instructor) => void;
  style?: React.CSSProperties;
  searchBarContainerStyle?: React.CSSProperties;
}> = ({
  selectedSchool,
  selectedInstructor,
  setSelectedInstructor,
  style,
  searchBarContainerStyle,
}) => {
  const instructor = selectedSchool?.displayNameFromInstructor?.map(
    (el, idx) => {
      const nickName = selectedSchool?.nicknameFromInstructor?.[idx]
        ? `"${selectedSchool?.nicknameFromInstructor?.[idx]}"`
        : '';
      const displayName = `${
        selectedSchool?.firstNameFromInstructor?.[idx] || ''
      } ${nickName} ${selectedSchool?.lastNameFromInstructor?.[idx] || ''}`;
      return {
        username: el,
        displayName,
      };
    },
  );

  const [instructors, setInstructors] = useState(instructor);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const NoInstructors = t('NoInstructors');

  const getAllInstructors: (searchQuery?: string) => void = (searchQuery) => {
    if (!searchQuery && instructor?.length) {
      setInstructors(instructor);
      return;
    }
    setLoading(true);
    axios('/api/Rank', {
      params: {
        instructors: true,
        searchQuery,
      },
    })
      .then((res) => {
        setLoading(false);
        setInstructors(res.data);
      })
      .catch((err) => {
        console.log(err, 'err');
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!instructor?.length) {
      getAllInstructors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StepContainer style={{ padding: '0px' }}>
      <>
        <Section style={{ width: '100%', backgroundColor: '#282828' }}>
          <Header style={{ backgroundColor: '#282828' }}>
            <FixedContainer style={{ ...searchBarContainerStyle }}>
              <SearchBar
                fetch={(txt) => getAllInstructors(txt)}
                dontDebounceOnFirst
              />
            </FixedContainer>
          </Header>
          <MainProfile>
            <Container
              style={{
                padding: '0px 16px 36px',
                maxHeight: 'calc(100vh - 295px)',
                overflowX: 'scroll',
                marginTop: '190px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                ...style,
              }}
              notGutters
              isFlexGrow>
              {loading && (
                <LoadingWrapper>
                  <CircularProgress
                    style={{ margin: '0px 0px 20px' }}
                    size={20}
                  />
                </LoadingWrapper>
              )}
              {!instructors?.length && !loading ? (
                <LoadingWrapper>
                  <TextWhite18UppercaseRegular>
                    {NoInstructors}
                  </TextWhite18UppercaseRegular>
                </LoadingWrapper>
              ) : (
                <>
                  <Divider />
                  {instructors?.map((el, idx) => {
                    return (
                      <CardWrapper
                        selected={el?.username === selectedInstructor?.username}
                        role="button"
                        onClick={() => setSelectedInstructor(el)}
                        key={el.username}
                        tabIndex={idx}>
                        <StudentCard
                          disableClick
                          username={el.username}
                          name={el.displayName}
                        />
                      </CardWrapper>
                    );
                  })}
                </>
              )}
            </Container>
          </MainProfile>
        </Section>
      </>
    </StepContainer>
  );
};

export default Step4;
