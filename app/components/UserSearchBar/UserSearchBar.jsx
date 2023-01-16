import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as Styled from 'app/components/UserSearchBar/UserSearchBar.Styled';
import { ICON_BUTTON } from 'app/utils/constants';
import Button from 'app/components/Atoms/Button';

export default function UserSearchBar({ onSearch }) {
  const [search, setSearch] = useState('');

  const clearText = () => {
    setSearch('');
  };

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (search && event.key === 'Enter') {
      onSearch(search);
    }
  };

  return (
    <Styled.SearchField>
      <Styled.IconWrapper>
        <Styled.SearchIcon />
      </Styled.IconWrapper>
      <Styled.Input
        type="search"
        value={search}
        onChange={onChange}
        placeholder="Search for…"
        onKeyDown={handleKeyDown}
      />
      {search && (
        <Button
          type="button"
          className="clear-button"
          title="Clear"
          category={ICON_BUTTON}
          onClick={clearText}
        >
          <Styled.ClearIcon />
        </Button>
      )}
    </Styled.SearchField>
  );
}

// Props types
UserSearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
