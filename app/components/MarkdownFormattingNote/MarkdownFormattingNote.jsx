import PropTypes from 'prop-types';
import * as Styled from '~/components/MarkdownFormattingNote/MarkdownFormattingNote.styled';

const MarkdownFormattingNote = ({ visible }) => (
  <Styled.Note visible={visible} >
    <b>**bold**</b>
    <i>_italics_</i>
    ~~strike~~
    <code>`code`</code>
    <code>```preformatted```</code>
    <span>&gt;quote</span>
  </Styled.Note >
);

MarkdownFormattingNote.defaultProps = {
  visible: false,
};

MarkdownFormattingNote.propTypes = {
  visible: PropTypes.bool,
};


export default MarkdownFormattingNote;