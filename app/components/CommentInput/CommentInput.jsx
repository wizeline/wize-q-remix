import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSubmit, useSearchParams } from '@remix-run/react';
import {
  ANONYMOUS_USER, HTML_CODE_WARNING, PRIMARY_BUTTON,
  SECONDARY_BUTTON, MIN_SHOW_COMMENT_BTN_LENGTH,
} from 'app/utils/constants';
import * as Styled from 'app/components/CommentInput/CommentInput.styled';
import Button from 'app/components/Atoms/Button';
import { deleteNoMarkupFormatHTML } from 'app/utils/stringOperations';
import CommentInputAuthor from 'app/components/CommentInput/CommentInputAuthor';
import CommentInputText from 'app/components/CommentInput/CommentInputText';
import useUser from 'app/utils/hooks/useUser';
import ACTIONS from 'app/utils/actions';

function CommentInput(props) {
  const submit = useSubmit();
  const { setWritingCommentOnMobile } = props;
  const profile = useUser();

  const initialState = {
    comment: '',
    isCommenting: false,
    isCommentingError: false,
    isCommentingSuccess: false,
    isCommentingWarning: false,
    isAnonymous: false,
    warnings: [],
    profilePicture: profile.profile_picture,
    inputValue: '',
    isShowPreview: false,
  };

  const [comment, setComment] = useState(initialState);
  const [searchParams] = useSearchParams();

  const openSubmitWithModal = (warning) => {
    setComment((state) => ({
      warnings: [
        ...state.warnings,
        warning,
      ],
    }));
  };

  const CommentInputTextRef = useRef();
  const resetForm = () => {
    setComment((state) => ({
      ...state,
      isCommenting: false,
      isCommentingError: false,
      isCommentingSuccess: false,
      isCommentingWarning: false,
      isAnonymous: false,
      profilePicture: profile.profile_picture,
      warnings: [],
      inputValue: '',
      isShowPreview: false,
    }));
    CommentInputTextRef.current.resetInputText();
  };

  const onSubmit = async (event) => {
    const { questionId } = props;

    event.preventDefault();
    const inputValue = comment.inputValue.trim();
    const sanitizedInput = deleteNoMarkupFormatHTML(inputValue);
    if (inputValue !== sanitizedInput) {
      openSubmitWithModal(HTML_CODE_WARNING);
    }
    const commentToSubmit = {
      comment: sanitizedInput,
      questionId,
      user: {
        accessToken: profile.accessToken,
        userEmail: profile.email,
        userName: profile.full_name,
      },
      isAnonymous: comment.isAnonymous,
    };

    const data = new FormData();
    data.set('action', ACTIONS.CREATE_COMMENT);
    data.set('commentToSubmit', JSON.stringify(commentToSubmit));
    let url = `/questions/${questionId}`;
    const urlSearchParam = searchParams.get('order');
    url = urlSearchParam !== null ? `${url}?order=${urlSearchParam}` : url;
    submit(data, { method: 'post', action: url, replace: true });
    resetForm();
    setWritingCommentOnMobile(false);
  };

  const onInputChange = (inputValue) => {
    setComment((state) => ({
      ...state,
      inputValue,
    }));
  };

  const getAuthor = () => {
    if (comment.isAnonymous) {
      return ` as ${(ANONYMOUS_USER.username)}`;
    }
    const name = profile.full_name.split(' ')[0];
    if (name) {
      return ` as ${name}`;
    }
    return '';
  };

  const selectPostingAs = (username) => {
    const isAnonymous = (username === ANONYMOUS_USER.username);
    const profilePicture = isAnonymous ? ANONYMOUS_USER.profilePicture : profile.profile_picture;
    setComment((state) => ({
      ...state,
      isAnonymous,
      profilePicture,
    }));
  };

  const renderButtons = () => {
    const commentLength = comment.inputValue ? comment.inputValue.length : 0;
    return (
      (commentLength >= MIN_SHOW_COMMENT_BTN_LENGTH
          || props.isWritingCommentMobile) && (
          <Styled.CommentInputButtonsContainer>
            <Button
              type="button"
              category={SECONDARY_BUTTON}
              onClick={() => { resetForm(); setWritingCommentOnMobile(false); }}
            >
              Cancel
            </Button>
            <Button type="submit" category={PRIMARY_BUTTON} form="comment-form">
              Post
              {getAuthor()}
            </Button>
          </Styled.CommentInputButtonsContainer>
      )
    );
  };

  const { profilePicture } = comment;
  return (
    <Styled.CommentInputMainContainer className={`${props.isWritingCommentMobile ? 'writing-mobile' : ''}`}>
      <Styled.CommentInputForm id="comment-form" onSubmit={onSubmit}>
        <Styled.CommentInputTextAreaForm>
          <CommentInputAuthor
            profilePicture={profilePicture}
            selectPostingAs={selectPostingAs}
          />
          <CommentInputText
            ref={CommentInputTextRef}
            onInputChange={onInputChange}
            resetInputText={resetForm}
            isNewComment
          />
        </Styled.CommentInputTextAreaForm>
        {renderButtons()}
      </Styled.CommentInputForm>
    </Styled.CommentInputMainContainer>
  );
}

CommentInput.propTypes = {
  questionId: PropTypes.number,
  isWritingCommentMobile: PropTypes.bool,
  setWritingCommentOnMobile: PropTypes.func,
};

CommentInput.defaultProps = {
  questionId: null,
  isWritingCommentMobile: false,
  setWritingCommentOnMobile: () => {},
};

export default CommentInput;
