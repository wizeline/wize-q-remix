/* eslint-disable react/no-this-in-sfc */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AnswerTextArea from './AnswerTextArea';
import QuestionMarkdown from '../QuestionMarkdown/QuestionMarkdown';
import Button from '../Atoms/Button/Button';
import * as Styled from './AnswerInputText.Styled';
import {
  MINIMUM_ANSWER_LENGTH,
  MIN_TEXTAREA_ROWS,
  TEXT_BUTTON,
} from '../../utils/constants';

function AnswerInputText(props) {
  AnswerInputText.propTypes = {
    minRows: PropTypes.number,
    inputValue: PropTypes.string,
    answerLength: PropTypes.number,
    onInputChange: PropTypes.func.isRequired,
  };

  AnswerInputText.defaultProps = {
    minRows: MIN_TEXTAREA_ROWS,
    inputValue: '',
    answerLength: 0,
  };

  const initialAnswerState = {
    inputValue: props.inputValue,
    answerLength: props.answerLength,
    textAreaRows: props.minRows,
  };

  const [answerState, setAnswerState] = useState(initialAnswerState);

  const onAnswerChange = (event) => {
    const rawText = event.target.value;
    const answerLength = rawText.trim().length;
    const inputValue = rawText.replace(/^\s+/, '');

    setAnswerState({
      inputValue,
      answerLength,
      textAreaRows: answerLength > 0 ? answerLength : props.minRows,
    });
    props.onInputChange(inputValue);
  };

  const setTextInputRef = (element) => {
    this.textInput = element;
  };

  const handlePreviewChange = () => {
    setAnswerState({ ...answerState, isShowPreview: !answerState.isShowPreview });
  };

  const renderPreviewButton = (
    {
      answerLength,
      isShowPreview,
    },
  ) => answerLength > MINIMUM_ANSWER_LENGTH
  && (
  <div>
    <Button
      type="button"
      category={TEXT_BUTTON}
      className="preview-button"
      onClick={handlePreviewChange}
    >
      {isShowPreview ? 'Edit answer' : 'Show preview'}
    </Button>
  </div>
  );
  const renderAnswerPreview = (inputValue) => (
    <div className="col-md-12">
      <QuestionMarkdown source={inputValue} />
    </div>
  );

  const renderInputArea = () => {
    const { inputValue, answerLength, isShowPreview } = answerState;
    if (isShowPreview && answerLength > MINIMUM_ANSWER_LENGTH) {
      return renderAnswerPreview(inputValue);
    }
    return (
      <AnswerTextArea
        inputValue={inputValue}
        onAnswerChange={onAnswerChange}
        setTextInputRef={setTextInputRef}
        textAreaRows={answerState.minRows}
        answerLength={answerLength}
      />
    );
  };

  return (
    <Styled.CommentInputText>
      {renderPreviewButton(answerState)}
      {renderInputArea(answerState)}
    </Styled.CommentInputText>
  );
}

export default AnswerInputText;
