import PropTypes from 'prop-types';
import * as Styled from './CustomDropdown.Styled';

function CustomDropdown(props) {
  const { accessValueName, selectedValue } = props;
  const renderElements = elements => elements.map(element => (
    <Styled.CMenuItem eventKey={element} key={element[accessValueName]}>
      <label className="custom-dropdown" htmlFor={element[accessValueName]}>
        {element.name}
        <input
          type="radio"
          className="custom-dropdown--radio"
          checked={selectedValue === element[accessValueName]}
          readOnly
          id={element[accessValueName]}
        />
        <span className="custom-dropdown--span" />
      </label>
    </Styled.CMenuItem>
  ));

  const renderSelected = () =>
    props.showSelected && (
      <p className="custom-dropdown-selected">{props.text}</p>
    );

  return (
    <Styled.CDropdown
      className={props.dropdownClass}
      onSelect={props.onSelectFunc}
      id={props.dropdownClass}
      disabled={props.disabled}
    >
      <Styled.CDropdown.Toggle
        onClick={props.onClickFunc}
        className={`toggle ${props.isHighlighted ? 'highlighted' : ''}`}
      >
        <p className={`dropdown-text ${props.showSelected ? '' : 'first'}`}>
          {props.label}
        </p>
        {renderSelected()}
      </Styled.CDropdown.Toggle>
      <Styled.CDropdown.Menu className={props.menuClass}>
        {props.elements.length > 0 &&
          renderElements(props.elements)}
      </Styled.CDropdown.Menu>
    </Styled.CDropdown>
  );
}

CustomDropdown.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.any).isRequired,
  text: PropTypes.string,
  label: PropTypes.string.isRequired,
  dropdownClass: PropTypes.string,
  menuClass: PropTypes.string,
  onClickFunc: PropTypes.func,
  onSelectFunc: PropTypes.func,
  selectedValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  isHighlighted: PropTypes.bool,
  showSelected: PropTypes.bool,
  accessValueName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

CustomDropdown.defaultProps = {
  text: '',
  dropdownClass: 'sort-toggle',
  menuClass: 'menu-dropdown',
  onClickFunc: null,
  onSelectFunc: null,
  selectedValue: null,
  isHighlighted: false,
  showSelected: true,
  disabled: false,
};

export default CustomDropdown;