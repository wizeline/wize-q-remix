import { useState, useRef } from "react";
import { useSubmit, useTransition, useSearchParams } from "@remix-run/react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import likeIcon from "~/images/ic_like.svg";
import likeIconVoted from "~/images/ic_like_pressed.svg";
import {
  shouldRenderAdminButtons,
  renderAdminButtons,
  renderAnswer,
} from "~/utils/questionUtils";
import { PRIMARY_BUTTON, LSPIN_SMALL } from "~/utils/constants";
import * as Styled from "~/components/QuestionDetail/QuestionDetail.Styled";
import Button from "~/components/Atoms/Button";
import CounterButton from "~/components/CounterButton";
import { QuestionCardActions, QuestionCardContainer, QuestionCardWrapper, QuestionCardBorder } from "~/components/QuestionCard/QuestionCard.Styled";
import QuestionRow from "~/components/QuestionRow";
import AnswerModal from "~/components/Modals/AnswerModal/AnswerModal";
import DeleteAnswerModal from "~/components/Modals/DeleteAnswerModal/DeleteAnswerModal";
import Loader from "~/components/Loader";
import logomark from "~/images/logomark_small.png";
import { useUser } from "~/utils/hooks/useUser";
import { ACTIONS } from "~/utils/actions";
import QuestionCommentList  from '~/components/QuestionCommentList';
import CommentInput from '~/components/CommentInput/CommentInput';

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
  };

  const [state, setState] = useState(initialState);
  const [writingCommentOnMobile, setWritingCommentOnMobile] = useState(false);
  const [searchParams] = useSearchParams();

  const { questionId } = useParams();

  const addComment = () => {
    setWritingCommentOnMobile(true);
  };

  const renderQuestionButtons = () => {
    const onLikeButtonClick = () => {
      if (transition.state !== "idle") {
        return;
      }
      const data = new FormData(voteQuestionForm.current);
      data.set("action", ACTIONS.VOTE_QUESTION);
      data.set("questionId", question.question_id);
      data.set("user", JSON.stringify(profile));
      let url = `/questions/${question.question_id}`;
      const urlSearchParam = searchParams.get('order');
      url = urlSearchParam !== null ? `${url}?order=${urlSearchParam}` : url;
      submit(data, {
        method: "post",
        action: url,
      });
    };

    const icon = !question.hasVoted ? likeIcon : likeIconVoted;
    return (
      <Styled.CounterButtonsWrapper
        isAdmin={isAdmin}
        hasAnswer={question.Answer}
      >
        <CounterButton
          selected={question.hasVoted}
          icon={icon}
          count={question.num_votes}
          processingFormSubmission={transition.state !== "idle"}
          onClick={onLikeButtonClick}
        />
      </Styled.CounterButtonsWrapper>
    );
  };

  const renderNumCommentsRow = (answer) =>
    answer && (
      <Styled.NumComments>{question.numComments} Comments</Styled.NumComments>
    );

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
    <AnswerModal question={question} onClose={handleAnswerModalClose} />
  ) : null;

  const deleteAnswerModal = state.showDeleteAnswerModal ? (
    <DeleteAnswerModal
      question={question}
      onClose={handleDeleteAnswerModalClose}
    />
  ) : null;

  const isEmpty = (obj) => Object.keys(obj).length === 0;

  return (
    <Styled.Container>
      {!isEmpty(question) &&
      question.question_id === parseInt(questionId, 10) &&
      isAdmin !== undefined ? (
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
                    {shouldRenderAdminButtons(question, isAdmin) &&
                      renderAdminButtons({
                        question,
                        onAnswerClick: () => {
                          setState({ ...state, showAnswerModal: true });
                        },
                        onAssignAnswerClick: () => {},
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
          </Styled.QuestionDetailHeader>
          <Styled.QuestionDetailBody>
            <QuestionCommentList
              questionId={parseInt(questionId, 10)}
              isAdmin={isAdmin}
              hasAnswer={question.Answer !== null}
            >
              {renderNumCommentsRow(question.Answer)}
            </QuestionCommentList>
          </Styled.QuestionDetailBody>
          <Styled.QuestionDetailFooter
            className={writingCommentOnMobile ? "writing-mobile" : ""}
          >
            <Button
              type="button"
              category={PRIMARY_BUTTON}
              className={
                writingCommentOnMobile ? "writing-mobile" : "add-comment-button"
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
    </Styled.Container>
  );
}

QuestionDetails.propTypes = {
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
    createdAt: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    Votes: PropTypes.number.isRequired,
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
  }),
};

QuestionDetails.defaultProps = {
  question: null,
};

export default QuestionDetails;