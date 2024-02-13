/* eslint-disable camelcase */
/* eslint-disable react/no-children-prop */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import {
  BsThreeDotsVertical, BsCheckCircle, BsArrowDownCircle, BsArrowUpCircle,
} from 'react-icons/bs';
import PropTypes from 'prop-types';
import { useSubmit, useSearchParams } from '@remix-run/react';
import * as Styled from 'app/components/QuestionComment/QuestionComment.styled';
import CounterButton from 'app/components/CounterButton';
import QuestionerResponderInfo from 'app/components/QuestionResponderInfo';
import Button from 'app/components/Atoms/Button';
import Label from 'app/components/Atoms/Label';
import { CircleIcon, DateContainer } from 'app/components/QuestionResponderInfo/QuestionResponderInfo.Styled';
import editIconUnselected from 'app/images/ic_edit.svg';
import deleteIconUnselected from 'app/images/ic_delete.svg';
import editIconSelected from 'app/images/ic_edit_selected.svg';
import deleteIconSelected from 'app/images/ic_delete_selected.svg';
import { getTimeDiff } from 'app/utils/dates/timeOperations';
import useClickOutside from 'app/utils/hooks/useClickOutside';
import {
  DANGER_BUTTON,
  DISABLED_BUTTON,
  SECONDARY_BUTTON,
  COMMENT_EDIT_PLACEHOLDER,
  COMMUNITY_ANSWER_TAG_TEXT,
} from 'app/utils/constants';
import MarkdownLinkRenderer from 'app/components/MarkdownLinkRenderer';
import CommentInputText from 'app/components/CommentInput/CommentInputText';
import ACTIONS from 'app/utils/actions';
import useUser from 'app/utils/hooks/useUser';
import { FaTags, FaEye, FaEyeSlash } from 'react-icons/fa';
import { taggingComments } from 'app/config/flags.json';
import TagModal from '../Modals/TagsModal/TagModal';

