import React from 'react';
import PropTypes from 'prop-types';
import MarkdownFormattingNote from '../MarkdownFormattingNote';
import {
  MAXIMUM_ANSWER_LENGTH,
  MINIMUM_INPUT_LENGTH_TO_SHOW_MARKDOWN,
  MINIMUM_WIDTH_TO_SHOW_MARKDOWN,
  MIN_TEXTAREA_ROWS,
  MINIMUN_WINDOW_WIDTH,
} from '../../utils/constants';
import { shouldShowMarkdownSuggestions } from '../../utils/input';
import Input from '../Atoms/Input';
import InputCounter from '../InputCounter';
import * as Styled from './CommentInput.styled';

function CommentTextArea({
  inputValue,
  onCommentChange,
  placeholder,
  textAreaRows,
  commentLength,
}) {
  CommentTextArea.propTypes = {
    inputValue: PropTypes.string,
    onCommentChange: PropTypes.func.isRequired,
    commentLength: PropTypes.number.isRequired,
    textAreaRows: PropTypes.number,
    placeholder: PropTypes.string.isRequired,
  };

  CommentTextArea.defaultProps = {
    inputValue: '',
    textAreaRows: MIN_TEXTAREA_ROWS,
  };

  return (
    <Styled.CommentInputTextArea>
      <Input
        type="text-area"
        rows={textAreaRows}
        maxLength={MAXIMUM_ANSWER_LENGTH}
        value={inputValue}
        placeholder={placeholder}
        onChange={onCommentChange}
        form="question-submit-form"
        inputRightElement={
          <InputCounter currentLength={commentLength} maxLength={MAXIMUM_ANSWER_LENGTH} />
        }
      />
      <Styled.CommentInputOptions>
        <MarkdownFormattingNote
          visible={
            shouldShowMarkdownSuggestions(
              commentLength,
              MINIMUM_INPUT_LENGTH_TO_SHOW_MARKDOWN,
              MINIMUN_WINDOW_WIDTH,
              MINIMUM_WIDTH_TO_SHOW_MARKDOWN,
            )
          }
        />
      </Styled.CommentInputOptions>
    </Styled.CommentInputTextArea>
  );
}

export default CommentTextArea;
