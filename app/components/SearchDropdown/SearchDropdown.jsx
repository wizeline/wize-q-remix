/* eslint-disable dot-notation */
import React from 'react';
import PropTypes from 'prop-types';
import * as S from 'app/components/SearchDropdown/SearchDropdown.styled';

function SearchDropdown({
  data, onChange, showDropdown, onDropdownClick, defaultValue, inputId,
  keyValue,
}) {
  return (
    <div style={{ width: '90%' }}>
      <S.InputSearch
        id={inputId}
        type="search"
        value={defaultValue}
        onChange={onChange}
        placeholder="users"
      />
      { (showDropdown && data) && (
      <S.DropdownSearch>
        {data.map((user) => (
          <div key={user[keyValue]} onClick={() => { onDropdownClick(user); }}>
            {user[keyValue]}
          </div>
        ))}
      </S.DropdownSearch>
      )}
    </div>
  );
}

SearchDropdown.propTypes = {
  inputId: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  onChange: PropTypes.func.isRequired,
  showDropdown: PropTypes.bool.isRequired,
  onDropdownClick: PropTypes.func.isRequired,
  keyValue: PropTypes.string.isRequired,
};

SearchDropdown.defaultProps = {
  defaultValue: undefined,
  data: [],
};

export default SearchDropdown;
