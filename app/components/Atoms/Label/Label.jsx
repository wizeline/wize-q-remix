import PropTypes from 'prop-types';
import * as Styled from './Label.Styled';

const Label = ({text, type}) => {
  return (
    <Styled.Label type={type} text={text}>
      {text}
    </Styled.Label>
  )
}

Label.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default Label;