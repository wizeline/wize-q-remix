import React from 'react';
import AnswerRow from 'app/components/AnswerRow';
import {
  DEPARTMENT_NOT_ASSIGNED,
  ANSWER,
  REASSIGN,
  TEXT_BUTTON,
} from 'app/utils/constants';
import Button from 'app/components/Atoms/Button';
import AnswerAdminOptions from 'app/components/AnswerAdminOptions';

const renderDepartment = (department) => (department ? department.name : DEPARTMENT_NOT_ASSIGNED);

function shouldRenderAdminButtons(question, isAdmin) {
  return !question.Answer && isAdmin;
}

function hasJobTitle(createdBy) {
  if (!createdBy) return '';

  return createdBy.job_title;
}

function renderAdminButtons(renderAdminBtnProps) {
  const { question, onAnswerClick, onAssignAnswerClick } = renderAdminBtnProps;
  return (
    <div className="question-row__admin-buttons--container" style={{ display: 'flex' }}>
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
  if (question.answers.length > 0) {
    // eslint-disable-next-line prefer-destructuring
    Answer = question.answers[0];
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
      user={Answer.answeredby}
      isAnswer
      isCommunityAnswer={false}
      isCommentApproved={false}
    >
      { isAdmin && Answer.answeredby.email === currentUserEmail && (
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

export {
  renderDepartment,
  shouldRenderAdminButtons,
  hasJobTitle,
  renderAdminButtons,
  renderAnswer,
};
