import PropTypes from 'prop-types';
import * as S from './Switch.Styled';

const Switch = ({ checked, onChange, id}) => (
  <S.Switch htmlFor={id ?? 'react-switch-new'}>
    <input type="checkbox" checked={checked} onChange={onChange} id={id ?? 'react-switch-new'} />
    <S.Slider id={`${id}-slider` ?? 'react-switch-new-slider'}/>
  </S.Switch>
);

export default Switch;

Switch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
