/* eslint-disable camelcase */
import React, { useState, useRef } from 'react';
import { useSubmit, useTransition, useSearchParams } from '@remix-run/react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import likeIcon from 'app/images/ic_like.svg';
import likeIconVoted from 'app/images/ic_like_pressed.svg';
import diskilike from 'app/images/ic_dislike.svg';
import dislikeIconVoted from 'app/images/ic_dislike_pressed.svg';
import {
  shouldRenderAdminButtons,
  renderAdminButtons,
  renderAnswer,
} from 'app/utils/questions/questionUtils';
import { addS } from 'app/utils/strings/stringOperations';
import { PRIMARY_BUTTON, LSPIN_SMALL } from 'app/utils/constants';
import Button from 'app/components/Atoms/Button';
import CounterButton from 'app/components/CounterButton';
import QuestionCommentList from 'app/components/QuestionCommentList';
import AssignAnswerModal from 'app/components/Modals/AssignAnswerModal/AssignAnswerModal';
import CommentInput from 'app/components/CommentInput/CommentInput';
import QuestionRow from 'app/components/QuestionRow';
import AnswerModal from 'app/components/Modals/AnswerModal/AnswerModal';
import DeleteAnswerModal from 'app/components/Modals/DeleteAnswerModal/DeleteAnswerModal';
import NetPromoterScoreRow from 'app/components/NetPromoterScoreRow/NetPromoterScoreRow';
import {
  QuestionCardActions, QuestionCardContainer, QuestionCardWrapper, QuestionCardBorder,
} from 'app/components/QuestionCard/QuestionCard.Styled';
import * as Styled from 'app/components/QuestionDetail/QuestionDetail.Styled';
import Loader from 'app/components/Loader';
import logomark from 'app/images/logomark_small.png';
import useUser from 'app/utils/hooks/useUser';
import ACTIONS from 'app/utils/actions';

