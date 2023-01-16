import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const buildLinkAttributes = (href) => {
  let target = '_blank';
  let rel = 'nofollow noopener noreferrer';

  if (href.startsWith('/')) {
    target = '_self';
    rel = '';
  }

  return { target, rel };
};

function MarkdownLinkRenderer({ href, children }) {
  const { target, rel } = buildLinkAttributes(href);
  return (
    <a href={href} target={target} rel={rel}>
      {children}
    </a>
  );
}

MarkdownLinkRenderer.propTypes = propTypes;

export default MarkdownLinkRenderer;
