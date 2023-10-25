import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Section } from '../../../shared/components/layout/Section';
import { Header } from '../../../shared/components/layout/header/Header';
import { MainProfile } from '../../../shared/components/layout/Main';
import { TextWhite12Uppercase600 } from '../../Settings/components/settings.styled';
import HomeSchoolListCard from './HomeSchoolListCard';
import { useFireBaseAuth } from '../../../context/FirebaseContext';
import UserCard from './UserCard';

const FixedContainer = styled.div`
  width: 100%;
  background-color: #111111;
  position: fixed;
  top: 0px;
  z-index: 10;
  height: 98px;
  box-shadow: 0px 3px 0px rgba(24, 24, 24, 0.35);
`;

const Container = styled.div`
  margin-top: 35px;
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

const NoContent = styled.div`
  color: #282828 !important;
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

export const HomeSearchModal: React.FC<{
  handleModal: () => void;
}> = ({ handleModal }) => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const { t } = useTranslation();
  const Search = t('Search');
  const Cancel = t('Cancel');

  const [search, setSearch] = useState([]);
  const { authUser } = useFireBaseAuth();

  const fetchSchools: (
    searchQuery: string,
    nearest?: boolean,
    lat?: number,
    long?: number,
  ) => void = (searchQuery) => {
    setLoading(true);

    axios('/api/Search', {
      params: {
        searchText: searchQuery,
      },
    })
      .then((res) => {
        setSearch(
          [...res.data].filter((user) => user.email !== authUser?.email),
        );
        setLoading(false);
        setQuery(searchQuery);
      })
      .catch((err) => {
        console.log('Could not fetch Users', err);
        setLoading(true);
      });
  };

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
    <Section
      style={{
        width: '100%',
        backgroundColor: '#FCFCFC',
        overflowY: 'scroll',
      }}
    >
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
        {query ? (
          <>
            {search.length === 0 ? (
              <NoContent>No Recent Searches</NoContent>
            ) : (
              <>
                <Container>
                  {loading ? (
                    <LoadingWrapper>
                      <CircularProgress
                        style={{ position: 'absolute', top: 110 }}
                        size={20}
                      />
                    </LoadingWrapper>
                  ) : (
                    search?.map((el) => (
                      <>
                        {el?.schoolName ? (
                          <>
                            <HomeSchoolListCard
                              key={el.id}
                              data={el}
                              handleModal={handleModal}
                            />
                          </>
                        ) : (
                          <UserCard
                            key={el.id}
                            data={el}
                            handleModal={handleModal}
                          />
                        )}
                      </>
                    ))
                  )}
                </Container>
              </>
            )}
          </>
        ) : (
          <NoContent>No Recent Searches</NoContent>
        )}
      </MainProfile>
    </Section>
  );
};
