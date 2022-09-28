import PropTypes from 'prop-types';
import * as S from './Switch.Styled';

const Switch = ({ checked, onChange }) => (
  <S.Switch htmlFor={'react-switch-new'}>
    <input type="checkbox" checked={checked} onChange={onChange} id={'react-switch-new'} />
    <S.Slider />
  </S.Switch>
);

export default Switch;

Switch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
