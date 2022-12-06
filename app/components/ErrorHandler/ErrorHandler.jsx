import React from 'react';
import { VscBracketError } from 'react-icons/vsc';
import PropTypes from 'prop-types';

function ErrorHandler({ error }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '200px' }}>
        <VscBracketError size="15rem" color="var(--color-primary)" />
        <h1 style={{ paddingTop: '40px' }}>Sorry! Something Went Wrong.</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
        <pre>{error.message}</pre>
      </div>
    </div>
  );
}
ErrorHandler.propTypes = {
  error: PropTypes.shape().isRequired,
};

export default ErrorHandler;
