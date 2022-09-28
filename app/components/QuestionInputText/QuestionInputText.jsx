import PropTypes from 'prop-types';
import { draftToMarkdown } from 'markdown-draft-js';
import { convertToRaw, EditorState } from 'draft-js';

import {
  MIN_TEXTAREA_ROWS,
  LINE_HEIGHT_IN_PX,
} from '~/utils/constants';
import * as Styled from './QuestionInputText.Styled';
import QuestionTextArea from '~/components/QuestionTextArea';

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
  inputValue: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  editorState: PropTypes.objectOf(EditorState).isRequired,
  setEditorState: PropTypes.func.isRequired,
  submitElement: PropTypes.element,
};

QuestionInputText.defaultProps = {
  inputValue: '',
  minRows: MIN_TEXTAREA_ROWS,
  lineHeightPx: LINE_HEIGHT_IN_PX,
  questionLength: 0,
  submitElement: null,
};

export default QuestionInputText;
