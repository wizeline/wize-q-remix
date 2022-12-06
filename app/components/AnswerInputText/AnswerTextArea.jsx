import React from 'react';
import PropTypes from 'prop-types';
import MarkdownFormattingNote from '../MarkdownFormattingNote/MarkdownFormattingNote';
import { shouldShowMarkdownSuggestions } from '../../utils/input';
import {
  MAXIMUM_ANSWER_LENGTH,
  MINIMUM_ANSWER_LENGTH,
  MINIMUM_INPUT_LENGTH_TO_SHOW_MARKDOWN,
  MINIMUM_WIDTH_TO_SHOW_MARKDOWN,
  inputPlaceholder,
} from '../../utils/constants';
import Input from '../Atoms/Input/Input';
import InputCounter from '../InputCounter/InputCounter';
import * as Styled from './AnswerInputText.Styled';

function AnswerTextArea(props) {
  return (
    <Styled.CommentInputTextArea>
      <Input
        type="text-area"
        rows={props.textAreaRows}
        maxLength={MAXIMUM_ANSWER_LENGTH}
        placeholder={inputPlaceholder(MINIMUM_ANSWER_LENGTH)}
        value={props.inputValue}
        onChange={props.onAnswerChange}
        form="question-submit-form"
        ref={props.inputRef}
        inputRightElement={
          <InputCounter currentLength={props.answerLength} maxLength={MAXIMUM_ANSWER_LENGTH} />
        }
      />
      <Styled.CommentInputOptions>
        <MarkdownFormattingNote
          visible={
            shouldShowMarkdownSuggestions(
              props.answerLength,
              MINIMUM_INPUT_LENGTH_TO_SHOW_MARKDOWN,
              window.innerWidth,
              MINIMUM_WIDTH_TO_SHOW_MARKDOWN,
            )
          }
        />
      </Styled.CommentInputOptions>
    </Styled.CommentInputTextArea>
  );
}

AnswerTextArea.propTypes = {
  inputValue: PropTypes.string.isRequired,
  onAnswerChange: PropTypes.func.isRequired,
  answerLength: PropTypes.number,
  textAreaRows: PropTypes.number,
  inputRef: PropTypes.func,
};

AnswerTextArea.defaultProps = {
  answerLength: 0,
  textAreaRows: 1,
  inputRef: () => {},
};

export default AnswerTextArea;
