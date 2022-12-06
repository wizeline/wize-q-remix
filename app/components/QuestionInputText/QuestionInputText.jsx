import React from 'react';
import PropTypes from 'prop-types';
import { draftToMarkdown } from 'markdown-draft-js';
import { convertToRaw, EditorState } from 'draft-js';
import * as Styled from './QuestionInputText.Styled';
import QuestionTextArea from '../QuestionTextArea';

function QuestionInputText(props) {
  const {
    inputValue,
    onInputChange,
    editorState,
    setEditorState,
    submitElement,
  } = props;

  const onQuestionChange = (_editorState) => {
    const rawText = draftToMarkdown(convertToRaw(_editorState.getCurrentContent()));

    const sanitizedInputValue = rawText.replace(/^\s+/, '');
    onInputChange(sanitizedInputValue);
  };

  const renderInputArea = () => (
    <QuestionTextArea
      inputValue={inputValue}
      editorState={editorState}
      setEditorState={setEditorState}
      onQuestionChange={onQuestionChange}
    />
  );

  return (
    <Styled.QuestionInputText>
      {renderInputArea()}
      {submitElement}
    </Styled.QuestionInputText>
  );
}

QuestionInputText.propTypes = {
  inputValue: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  editorState: PropTypes.objectOf(EditorState).isRequired,
  setEditorState: PropTypes.func.isRequired,
  submitElement: PropTypes.element,
};

QuestionInputText.defaultProps = {
  inputValue: '',
  submitElement: null,
};

export default QuestionInputText;
