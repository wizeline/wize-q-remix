import { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import CommentTextArea from './CommentTextArea';
import QuestionMarkdown from '~/components/QuestionMarkdown';
import Button from '~/components/Atoms/Button';
import {
  TEXTAREA_LINE_HEIGHT_IN_PX,
  TEXT_BUTTON,
  COMMENT_INPUT_PLACEHOLDER,
  MIN_COMMENT_PREVIEW_LENGTH,
} from '~/utils/constants';
import * as Styled from './CommentInput.styled';

const CommentInputText = forwardRef(function CommentInputText (props, ref) {
  CommentInputText.propTypes = {
    inputValue: PropTypes.string.isRequired,
  };

  CommentInputText.defaultProps = {
    lineHeightPx: TEXTAREA_LINE_HEIGHT_IN_PX,
    isShowPreview: false,
    placeholder: COMMENT_INPUT_PLACEHOLDER,
    inputValue: '',
    commentLength: 0,
  };

  const initialState = {
    inputValue: props.inputValue,
    commentLength: props.inputValue ? props.inputValue.trim().length : 0,
    textAreaRows: 2,
    placeholder: COMMENT_INPUT_PLACEHOLDER,
  };

  const [commentInput, setCommentInput] = useState(initialState);

  useEffect(() => {
    setCommentInput({
      ...commentInput,
      inputValue: props.inputValue,
      commentLength: props.inputValue ? props.inputValue.trim().length : 0,
    });
  }, [props.inputValue]);

  useImperativeHandle(ref, () => ({
    resetInputText() {
      setCommentInput({
        ...commentInput,
        inputValue: '',
        commentLength: 0,
      });
    },
  }));

  const onCommentChange = (event) => {
    const rawText = event.target.value;
    const commentLength = rawText.trim().length;
    const inputValue = rawText.replace(/^\s+/, '');

    setCommentInput({
      inputValue,
      commentLength,
      textAreaRows: 2,
      placeholder: COMMENT_INPUT_PLACEHOLDER,
    });

    props.onInputChange(inputValue);
  };

  const handlePreviewChange = () => {
    setCommentInput({
      ...commentInput,
      isShowPreview: !commentInput.isShowPreview,
    });
  };

  const renderPreviewButton = () => {
    if (commentInput.commentLength > MIN_COMMENT_PREVIEW_LENGTH) {
      return (
        <Styled.QuestionInputTextPreview>
          <Button
            type="button"
            category={TEXT_BUTTON}
            onClick={handlePreviewChange}
            className="preview-button"
          >
            {commentInput.isShowPreview ? 'Hide preview' : 'Show preview'}
          </Button>
        </Styled.QuestionInputTextPreview>
      );
    }
    return null;
  };

  const renderCommentPreview = inputValue =>
    <Styled.QuestionInputTextPreviewDiv className="col-md-12">
      <QuestionMarkdown source={inputValue} />
    </Styled.QuestionInputTextPreviewDiv>;


  const renderInputArea = () => {
    if (commentInput.isShowPreview && commentInput.commentLength > MIN_COMMENT_PREVIEW_LENGTH) {
      return renderCommentPreview(commentInput.inputValue);
    }
    return (
      <CommentTextArea
        inputValue={commentInput.inputValue}
        onCommentChange={onCommentChange}
        textAreaRows={commentInput.textAreaRows}
        commentLength={commentInput.commentLength}
      />
    );
  };

  return (
    <Styled.CommentInputText>
      {renderInputArea(commentInput)}
      {renderPreviewButton(commentInput)}
    </Styled.CommentInputText>
  );
});

export default CommentInputText;
