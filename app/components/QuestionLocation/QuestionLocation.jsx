import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { ImLocation } from 'react-icons/im';
import PropTypes from 'prop-types';
import * as Styled from './QuestionLocation.Styled';
import DropdownTitle from '../DropdownTitle';

function QuestionLocation({
  location,
  locations,
  onSelectLocation,
}) {
  const mapLocations = (_locations) => {
    const output = _locations.map((loc) => (
      <MenuItem eventKey={loc.code} key={loc.code}>{loc.name}</MenuItem>
    ));
    return output;
  };

  return (
    <Styled.QuestionLocationWrapper>
      <DropdownButton
        bsStyle="default"
        noCaret
        title={(
          <DropdownTitle title={location} type="Location">
            <ImLocation color={location ? 'white' : 'black'} />
          </DropdownTitle>
        )}
        className="question-input-dropdown"
        id="locations-dropdown"
        onSelect={onSelectLocation}
        disabled={!locations.length}
      >
        {mapLocations(locations)}
      </DropdownButton>
    </Styled.QuestionLocationWrapper>
  );
}

QuestionLocation.propTypes = {
  onSelectLocation: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,

  locations: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default QuestionLocation;
