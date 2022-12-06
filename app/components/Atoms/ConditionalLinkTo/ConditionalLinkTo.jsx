import React from 'react';
import { Link } from '@remix-run/react';
import PropTypes from 'prop-types';

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
