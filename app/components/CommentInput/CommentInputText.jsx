import React, {
  useEffect, useState, useImperativeHandle, forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import CommentTextArea from './CommentTextArea';
import QuestionMarkdown from '../QuestionMarkdown';
import Button from '../Atoms/Button';
import {
  TEXT_BUTTON,
  COMMENT_INPUT_PLACEHOLDER,
  MIN_COMMENT_PREVIEW_LENGTH,
} from '../../utils/constants';
import * as Styled from './CommentInput.styled';

const CommentInputText = forwardRef((props, ref) => {
  const initialState = {
    inputValue: props.inputValue,
    commentLength: props.inputValue ? props.inputValue.trim().length : 0,
    textAreaRows: 2,
    placeholder: COMMENT_INPUT_PLACEHOLDER,
  };

  const [commentInput, setCommentInput] = useState(initialState);
  const [canShowPreview, setCanShowPreview] = useState(false);

  useEffect(() => {
    setCommentInput({
      ...commentInput,
      inputValue: props.inputValue,
      commentLength: props.inputValue ? props.inputValue.trim().length : 0,
    });
  }, [props.inputValue]);

  useEffect(() => {
    setCanShowPreview(commentInput.commentLength > MIN_COMMENT_PREVIEW_LENGTH);
  }, [commentInput.commentLength]);

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

  const handlePreviewChange = (type) => {
    setCommentInput({
      ...commentInput,
      isShowPreview: !!((type === 'preview' && canShowPreview)),
    });
  };

  const renderPreviewButton = () => (
    <Styled.QuestionInputTextPreview>
      <Styled.QuestionInputTab
        isNewComment={props.isNewComment}
        selected={!commentInput.isShowPreview}
      >
        <Button
          type="button"
          category={TEXT_BUTTON}
          onClick={() => handlePreviewChange('write')}
          className="preview-button"
        >
          Write
        </Button>
      </Styled.QuestionInputTab>
      <Styled.QuestionInputTab
        isNewComment={props.isNewComment}
        selected={commentInput.isShowPreview}
        disabled={!canShowPreview}
      >
        <Button
          type="button"
          category={TEXT_BUTTON}
          onClick={() => handlePreviewChange('preview')}
          className="preview-button"
          disabled={!canShowPreview}
        >
          Preview
        </Button>
      </Styled.QuestionInputTab>
    </Styled.QuestionInputTextPreview>
  );

  const renderCommentPreview = (inputValue) => (
    <Styled.QuestionInputTextPreviewDiv className="col-md-12">
      <QuestionMarkdown source={inputValue} />
    </Styled.QuestionInputTextPreviewDiv>
  );

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
        placeholder="Add a comment..."
      />
    );
  };

  return (
    <Styled.CommentInputText>
      {renderPreviewButton(commentInput)}
      {renderInputArea(commentInput)}
    </Styled.CommentInputText>
  );
});

CommentInputText.propTypes = {
  inputValue: PropTypes.string,
  isNewComment: PropTypes.bool,
  onInputChange: PropTypes.func.isRequired,
};

CommentInputText.defaultProps = {
  inputValue: '',
  isNewComment: false,
};

export default CommentInputText;
