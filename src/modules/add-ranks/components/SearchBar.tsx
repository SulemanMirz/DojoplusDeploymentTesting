import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';
import { TextWhite12Uppercase600 } from '../../Settings/components/settings.styled';

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  position: absolute;
  height: 54px;
  left: 12px;
  top: 23px;
`;

const SearchField = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;
  width: 100%;
  height: 40px;
  background: #fcfcfc;
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

const SearchBar: React.FC<{
  fetch?: (searchQuery: string) => void;
  dontDebounceOnFirst?: boolean;
  style?: React.CSSProperties;
}> = ({ fetch, dontDebounceOnFirst = false, style }) => {
  const [searchText, setSearchText] = useState('');
  const [firstDebounce, setFirstDebounce] = useState(dontDebounceOnFirst);

  const { t } = useTranslation();
  const Search = t('Search');
  const Cancel = t('Cancel');

  const debouncedSearch = useRef(
    debounce((value) => {
      fetch(value);
    }, 1000),
  ).current;

  useEffect(() => {
    if (firstDebounce) {
      setFirstDebounce(false);
      return;
    }
    debouncedSearch(searchText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <SearchBarContainer {...(style && { style: { ...style } })}>
      <SearchField>
        <SearchIcon src="/assets/icons/search-black.svg" />
        <SearchInput
          value={searchText}
          type="text"
          placeholder={`${Search}...`}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </SearchField>
      <CancelButton>
        <TextWhite12Uppercase600
          onClick={() => setSearchText('')}
          style={{ cursor: 'pointer' }}
        >
          {Cancel}
        </TextWhite12Uppercase600>
      </CancelButton>
    </SearchBarContainer>
  );
};

export default SearchBar;
