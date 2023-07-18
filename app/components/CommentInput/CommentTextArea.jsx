import React from 'react';
import PropTypes from 'prop-types';
import MarkdownFormattingNote from 'app/components/MarkdownFormattingNote';
import {
  MAXIMUM_ANSWER_LENGTH,
  MINIMUM_INPUT_LENGTH_TO_SHOW_MARKDOWN,
  MINIMUM_WIDTH_TO_SHOW_MARKDOWN,
  MIN_TEXTAREA_ROWS,
  MINIMUN_WINDOW_WIDTH,
} from 'app/utils/constants';
import { shouldShowMarkdownSuggestions } from 'app/utils/strings/input';
import Input from 'app/components/Atoms/Input';
import InputCounter from 'app/components/InputCounter';
import * as Styled from 'app/components/CommentInput/CommentInput.styled';

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