function QuestionComment({ commentData, onSubmitSuccess, ...props }) {
  const submit = useSubmit();
  const profile = useUser();
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [commentHasChanged, setCommentHasChanged] = useState(false);
  const [editIcon, setEditIcon] = useState(editIconUnselected);
  const [deleteIcon, setDeleteIcon] = useState(deleteIconUnselected);
  const [updatedComment, setUpdatedComment] = useState('');
  const [upVote, setUpVote] = useState(
    commentData.votes === undefined ? 0 : Number(commentData.votes),
  );
  const [upVoteActive, setUpVoteActive] = useState(
    commentData.has_upvoted === undefined ? false : commentData.has_upvoted,
  );
  const [downVoteActive, setDownVoteActive] = useState(
    commentData.has_downvoted === undefined ? false : commentData.has_downvoted,
  );
  const [searchParams] = useSearchParams();
  const isAnswer = props.hasCommentAsAnswer;
  const [seeComment, setSeeComment] = useState(commentData.tagId === null);

  useEffect(() => { setSeeComment(commentData.tagId === null); }, [commentData.tagId]);

  const {
    state: showCommentOptionsState,
    setState: setShowCommentOptions,
    wrapperRef,
  } = useClickOutside(isEditing || isDeleting);

  function voteComment(comment_id, value) {
    const data = new FormData();
    data.set('action', ACTIONS.VOTE_COMMENT);
    data.set('comment_id', comment_id);
    data.set('value', value);
    let url = `/questions/${commentData.questionid}`;
    const urlSearchParam = searchParams.get('order');
    url = urlSearchParam !== null ? `${url}?order=${urlSearchParam}` : url;

    submit(data, { method: 'post', action: url, replace: true });
  }

  function upVoteF() {
    voteComment(commentData.id, 1);

    if (downVoteActive) {
      setDownVoteActive(false);
      setUpVoteActive(true);
      setUpVote(upVote + 2);
    } else if (upVoteActive) {
      setUpVoteActive(false);
      setUpVote(upVote - 1);
    } else {
      setUpVoteActive(true);
      setUpVote(upVote + 1);
    }
  }

  function downVoteF() {
    voteComment(commentData.id, -1);
    if (upVoteActive) {
      setUpVoteActive(false);
      setDownVoteActive(true);
      setUpVote(upVote - 2);
    } else if (downVoteActive) {
      setDownVoteActive(false);
      setUpVote(upVote + 1);
    } else {
      setDownVoteActive(true);
      setUpVote(upVote - 1);
    }
  }

  function markAsAnswer(check) {
    const data = new FormData();
    data.set('action', ACTIONS.APPROVED_COMMENT);
    data.set('params', JSON.stringify({ questionid: commentData.questionid, commentid: commentData.id, checked: check }));
    let url = `/questions/${commentData.questionid}`;
    const urlSearchParam = searchParams.get('order');
    url = urlSearchParam !== null ? `${url}?order=${urlSearchParam}` : url;
    submit(data, { method: 'post', action: url, replace: true });
  }

  const onSubmit = () => {
    const newCommentData = {
      commentid: commentData.id,
      comment: updatedComment,
      accessToken: profile.accessToken,
      useremail: profile.email,
    };

    setUpdatedComment('');
    setIsEditing(false);
    setEditIcon(editIconUnselected);

    const data = new FormData();
    data.set('action', ACTIONS.UPDATE_COMMENT);
    data.set('newCommentData', JSON.stringify(newCommentData));
    let url = `/questions/${commentData.questionid}`;
    const urlSearchParam = searchParams.get('order');
    url = urlSearchParam !== null ? `${url}?order=${urlSearchParam}` : url;
    submit(data, { method: 'post', action: url, replace: true });
  };

  const changeEditState = () => {
    setIsEditing(!isEditing);
    setIsDeleting(false);
    setEditIcon(isEditing ? editIconUnselected : editIconSelected);
    setDeleteIcon(deleteIconUnselected);
  };

  const changeDeleteState = () => {
    setIsDeleting(!isDeleting);
    setIsEditing(false);
    setDeleteIcon(isDeleting ? deleteIconUnselected : deleteIconSelected);
    setEditIcon(editIconUnselected);
  };

  const handleDeleteComment = () => {
    const data = new FormData();
    data.set('action', ACTIONS.DELETE_COMMENT);
    data.set('comment_id', commentData.id);
    let url = `/questions/${commentData.questionid}`;
    const urlSearchParam = searchParams.get('order');
    url = urlSearchParam !== null ? `${url}?order=${urlSearchParam}` : url;
    submit(data, { method: 'delete', action: url, replace: true });
  };

  const handleCommentUpdate = (comment) => {
    const commentChanged = comment !== commentData.comment && comment.length > 2;
    setCommentHasChanged(commentChanged);
    setUpdatedComment(comment);
  };

  const renderArrowIcon = (direction) => {
    if (direction === 'up') {
      return (
        <Styled.ArrowUp upVoteActive={upVoteActive}>
          <BsArrowUpCircle size="1.8em" color={upVoteActive ? 'var(--color-green)' : 'var(--color-dark-metadata)'} />
        </Styled.ArrowUp>
      );
    }
    return (
      <Styled.ArrowDown downVoteActive={downVoteActive}>
        <BsArrowDownCircle size="1.8em" color={downVoteActive ? 'var(--color-primary)' : 'var(--color-dark-metadata)'} />
      </Styled.ArrowDown>
    );
  };

  const renderCommentOptions = () => (
    <div ref={wrapperRef}>
      {showCommentOptionsState === true
        ? (
          <div>
            <img
              src={editIcon}
              alt="Edit comment"
              onClick={() => changeEditState()}
            />
            <img
              src={deleteIcon}
              alt="Delete comment"
              onClick={changeDeleteState}
            />
          </div>
        )
        : (
          <div>
            <Styled.QuestionCommentDotsWrapper onClick={() => setShowCommentOptions(true)}>
              <BsThreeDotsVertical size="1.3em" />
            </Styled.QuestionCommentDotsWrapper>
          </div>
        )}
    </div>
  );

  const renderButtonOption = () => {
    if (props.hasCommentAsAnswer && commentData.approvedby !== null) {
      return <BsCheckCircle color="green" size="20px" />;
    }
    return <BsCheckCircle color="var(--color-dark-25)" size="20px" />;
  };

  const renderNotAdminOption = () => {
    if (props.hasCommentAsAnswer && commentData.approvedby !== null) {
      return <BsCheckCircle color="green" size="20px" />;
    }
    return null;
  };

  const renderToolTip = (msg) => (
    <Styled.CommentAsAnswerToolTipText>
      {msg}
    </Styled.CommentAsAnswerToolTipText>
  );

  const renderAdminToolTips = () => {
    if (!props.hasAnswer && !props.hasCommentAsAnswer) {
      return renderToolTip('Click to approve the comment as an answer');
    } if (commentData.approvedby !== null) {
      return renderToolTip('Click to unmark the comment as an answer');
    }
    return null;
  };

  const renderTagsOption = () => (
    taggingComments
        && (
        <div>
          <FaTags color="green" size="20px" />
        </div>
        )
  );

  const {
    comment, createdat, updatedat, User, canEdit, tagText, tagId,
  } = commentData;

  const renderCommunityAnswerLabel = () => props.isCommunityAnswer && <Label type="Answer" text={COMMUNITY_ANSWER_TAG_TEXT} />;

  const renderApproverNameLabel = () => (
    <Label type="Answer" text="Approved" approvedBy={commentData.Approver.full_name} />
  );

  const onSelectTag = (id) => {
    const data = {
      tagId: id,
      commentId: commentData.id,
    };
    const formData = new FormData();
    formData.set('action', ACTIONS.TAGGING_COMMENT);
    formData.set('data', JSON.stringify(data));
    let url = `/questions/${commentData.questionid}`;
    const urlSearchParam = searchParams.get('order');
    url = urlSearchParam !== null ? `${url}?order=${urlSearchParam}` : url;
    submit(formData, { method: 'post', action: url, replace: true });
  };

  return (
    <Styled.QuestionCommentContainer
      hadApprover={commentData.approvedby}
      isDeleting={isDeleting}
      isEditing={isEditing}
      isCommunityAnswer={props.isCommunityAnswer}
    >
      <Styled.QuestionCommentButtons>
        <CounterButton
          selected={upVoteActive}
          icon={renderArrowIcon('up')}
          text=""
          count={' '}
          onClick={upVoteF}
        />
        <Styled.QuestionCommentCounterSpan
          upVoteActive={upVoteActive}
          downVoteActive={downVoteActive}
        >
          {upVote}
        </Styled.QuestionCommentCounterSpan>
        <CounterButton
          selected={downVoteActive}
          icon={renderArrowIcon('down')}
          text=""
          count=""
          onClick={downVoteF}
        />
        {(commentData.approvedby !== null) && renderApproverNameLabel()}
        {renderCommunityAnswerLabel()}
      </Styled.QuestionCommentButtons>
      <Styled.QuestionCommentWrapper
        isDeleting={isDeleting}
        isEditing={isEditing}
      >
        <Styled.QuestionCommentMetadata>
          <QuestionerResponderInfo
            createdBy={User}
            isUpdated={updatedat !== null}
            userImgSize="medium"
          >
            <DateContainer isComment hasJobTitle={User.job_title}>
              <CircleIcon />
              <Styled.QuestionCommentDate
                isAdmin={props.isAdmin}
                hadApprover={commentData.approvedby}
              >
                {updatedat !== createdat && <em> edited</em>}
                {getTimeDiff(updatedat || createdat)}
              </Styled.QuestionCommentDate>
            </DateContainer>
          </QuestionerResponderInfo>
          <Styled.QuestionCommentOptionsWrapper>
            {(taggingComments && tagId) && <Styled.Tag>{tagText}</Styled.Tag>}
            {props.isAdmin && !props.hasAnswer ? (
              <Styled.CommentAsAnswerToolTip
                onClick={() => {
                  markAsAnswer(!isAnswer);
                }}
                disabled={
                  props.hasCommentAsAnswer && commentData.approvedby === null
                }
              >
                {renderButtonOption()}
                {renderAdminToolTips()}
              </Styled.CommentAsAnswerToolTip>
            ) : (
              <Styled.CommentAsAnswerToolTip>
                {renderNotAdminOption()}
                {commentData.Approver !== null
                  && renderToolTip('Approved as answer')}
              </Styled.CommentAsAnswerToolTip>
            )}
            {props.isAdmin && (
            <Styled.CommentAsAnswerToolTip onClick={() => setShowModal(true)}>
              {renderTagsOption()}
            </Styled.CommentAsAnswerToolTip>
            )}
            {canEdit && (
              <Styled.QuestionCommentOptions>
                {renderCommentOptions()}
              </Styled.QuestionCommentOptions>
            )}
          </Styled.QuestionCommentOptionsWrapper>
        </Styled.QuestionCommentMetadata>
        <Styled.QuestionCommentText isEditing={isEditing}>
          {!isEditing ? (
            <Styled.QuestionCommentIsTagged isTagged={taggingComments && !seeComment}>
              { (taggingComments && tagId) && (
              <Styled.ButtonSeeComment
                onMouseDown={() => setSeeComment(true)}
                onMouseUp={() => setSeeComment(false)}
              >
                {seeComment ? <FaEyeSlash /> : <FaEye />}
              </Styled.ButtonSeeComment>
              )}
              <Styled.QuestionCommentMarkdown
                children={comment}
                components={{ link: MarkdownLinkRenderer }}
              />
            </Styled.QuestionCommentIsTagged>
          ) : (
            <Styled.QuestionCommentEdit>
              <CommentInputText
                inputValue={comment}
                placeholder={COMMENT_EDIT_PLACEHOLDER}
                onInputChange={handleCommentUpdate}
              />
              <Button
                type="button"
                category={SECONDARY_BUTTON}
                className="edit-comment-button"
                onClick={() => {
                  changeEditState();
                  setShowCommentOptions(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                category={DISABLED_BUTTON}
                className="edit-comment-button"
                onClick={onSubmit}
                disabled={!commentHasChanged}
              >
                Save changes
              </Button>
            </Styled.QuestionCommentEdit>
          )}
          {isDeleting && (
            <Styled.QuestionCommentDeleteConfirmation>
              <p>You are about to delete this comment</p>
              <Button
                type="button"
                category={SECONDARY_BUTTON}
                onClick={() => {
                  changeDeleteState();
                  setShowCommentOptions(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                category={DANGER_BUTTON}
                onClick={handleDeleteComment}
              >
                Delete
              </Button>
            </Styled.QuestionCommentDeleteConfirmation>
          )}
        </Styled.QuestionCommentText>
      </Styled.QuestionCommentWrapper>
      {showModal && (
      <TagModal
        onClose={() => { setShowModal(false); }}
        selectTag={onSelectTag}
        tag={{ id: tagId, text: tagText }}
        removeTag={() => onSelectTag(null)}
      />
      )}
    </Styled.QuestionCommentContainer>

  );
}

QuestionComment.propTypes = {
  commentData: PropTypes.shape({
    comment: PropTypes.string.isRequired,
    createdat: PropTypes.string.isRequired,
    updatedat: PropTypes.string,
    id: PropTypes.number.isRequired,
    tagId: PropTypes.number,
    tagText: PropTypes.string,
    User: PropTypes.shape({
      email: PropTypes.string.isRequired,
      full_name: PropTypes.string.isRequired,
      profile_picture: PropTypes.string.isRequired,
      job_title: PropTypes.string,
    }),
    Approver: PropTypes.shape({
      email: PropTypes.string.isRequired,
      full_name: PropTypes.string.isRequired,
      profile_picture: PropTypes.string.isRequired,
    }),
    canEdit: PropTypes.bool.isRequired,
    questionid: PropTypes.number.isRequired,
    approvedby: PropTypes.bool,
    has_upvoted: PropTypes.bool.isRequired,
    has_downvoted: PropTypes.bool.isRequired,
    votes: PropTypes.number.isRequired,
  }).isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  hasCommentAsAnswer: PropTypes.bool.isRequired,
  hasAnswer: PropTypes.bool.isRequired,
  isCommunityAnswer: PropTypes.bool.isRequired,
};

export default QuestionComment;
