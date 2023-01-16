import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './Input.Styled';

const Input = React.forwardRef((props, ref) => {
  const {
    id, type, classContainer, classInput, inputLeftElement,
    inputRightElement, classLeftElement,
    classRightElement, rows, ...inputParams
  } = props;
  return (
    <Styled.InputContainer id={id} className={classContainer}>
      {inputLeftElement && (
      <Styled.InputLeftElement className={classLeftElement}>
        {inputLeftElement}
      </Styled.InputLeftElement>
      )}
      {type !== 'text-area' && <Styled.InputElement ref={ref} className={classInput} {...inputParams} />}
      {type === 'text-area' && <Styled.TextAreaElement ref={ref} className={classInput} rows={rows} {...inputParams} />}
      {inputRightElement && (
      <Styled.InputRightElement className={classRightElement}>
        {inputRightElement}
      </Styled.InputRightElement>
      )}
    </Styled.InputContainer>
  );
});

Input.displayName = 'Input';

export default Input;

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  inputParams: {}.isRequired,
  classContainer: PropTypes.string,
  classInput: PropTypes.string,
  inputLeftElement: PropTypes.element,
  inputRightElement: PropTypes.element,
  classLeftElement: PropTypes.element,
  classRightElement: PropTypes.element,
  rows: PropTypes.number,
};

Input.defaultProps = {
  classContainer: '',
  classInput: '',
  type: 'text',
  inputLeftElement: null,
  inputRightElement: null,
  classLeftElement: '',
  classRightElement: '',
  rows: 1,
};