function QuestionDetails(props) {
  const submit = useSubmit();
  const transition = useTransition();
  const voteQuestionForm = useRef();
  const profile = useUser();
  const isAdmin = profile.is_admin;
  const currentUserEmail = profile.email;

  const { question } = props;

  const initialState = {
    showAnswerModal: false,
    showAssignAnswerModal: false,
    showDeleteAnswerModal: false,
  };

  const [state, setState] = useState(initialState);
  const [writingCommentOnMobile, setWritingCommentOnMobile] = useState(false);
  const [searchParams] = useSearchParams();

  const { questionId } = useParams();

  const addComment = () => {
    setWritingCommentOnMobile(true);
  };

  const renderQuestionButtons = () => {
    const onLikeButtonClick = (isUpVote) => {
      if (transition.state !== 'idle') {
        return;
      }
      const data = new FormData(voteQuestionForm.current);
      data.set('action', ACTIONS.VOTE_QUESTION);
      data.set('questionId', question.question_id);
      data.set('user', JSON.stringify(profile));
      data.set('isUpVote', isUpVote);
      let url = `/questions/${question.question_id}`;
      const urlSearchParam = searchParams.get('order');
      url = urlSearchParam !== null ? `${url}?order=${urlSearchParam}` : url;
      submit(data, {
        method: 'post',
        action: url,
        replace: true,
      });
    };

    const icon = !question.hasLike ? likeIcon : likeIconVoted;
    const dislikeicon = !question.hasDislike ? diskilike : dislikeIconVoted;

    return (
      <Styled.CounterButtonsWrapper
        isAdmin={isAdmin}
        hasAnswer={question.Answer}
      >
        <CounterButton
          selected={question.hasLike}
          icon={icon}
          count={question.numLikes}
          processingFormSubmission={transition.state !== 'idle'}
          onClick={() => { onLikeButtonClick(true); }}
          isDisabled={question.hasDislike}
        />
        <CounterButton
          selected={question.hasDislike}
          icon={dislikeicon}
          count={question.numDisklike}
          processingFormSubmission={transition.state !== 'idle'}
          onClick={() => { onLikeButtonClick(false); }}
          isDisabled={question.hasLike}
        />
      </Styled.CounterButtonsWrapper>
    );
  };

  const renderNumCommentsRow = () => (
    <Styled.NumComments>
      {question.numComments}
      {' '}
      {addS('Comment', question.numComments)}
    </Styled.NumComments>
  );

  const openAssignAnswerModal = () => {
    setState({
      ...state,
      showAssignAnswerModal: true,
    });
  };

  const openAnswerModal = () => {
    setState({
      ...state,
      showAnswerModal: true,
    });
  };

  const openDeleteAnswerModal = () => {
    setState({
      ...state,
      showDeleteAnswerModal: true,
    });
  };

  const handleAnswerModalClose = () => {
    setState({
      ...state,
      showAnswerModal: false,
    });
  };

  const handleDeleteAnswerModalClose = () => {
    setState({ ...state, showDeleteAnswerModal: false });
  };

  const answerModal = state.showAnswerModal ? (
    <AnswerModal
      question={question}
      onClose={handleAnswerModalClose}
      openAssignAnswerModal={openAssignAnswerModal}
    />
  ) : null;

  const deleteAnswerModal = state.showDeleteAnswerModal ? (
    <DeleteAnswerModal
      question={question}
      onClose={handleDeleteAnswerModalClose}
    />
  ) : null;

  const scoreAnswer = (score, answer_id) => {
    const data = new FormData();
    data.set('score', score);
    data.set('answer_id', answer_id);
    data.set('action', ACTIONS.SCORE_ANSWER);
    let url = `/questions/${question.question_id}`;
    const urlSearchParam = searchParams.get('order');
    url = urlSearchParam !== null ? `${url}?order=${urlSearchParam}` : url;
    submit(data, { method: 'post', action: url, replace: true });
  };

  const deleteScore = (answer_id) => {
    const data = new FormData();
    data.set('answer_id', answer_id);
    data.set('action', ACTIONS.DELETE_SCORE);
    let url = `/questions/${question.question_id}`;
    const urlSearchParam = searchParams.get('order');
    url = urlSearchParam !== null ? `${url}?order=${urlSearchParam}` : url;
    submit(data, { method: 'post', action: url, replace: true });
  };

  const renderNPS = (answer) => answer
  && answer.answeredby.email !== currentUserEmail
  && (
  <div>
    <NetPromoterScoreRow
      answer_id={answer.answer_id}
      hasScored={!!answer.hasScored}
      canUndoNps={!!answer.canUndoNps}
      scoreAnswer={scoreAnswer}
      deleteScore={deleteScore}
    />
  </div>
  );

  const isEmpty = (obj) => Object.keys(obj).length === 0;

  const handleAssignAnswerModalClose = () => {
    setState({ ...state, showAssignAnswerModal: false });
  };
  const handleAssignAnswerModalSubmitSuccess = () => {
    setState({
      ...state,
      showAssignAnswerModal: false,
      showAnswerModal: false,
    });
  };
  const assignAnswerModal = state.showAssignAnswerModal ? (
    <AssignAnswerModal
      question={question}
      onClose={handleAssignAnswerModalClose}
      onSubmitSuccess={handleAssignAnswerModalSubmitSuccess}
    />
  ) : null;

  return (
    <Styled.Container>
      {!isEmpty(question)
      && question.question_id === parseInt(questionId, 10)
      && isAdmin !== undefined ? (
        <Styled.QuestionDetail>
          <Styled.QuestionDetailHeader>
            <QuestionCardContainer>
              <QuestionCardWrapper>
                <QuestionCardBorder>
                  <QuestionRow question={question} isFromList={false} />
                  <QuestionCardActions
                    hasDetail
                    hasAnswer={question.Answer}
                    isQuestionModalOpen
                  >
                    {renderQuestionButtons()}
                    {shouldRenderAdminButtons(question, isAdmin)
                      && renderAdminButtons({
                        question,
                        onAnswerClick: () => {
                          setState({ ...state, showAnswerModal: true });
                        },
                        onAssignAnswerClick: () => { openAssignAnswerModal(question); },
                      })}
                  </QuestionCardActions>
                </QuestionCardBorder>
              </QuestionCardWrapper>
              {renderAnswer({
                Answer: question.Answer,
                isAdmin,
                currentUserEmail,
                onAnswerClick: () => {
                  openAnswerModal(question);
                },
                openDeleteAnswerModal: () => {
                  openDeleteAnswerModal(question);
                },
                question,
                isQuestionModalOpen: true,
                isFromList: false,
              })}
            </QuestionCardContainer>
            {renderNPS(question.Answer)}
          </Styled.QuestionDetailHeader>
          <Styled.QuestionDetailBody>
            <QuestionCommentList
              questionId={parseInt(questionId, 10)}
              isAdmin={isAdmin}
              hasAnswer={question.Answer !== null}
            >
              {renderNumCommentsRow()}
            </QuestionCommentList>
          </Styled.QuestionDetailBody>
          <Styled.QuestionDetailFooter
            className={writingCommentOnMobile ? 'writing-mobile' : ''}
          >
            <Button
              type="button"
              category={PRIMARY_BUTTON}
              className={
                writingCommentOnMobile ? 'writing-mobile' : 'add-comment-button'
              }
              onClick={addComment}
            >
              Add Comment
            </Button>
            <CommentInput
              isWritingCommentMobile={writingCommentOnMobile}
              setWritingCommentOnMobile={setWritingCommentOnMobile}
              questionId={parseInt(questionId, 10)}
            />

          </Styled.QuestionDetailFooter>
        </Styled.QuestionDetail>
        ) : (
          <Loader src={logomark} size={LSPIN_SMALL} />
        )}
      {answerModal}
      {deleteAnswerModal}
      {assignAnswerModal}
    </Styled.Container>
  );
}

QuestionDetails.propTypes = {
  question: PropTypes.shape({
    question_id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    user_hash: PropTypes.string,
    can_edit: PropTypes.bool,
    AnsweredBy: PropTypes.shape({
      email: PropTypes.string,
      employee_id: PropTypes.number,
      full_name: PropTypes.string,
      is_admin: PropTypes.bool,
      job_title: PropTypes.string,
      profile_picture: PropTypes.string,
    }),
    createdAt: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    numComments: PropTypes.number.isRequired,
    hasVoted: PropTypes.bool.isRequired,
    Answer: PropTypes.shape({
      answer: PropTypes.string,
      answer_id: PropTypes.number.isRequired,
      answered_at: PropTypes.string,
      answered_by_id: PropTypes.number,
      hasScored: PropTypes.bool,
      canUndoNps: PropTypes.bool,
    }),
    mostUpvoted: PropTypes.bool,
    numLikes: PropTypes.number.isRequired,
    numDisklike: PropTypes.number.isRequired,
    hasLike: PropTypes.bool.isRequired,
    hasDislike: PropTypes.bool.isRequired,
  }),
};

QuestionDetails.defaultProps = {
  question: null,
};

export default QuestionDetails;
