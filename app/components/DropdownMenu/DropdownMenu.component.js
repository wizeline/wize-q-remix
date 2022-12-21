import React, { useEffect, useState } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import DropdownTitle from 'app/components/DropdownTitle';
import { FaBuilding, FaUser } from 'react-icons/fa';
import { ImLocation } from 'react-icons/im';
import PropTypes from 'prop-types';
import { StyledMenu } from './DropdownMenu.Styled';

function DropdownMenu({
  name, handler, type, selectedOption, options,
}) {
  const [option, setSelectedOption] = useState(selectedOption);

  useEffect(() => {
    setSelectedOption(selectedOption);
  }, [options]);

  const handleSelect = (select) => {
    setSelectedOption(select);
    handler(select);
  };

  const renderOptions = () => {
    let values = [];

    switch (type) {
      case 'Build': values = options.map((dep) => (
        <MenuItem eventKey={dep} key={dep.department_id} onClick={() => handleSelect(dep)}>
          {dep.name}
        </MenuItem>
      )); break;
      case 'People': values = options.map((item) => (
        <MenuItem eventKey={item} key={item.id} onClick={() => handleSelect(item)}>
          {item.name}
        </MenuItem>
      )); break;
      case 'Location': values = options.map((loc) => (
        <MenuItem eventKey={loc.code} key={loc.code} onClick={() => handleSelect(loc)}>
          {loc.name}
        </MenuItem>
      )); break;
      default: return values;
    }

    return values;
  };

  const getIcon = () => {
    switch (type) {
      case 'Build': return <FaBuilding color={option ? 'white' : 'black'} />;
      case 'People': return <FaUser color={option ? 'white' : 'black'} />;
      case 'Location': return <ImLocation color={option ? 'white' : 'black'} />;
      default: return null;
    }
  };

  return (
    <StyledMenu item={option}>
      <DropdownButton
        bsStyle="default"
        title={(
          <DropdownTitle title={option ? option.name : name}>
            {getIcon()}
          </DropdownTitle>
        )}
        noCaret
      >
        {options.length === 0 ? (
          <MenuItem>
            Not options avaiable
          </MenuItem>
        ) : renderOptions()}
      </DropdownButton>
    </StyledMenu>
  );
}

DropdownMenu.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  selectedOption: PropTypes.oneOfType(
    PropTypes.shape([
      {
        department_id: PropTypes.string,
        name: PropTypes.string,
      },
    ]),
    PropTypes.shape([
      {
        id: PropTypes.string,
        name: PropTypes.string,
      },
    ]),
  ).isRequired,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape([
        {
          department_id: PropTypes.string,
          name: PropTypes.string,
        },
      ]).isRequired,
    ),
    PropTypes.arrayOf(
      PropTypes.shape([
        {
          id: PropTypes.string,
          name: PropTypes.string,
        },
      ]).isRequired,
    ),
    PropTypes.arrayOf(
      PropTypes.shape([
        {
          code: PropTypes.string,
          name: PropTypes.string,
        },
      ]),
    ),
  ]).isRequired,
  handler: PropTypes.func.isRequired,
};

export default DropdownMenu;
