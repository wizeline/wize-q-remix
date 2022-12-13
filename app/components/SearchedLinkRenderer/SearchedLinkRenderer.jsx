import React from 'react';
import PropTypes from 'prop-types';
import { HIGHLIGHT_END, HIGHLIGHT_START } from 'app/utils/constants';
import MarkdownLinkRenderer from 'app/components/MarkdownLinkRenderer';

const propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function SearchedLinkRenderer({ href, children }) {
  let cleanedUrl = href.replace(new RegExp(HIGHLIGHT_START, 'g'), '');
  cleanedUrl = cleanedUrl.replace(new RegExp(HIGHLIGHT_END, 'g'), '');
  return (
    <MarkdownLinkRenderer href={cleanedUrl}>
      {children}
    </MarkdownLinkRenderer>
  );
}

SearchedLinkRenderer.propTypes = propTypes;

export default SearchedLinkRenderer;
