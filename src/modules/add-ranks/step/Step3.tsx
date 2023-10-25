import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Section } from '../../../shared/components/layout/Section';
import { Header } from '../../../shared/components/layout/header/Header';
import { MainProfile } from '../../../shared/components/layout/Main';
import { Container } from '../../../shared/components/layout/Container';
import SchoolListCard from '../../check-ins/components/SchoolListCard';
import { StepContainer } from '../components/StepContainer';
import SearchBar from '../components/SearchBar';
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
  width: 100%;
  background: #404040;
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Step3: React.FC<{
  setSelectedSchool: (school: any) => void;
  selectedSchool: any;
  martialArts: any;
  allSchools: any;
  setAllSchools: (schools: any) => void;
}> = ({
  setSelectedSchool,
  selectedSchool,
  martialArts,
  allSchools,
  setAllSchools,
}) => {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const NoSchools = t('NoSchools');

  const fetchSchools: (searchQuery: string) => void = (searchQuery) => {
    setLoading(true);
    axios('/api/Rank', {
      params: { searchQuery, martialArtsSchool: martialArts },
    })
      .then((res) => {
        setAllSchools(res.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };

  useEffect(() => {
    if (!allSchools) {
      setLoading(true);
      axios('/api/Rank', {
        params: { searchQuery: '', martialArtsSchool: martialArts },
      })
        .then((res) => {
          setAllSchools(res.data);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StepContainer style={{ padding: '0px' }}>
      <>
        <Section style={{ width: '100%', backgroundColor: '#282828' }}>
          <Header style={{ backgroundColor: '#282828' }}>
            <FixedContainer>
              <SearchBar
                fetch={(txt) => fetchSchools(txt)}
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
              }}
              notGutters
              isFlexGrow>
              {loading && (
                <LoadingWrapper>
                  <CircularProgress
                    style={{ position: 'absolute', top: 210 }}
                    size={20}
                  />
                </LoadingWrapper>
              )}
              {!allSchools?.length && !loading ? (
                <LoadingWrapper>
                  <TextWhite18UppercaseRegular>
                    {NoSchools}
                  </TextWhite18UppercaseRegular>
                </LoadingWrapper>
              ) : (
                <>
                  <Divider />
                  {allSchools?.map((el, idx) => {
                    const selectedIndex = allSchools.indexOf(selectedSchool);
                    const selected = selectedIndex === idx;
                    return (
                      <SchoolListCard
                        key={el.id}
                        data={el}
                        onSelect={setSelectedSchool}
                        handleModal={() => {}}
                        backroundColor={selected ? '#3b3b3b' : 'transparent'}
                        schoolNameColor="#fff"
                        dividerColor="#404040"
                      />
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

export default Step3;
