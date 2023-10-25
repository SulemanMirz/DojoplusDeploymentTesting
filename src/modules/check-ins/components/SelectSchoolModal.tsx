import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Section } from '../../../shared/components/layout/Section';
import { Header } from '../../../shared/components/layout/header/Header';
import { MainProfile } from '../../../shared/components/layout/Main';
import { Container } from '../../../shared/components/layout/Container';
import { TextWhite12Uppercase600 } from '../../Settings/components/settings.styled';
import SchoolListCard from './SchoolListCard';

const FixedContainer = styled.div`
  width: 100%;
  background-color: #111111;
  position: fixed;
  top: 0px;
  z-index: 10;
  height: 98px;
  box-shadow: 0px 3px 0px rgba(24, 24, 24, 0.35);
`;

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  position: absolute;
  height: 54px;
  left: 12px;
  top: 44px;
`;

const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;
  width: 100%;
  height: 40px;
  background: #fff;
  border-radius: 4px;
`;

const CancelButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px;
  gap: 8px;
  margin-right: 12px;
  width: 74px;
  height: 40px;
`;

const SearchIcon = styled.img`
  height: 16px;
  width: 16px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 24px;
  font-family: 'Saira';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #282828;
  border: none !important;
  &:focus {
    outline: none;
    box-shadow: none;
    border: none !important;
  }
  &::-webkit-input-placeholder {
    font-family: 'Saira';
    font-weight: 200;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SelectSchoolModal: React.FC<{
  handleModal: () => void;
  setSelectedSchool: (school: any) => void;
}> = ({ handleModal, setSelectedSchool }) => {
  const [loading, setLoading] = useState(false);
  const [schools, setSchools] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const { t } = useTranslation();
  const Search = t('Search');
  const Cancel = t('Cancel');

  const fetchSchools: (
    searchQuery: string,
    nearest?: boolean,
    lat?: number,
    long?: number,
  ) => void = (searchQuery, nearest = false, lat, long) => {
    setLoading(true);
    if ((nearest || userLocation) && !searchQuery) {
      axios('/api/Schools', {
        params: {
          lat: lat || userLocation?.lat,
          long: long || userLocation?.long,
        },
      })
        .then((res) => {
          setSchools(res.data);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
      return;
    }
    axios('/api/CheckIn', {
      params: { searchQuery },
    })
      .then((res) => {
        setSchools(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const showPosition: (position: any) => void = (position) => {
    setUserLocation({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
    fetchSchools('', true, position.coords.latitude, position.coords.longitude);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      return;
    }
    fetchSchools('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debouncedSearch = useRef(
    debounce((value) => {
      fetchSchools(value);
    }, 1000),
  ).current;

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <Section style={{ width: '100%', backgroundColor: '#282828' }}>
      <Header style={{ backgroundColor: '#282828' }}>
        <FixedContainer>
          <SearchBarContainer>
            <SearchBar>
              <SearchIcon src="/assets/icons/search-black.svg" />
              <SearchInput
                type="text"
                placeholder={`${Search}...`}
                onChange={(e) => debouncedSearch(e.target.value)}
              />
            </SearchBar>
            <CancelButton onClick={handleModal}>
              <TextWhite12Uppercase600 style={{ cursor: 'pointer' }}>
                {Cancel}
              </TextWhite12Uppercase600>
            </CancelButton>
          </SearchBarContainer>
        </FixedContainer>
      </Header>
      <MainProfile>
        <Container
          style={{ padding: '110px 16px 36px', background: '#FCFCFC' }}
          notGutters
          isFlexGrow>
          {loading ? (
            <LoadingWrapper>
              <CircularProgress
                style={{ position: 'absolute', top: 110 }}
                size={20}
              />
            </LoadingWrapper>
          ) : (
            schools?.map((el) => (
              <SchoolListCard
                key={el.id}
                data={el}
                onSelect={setSelectedSchool}
                handleModal={handleModal}
              />
            ))
          )}
        </Container>
      </MainProfile>
    </Section>
  );
};
