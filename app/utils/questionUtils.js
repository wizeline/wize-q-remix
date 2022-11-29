import AnswerRow from '~/components/AnswerRow';
import {
  DEPARTMENT_NOT_ASSIGNED,
  ANSWER,
  REASSIGN,
  TEXT_BUTTON,
} from '~/utils/constants';
import Button from '~/components/Atoms/Button';
import AnswerAdminOptions from '~/components/AnswerAdminOptions';

const renderDepartment = department =>
  (department ? department.name : DEPARTMENT_NOT_ASSIGNED);

function shouldRenderAdminButtons(question, isAdmin) {
  return !question.Answer && isAdmin;
}

function hasJobTitle(createdBy) {
  if(!createdBy) return;

  return createdBy.job_title;
}

function renderAdminButtons(renderAdminBtnProps) {
  const { question, onAnswerClick, onAssignAnswerClick } = renderAdminBtnProps;
  return (
    <div className="question-row__admin-buttons--container" style={{display: 'flex'}}>
      <Button
        type="button"
        category={TEXT_BUTTON}
        className="admin-button"
        onClick={() => onAnswerClick(question)}
      >
        {ANSWER}
      </Button>
      <Button
        type="button"
        category={TEXT_BUTTON}
        className="admin-button"
        onClick={() => onAssignAnswerClick(question)}
      >
        {REASSIGN}
      </Button>
    </div>
  );
}

function renderAnswer(renderAnswerProps) {

  const {
    isAdmin,
    currentUserEmail,
    onAnswerClick,
    openDeleteAnswerModal,
    question,
    searchTerm,
    isPreview,
    isQuestionModalOpen,
    isFromList,
  } = renderAnswerProps;

  let Answer;
  if (question.Answers.length > 0 ){
    Answer = question.Answers[0];
  }

  if (!Answer) {
    return null;
  }
  let actionsEnabled = false;
  if (Answer.num_scores <= 1) {
    actionsEnabled = true;
  }

  return (
    <AnswerRow
      {...Answer}
      searchTerm={searchTerm}
      isPreview={isPreview}
      isQuestionModalOpen={isQuestionModalOpen}
      questionId={question.question_id}
      isFromList={isFromList}
      user={Answer.AnsweredBy}
      isAnswer
      isCommunityAnswer={false}
      isCommentApproved={false}
    >
      { isAdmin && Answer.AnsweredBy.email === currentUserEmail && (
        <AnswerAdminOptions
          isPreview={isPreview}
          isDisabled={!actionsEnabled}
          onAnswerClick={onAnswerClick}
          openDeleteAnswerModal={openDeleteAnswerModal}
          question={question}
        />
      )}
    </AnswerRow>
  );
}

module.exports = {
  renderDepartment,
  shouldRenderAdminButtons,
  hasJobTitle,
  renderAdminButtons,
  renderAnswer,
};
