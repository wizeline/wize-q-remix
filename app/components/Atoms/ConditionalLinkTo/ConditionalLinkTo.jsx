import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ConditionalLinkTo({ children, to, condition }) {
  if (condition) {
    return <Link style={{ textDecoration: 'none' }} to={to}>{children}</Link>;
  }
  return <div>{children}</div>;
}

ConditionalLinkTo.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  condition: PropTypes.bool.isRequired,
};

export default ConditionalLinkTo;
