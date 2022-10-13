/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo } from 'react';
import useClickOutside from '~/utils/hooks/useClickOutside';
import { ICON_BUTTON } from '~/utils/constants';
import * as Styled from './SearchBarNav.Styled';
import Button from '~/components/Atoms/Button';
import SearchBarDropdown from '~/components/SearchBarDropdown';
import { useFetcher } from '@remix-run/react';
import { debounce } from 'lodash';
import { useCallback } from 'react';

const SearchBarNav = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { state: showDropdown, setState: setShowDropdown, wrapperRef } = useClickOutside();
  const [found, setFound] = useState([]);

  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data && fetcher.data.searchResults !== undefined) {
      setFound(fetcher.data.searchResults);
      return;
    }

  }, [fetcher.data]);

  useEffect(() => {
    return () => {
      debouncedSearchChangedHnadler.cancel();
    }
  }, []);

  const searchUpdated = (e) => {
    if (!e) return;
    console.log("Fetching: ", e.target.value)
    fetcher.load(`/?search=${e.target.value}`);
    setSearchTerm(e.target.value);
  };

  const debouncedSearchChangedHnadler = useMemo((e) => debounce(searchUpdated(e), 300), [searchUpdated]);


  const handleClick = () => {
    setSearchTerm('');
  };

  return (
    <Styled.SearchField ref={wrapperRef}>
      <Styled.IconWrapper>
        <Styled.SearchIcon />
      </Styled.IconWrapper>
      <Styled.Input
        type="search"
        value={searchTerm}
        onChange={debouncedSearchChangedHnadler}
        onFocus={() => setShowDropdown(true)}
        placeholder="Search for…"
      />
      {searchTerm && (
        <Button
          type="button"
          className="clear-button"
          title="Clear"
          category={ICON_BUTTON}
          onClick={handleClick}
        >
          <Styled.ClearIcon />
        </Button>
      )}
      {showDropdown && (
        <SearchBarDropdown searchTerm={searchTerm} questions={found} />
      )}
    </Styled.SearchField>
  );
};

export default SearchBarNav;
