import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { ClientOnly } from 'remix-utils';
import { Editor } from 'app/react-draft-wysiwyg.client';
import bold from 'app/images/react-icons/ri/bold.svg';
import italic from 'app/images/react-icons/ri/italic.svg';
import strikethrough from 'app/images/react-icons/ri/strikethrough.svg';
import code from 'app/images/react-icons/ri/code-fill.svg';
import * as S from 'app/components/QuestionTextArea/QuestionTextArea.Styled';
import { inputPlaceholder } from 'app/utils/constants';
import { MINIMUM_QUESTION_LENGTH } from 'app/utils/backend/constants';

function QuestionTextArea({
  editorState,
  setEditorState,
  onQuestionChange,
}) {
  useEffect(() => {
    onQuestionChange(editorState);
  }, [editorState]);

  const styleMap = {
    CODE: {
      color: '#c7254e',
      backgroundColor: '#f9f2f4',
      borderRadius: '4px',
      fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
      padding: '2px 4px',
      fontSize: '90%',
    },
  };

  return (
    <S.QuestionTextAreaWrapper>
      <ClientOnly>
        { () => (
          <Editor
            placeholder={inputPlaceholder(MINIMUM_QUESTION_LENGTH)}
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="demo-wrapper"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            toolbar={{
              options: ['inline', 'blockType'],
              inline: {
                inDropdown: false,
                options: ['bold', 'italic', 'strikethrough', 'monospace'],
                bold: { icon: bold },
                italic: { icon: italic },
                strikethrough: { icon: strikethrough },
                monospace: { icon: code },
              },
              blockType: {
                inDropdown: false,
                options: ['Blockquote'],
              },
            }}
            customStyleMap={styleMap}
          />
        )}
      </ClientOnly>
    </S.QuestionTextAreaWrapper>

  );
}

QuestionTextArea.propTypes = {
  editorState: PropTypes.objectOf(EditorState).isRequired,
  setEditorState: PropTypes.func.isRequired,
  onQuestionChange: PropTypes.func.isRequired,
};

export default QuestionTextArea;
