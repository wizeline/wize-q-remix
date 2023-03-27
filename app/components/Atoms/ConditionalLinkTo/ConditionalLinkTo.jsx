import React from 'react';
import { Link } from '@remix-run/react';
import PropTypes from 'prop-types';

function ConditionalLinkTo({
  children, to, condition, className,
}) {
  if (condition) {
    return <Link style={{ textDecoration: 'none', color: 'black' }} to={to} className={className}>{children}</Link>;
  }
  return <div>{children}</div>;
}

ConditionalLinkTo.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  condition: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

ConditionalLinkTo.defaultProps = {
  className: '',
};

export default ConditionalLinkTo;
