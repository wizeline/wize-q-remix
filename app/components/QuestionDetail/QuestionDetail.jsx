import {useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import likeIcon from '~/images/ic_like.svg';
import likeIconVoted from '~/images/ic_like_pressed.svg';
import commentIcon from '~/images/ic_comment_selected.svg';
import { addS } from '~/utils/stringOperations';
import {
    shouldRenderAdminButtons,
    renderAdminButtons,
  } from '~/utils/questionUtils';
import {
    PRIMARY_BUTTON,
    LSPIN_SMALL,
  } from '~/utils/constants';
import * as Styled from '~/components/QuestionDetail/QuestionDetail.Styled';
import Button from '~/components/Atoms/Button';
import CounterButton from '~/components/CounterButton';
import { QuestionCardActions } from '~/components/QuestionCard/QuestionCard.Styled';
import QuestionRow from '~/components/QuestionRow';
import Loader from '~/components/Loader';
import logomark from '~/images/logomark_small.png';
import { useUser } from '~/utils/hooks/useUser';

function QuestionDetails(props) {

  const profile = useUser();
  const isAdmin = profile.is_admin;

  const { question,
    onVoteClick,
    currentUserEmail } = props;


  const [writingCommentOnMobile, setWritingCommentOnMobile] = useState(false);

  const { questionId } = useParams();

  const addComment = () => {
    setWritingCommentOnMobile(true);
  };

  const renderQuestionButtons = () => {
    const icon = !question.hasVoted ? likeIcon : likeIconVoted;
    return (
      <Styled.CounterButtonsWrapper isAdmin={isAdmin} hasAnswer={question.Answer}>
        <CounterButton
          selected={question.hasVoted}
          icon={icon}
          text={addS('Like', question.num_votes)}
          count={question.num_votes}
          onClick={() => onVoteClick(question, false)}
        />
        <CounterButton
          notButton
          icon={commentIcon}
          text={addS('Comment', question.numComments)}
          count={question.numComments}
        />
      </Styled.CounterButtonsWrapper>
    );
  };

  const renderNumCommentsRow = answer =>
  answer && (
    <Styled.NumComments>{question.numComments} Comments</Styled.NumComments>
  );

  const isEmpty = obj => Object.keys(obj).length === 0;

  return (
    <Styled.Container>
      {((!isEmpty(question) && question.question_id === parseInt(questionId, 10))
      && isAdmin !== undefined) ?
        <Styled.QuestionDetail>
          <Styled.QuestionDetailHeader>
            <QuestionRow
              question={question}
              isFromList={false}
            />
            <QuestionCardActions hasDetail hasAnswer={question.Answer} isQuestionModalOpen>
              {renderQuestionButtons()}
              {shouldRenderAdminButtons(question, isAdmin) &&
                    renderAdminButtons({
                      question,
                      onAnswerClick: () => { },
                      onAssignAnswerClick: () => {},
                    })}
            </QuestionCardActions>
          </Styled.QuestionDetailHeader>
          <Styled.QuestionDetailBody>
            {renderNumCommentsRow(question.Answer)}
          </Styled.QuestionDetailBody>
          <Styled.QuestionDetailFooter
            className={writingCommentOnMobile ? 'writing-mobile' : ''}
          >
            <Button
              type="button"
              category={PRIMARY_BUTTON}
              className={
                  writingCommentOnMobile
                    ? 'writing-mobile'
                    : 'add-comment-button'
                }
              onClick={addComment}
            >
                Add Comment
              </Button>

          </Styled.QuestionDetailFooter>
        </Styled.QuestionDetail>
      : <Loader src={logomark} size={LSPIN_SMALL} />
      }
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
  currentUserEmail: PropTypes.string,
};

QuestionDetails.defaultProps = {
  question: null,
  currentUserEmail: '',
};

export default QuestionDetails;