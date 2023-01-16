import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import likeIcon from 'app/images/ic_like.svg';
import diskilike from 'app/images/ic_dislike.svg';
import dislikeIconVoted from 'app/images/ic_dislike_pressed.svg';
import likeIconVoted from 'app/images/ic_like_pressed.svg';
import commentIcon from 'app/images/ic_comment_non-selected.svg';
import {
  renderAnswer,
} from 'app/utils/questionUtils';

import * as Styled from 'app/components/QuestionCard/QuestionCard.Styled';
import QuestionRow from 'app/components/QuestionRow';
import CounterButton from 'app/components/CounterButton';
import reorderHighlightedComments from 'app/utils/commentUtils';
import AnswerRow from 'app/components/AnswerRow';

function QuestionCard(props) {
  const {
    question,
    currentUserEmail,
    question: { Answers },
    onVoteClick,
    searchTerm,
    processingFormSubmission,
  } = props;

  const renderAnswerProps = {
    Answers,
    isAdmin: false,
    currentUserEmail,
    onAnswerClick: () => {},
    openDeleteAnswerModal: () => {},
    question,
    searchTerm,
    isPreview: true,
    isFromList: true,
    questionId: question.question_id,
    isAnswer: true,
  };

  const hasAnswer = question.Answers.length > 0;
  const navigate = useNavigate();

  const renderButtons = () => {
    const icon = !question.hasLike ? likeIcon : likeIconVoted;
    const dislikeicon = !question.hasDislike ? diskilike : dislikeIconVoted;

    return (
      <Styled.CounterButtonsWrapper isAdmin={false} hasAnswer={hasAnswer}>
        <CounterButton
          id={`like-button-${question.question_id}`}
          selected={question.hasLike}
          icon={icon}
          count={question.numLikes}
          onClick={() => onVoteClick(true)}
          processingFormSubmission={processingFormSubmission}
          isDisabled={question.hasDislike}
        />
        <CounterButton
          id={`like-button-${question.question_id}`}
          selected={question.hasDislike}
          icon={dislikeicon}
          count={question.numDisklike}
          onClick={() => onVoteClick(false)}
          processingFormSubmission={processingFormSubmission}
          isDisabled={question.hasLike}
        />
        <CounterButton
          id={`comments-button-${question.question_id}`}
          icon={commentIcon}
          count={question.numComments}
          onClick={() => navigate(`/questions/${question.question_id}`)}
        />
      </Styled.CounterButtonsWrapper>
    );
  };

  // eslint-disable-next-line consistent-return
  const renderCommentAnswer = () => {
    if ((!question.hasCommentApproved && !question.hasCommunityAnswer)
       || question.Answers.length > 0) {
      return null;
    }

    let commentAsAnswer = {};
    if (question.hasCommentApproved) {
      commentAsAnswer = question.Comments.find((comment) => comment.approvedBy !== null);
    } else if (question.hasCommunityAnswer) {
      const [communityAnswerCommentId] = reorderHighlightedComments(question.Comments);
      commentAsAnswer = question.Comments.find(
        (comment) => comment.id === communityAnswerCommentId,
      );
    }

    if (commentAsAnswer) {
      return (
        <AnswerRow
          answer_text={commentAsAnswer.comment}
          user={commentAsAnswer.User}
          answered_at={commentAsAnswer.createdAt}
          searchTerm={renderAnswerProps.searchTerm}
          isPreview={renderAnswerProps.isPreview}
          isFromList={renderAnswerProps.isFromList}
          questionId={question.question_id}
          isAnswer={question.Answers.length > 0}
          isCommunityAnswer={question.hasCommunityAnswer}
          isCommentApproved={question.hasCommentApproved}
          approver={commentAsAnswer.Approver}
        />
      );
    }
  };

  return (
    <Styled.QuestionCardContainer>
      <Styled.QuestionCardWrapper>
        <Styled.QuestionCardBorder>
          <QuestionRow
            question={question}
            isQuestionModalOpen={false}
            hasAnswer={hasAnswer}
          />
          <Styled.QuestionCardActions hasAnswer={hasAnswer} isQuestionModalOpen={false}>
            {renderButtons()}
          </Styled.QuestionCardActions>
        </Styled.QuestionCardBorder>
      </Styled.QuestionCardWrapper>
      {renderAnswer(renderAnswerProps)}
      {renderCommentAnswer()}
    </Styled.QuestionCardContainer>
  );
}

QuestionCard.propTypes = {
  question: PropTypes.shape({
    question_id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    user_hash: PropTypes.string,
    can_edit: PropTypes.bool,
    created_by_user: PropTypes.shape({
      email: PropTypes.string,
      employee_id: PropTypes.number,
      full_name: PropTypes.string,
      is_admin: PropTypes.bool,
      job_title: PropTypes.string,
      profile_picture: PropTypes.string,
    }),
    Answers: PropTypes.arrayOf(
      PropTypes.shape(),
    ),
    createdAt: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    numComments: PropTypes.number.isRequired,
    hasVoted: PropTypes.bool.isRequired,
    hasCommentApproved: PropTypes.bool.isRequired,
    hasCommunityAnswer: PropTypes.bool.isRequired,
    Comments: PropTypes.arrayOf(
      PropTypes.shape(),
    ),
    numLikes: PropTypes.number.isRequired,
    numDisklike: PropTypes.number.isRequired,
    hasLike: PropTypes.bool.isRequired,
    hasDislike: PropTypes.bool.isRequired,
  }).isRequired,
  onVoteClick: PropTypes.func.isRequired,
  currentUserEmail: PropTypes.string,
  searchTerm: PropTypes.string,
  processingFormSubmission: PropTypes.bool,
};

QuestionCard.defaultProps = {
  currentUserEmail: '',
  searchTerm: '',
  processingFormSubmission: false,
};

export default QuestionCard;
