/* eslint-disable react/no-children-prop */
import React from 'react';
import PropTypes from 'prop-types';
import gfm from 'remark-gfm';
import * as Styled from 'app/components/QuestionMarkdown/QuestionMarkdown.Styled';
import MarkdownLinkRenderer from 'app/components/MarkdownLinkRenderer';

function QuestionMarkdown(props) {
  return (
    <Styled.QuestionMarkdown
      children={props.source}
      components={{
        link: MarkdownLinkRenderer,
      }}
      remarkPlugins={[gfm]}
    />
  );
}

QuestionMarkdown.propTypes = {
  source: PropTypes.string.isRequired,
};

export default QuestionMarkdown;
