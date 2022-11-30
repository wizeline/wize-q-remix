import PropTypes from 'prop-types';
import * as Styled from './Label.Styled';

const Label = ({text, type, approvedBy}) => {
  return (
    <Styled.LabelContainer>
      <Styled.Label type={type} text={text}>
        {text}
      </Styled.Label>
      {approvedBy && <Styled.ApproverName>by <strong>{approvedBy}</strong></Styled.ApproverName>}
    </Styled.LabelContainer>
  )
}

Label.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  approvedBy: PropTypes.string,
};

Label.defaultProps = {
  approvedBy: null,
}

export default Label;