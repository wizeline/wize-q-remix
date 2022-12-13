import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './MarkdownFormattingNote.Styled';

function MarkdownFormattingNote({ visible }) {
  return (
    <Styled.Note visible={visible}>
      <b>**bold**</b>
      <i>_italics_</i>
      ~~strike~~
      <code>`code`</code>
      <code>```preformatted```</code>
      <span>&gt;quote</span>
    </Styled.Note>
  );
}

MarkdownFormattingNote.defaultProps = {
  visible: false,
};

MarkdownFormattingNote.propTypes = {
  visible: PropTypes.bool,
};

export default MarkdownFormattingNote;
