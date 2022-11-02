import PropTypes from 'prop-types';
import likeIcon from '~/images/ic_like.svg';
import likeIconVoted from '~/images/ic_like_pressed.svg';
import commentIcon from '~/images/ic_comment_non-selected.svg';
import {
  renderAnswer,
} from '~/utils/questionUtils';

import * as Styled from './QuestionCard.Styled';
import { useNavigate } from 'react-router-dom';
import QuestionRow from '~/components/QuestionRow';
import CounterButton from '~/components/CounterButton';

const QuestionCard = (props) => {
  const {
    question,
    currentUserEmail,
    question: { Answer },
    onVoteClick,
    searchTerm,
    fetchQuestionsList,
    processingFormSubmission,
  } = props;


  const renderAnswerProps = {
    Answer,
    isAdmin: false,
    currentUserEmail,
    onAnswerClick: () => {},
    openDeleteAnswerModal: () => {},
    question,
    searchTerm,
    isPreview: true,
    isFromList: true,
  };

  const hasAnswer = question.Answer;
  const navigate = useNavigate();


  const renderButtons = () => {
    const icon = !question.hasVoted ? likeIcon : likeIconVoted;

    return (
      <Styled.CounterButtonsWrapper isAdmin={false} hasAnswer={hasAnswer}>
        <CounterButton
          selected={question.hasVoted}
          icon={icon}
          count={question.num_votes}
          onClick={() => onVoteClick(question)}
          processingFormSubmission={processingFormSubmission}
        />
        <CounterButton
          icon={commentIcon}
          count={question.numComments}
          onClick={() => navigate(`/questions/${question.question_id}`)}
        />
      </Styled.CounterButtonsWrapper>
    );
  };

  return (
    <Styled.QuestionCardContainer>
      <Styled.QuestionCardWrapper>
        <Styled.QuestionCardBorder>
          <QuestionRow
            question={question}
            isQuestionModalOpen={false}
            hasAnswer={hasAnswer}
            fetchQuestionsList={fetchQuestionsList}
          />
          <Styled.QuestionCardActions hasAnswer={hasAnswer} isQuestionModalOpen={false}>
            {renderButtons()}
          </Styled.QuestionCardActions>
        </Styled.QuestionCardBorder>
      </Styled.QuestionCardWrapper>
      {renderAnswer(renderAnswerProps)}
    </Styled.QuestionCardContainer>
  );
};

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
    Answer: PropTypes.shape({
      answer: PropTypes.string,
      answer_id: PropTypes.number,
      answered_at: PropTypes.string,
      answered_by_id: PropTypes.number,
      hasScored: PropTypes.bool,
      canUndoNps: PropTypes.bool,
    }),
    createdAt: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    numComments: PropTypes.number.isRequired,
    hasVoted: PropTypes.bool.isRequired,
  }).isRequired,
  onVoteClick: PropTypes.func.isRequired,
  currentUserEmail: PropTypes.string,
  searchTerm: PropTypes.string,
  processingFormSubmission: PropTypes.bool,
};

QuestionCard.defaultProps = {
  currentUserEmail: '',
  searchTerm: '',
};

export default QuestionCard;
