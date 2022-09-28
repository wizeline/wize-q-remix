import PropTypes from 'prop-types';
import InputCounterWrapper from './InputCounter.Styled';

const InputCounter = (props) => {
  const { currentLength, maxLength } = props;
  return (
    <InputCounterWrapper className="input-counter">
      {currentLength}/{maxLength}
    </InputCounterWrapper>
  );
};
export default InputCounter;

InputCounter.propTypes = {
  currentLength: PropTypes.string.isRequired,
  maxLength: PropTypes.string.isRequired,
};
