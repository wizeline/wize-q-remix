import React, { useEffect, useState, useCallback } from 'react';
import { useFetcher, useNavigate } from '@remix-run/react';
import { debounce } from 'lodash';
import useClickOutside from '../../utils/hooks/useClickOutside';
import { ICON_BUTTON } from '../../utils/constants';
import * as Styled from './SearchBarNav.Styled';
import Button from '../Atoms/Button';
import SearchBarDropdown from '../SearchBarDropdown';

function SearchBarNav() {
  const [searchTerm, setSearchTerm] = useState('');
  const { state: showDropdown, setState: setShowDropdown, wrapperRef } = useClickOutside();
  const [found, setFound] = useState([]);
  const navigate = useNavigate();

  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data && fetcher.data.searchResults !== undefined) {
      setFound(fetcher.data.searchResults);
    }
  }, [fetcher.data]);

  const sendQuery = (value) => {
    fetcher.load(`/?search=${value}`);
  };

  const delayedQuery = useCallback(debounce((value) => sendQuery(value), 400), []);

  const onChange = (e) => {
    setSearchTerm(e.target.value);
    delayedQuery(e.target.value);
  };

  const onClear = () => {
    setSearchTerm('');
  };

  const onQuestionClick = (questionId) => {
    onClear();
    setShowDropdown(false);
    navigate(`/questions/${questionId}`);
  };

  return (
    <Styled.SearchField ref={wrapperRef}>
      <Styled.IconWrapper>
        <Styled.SearchIcon />
      </Styled.IconWrapper>
      <Styled.Input
        type="search"
        value={searchTerm}
        onChange={onChange}
        onFocus={() => setShowDropdown(true)}
        placeholder="Search for…"
      />
      {searchTerm && (
        <Button
          type="button"
          className="clear-button"
          title="Clear"
          category={ICON_BUTTON}
          onClick={onClear}
        >
          <Styled.ClearIcon />
        </Button>
      )}
      {showDropdown && (
        <SearchBarDropdown
          searchTerm={searchTerm}
          questions={found}
          onQuestionClick={onQuestionClick}
        />
      )}
    </Styled.SearchField>
  );
}

export default SearchBarNav;
