/* eslint-disable camelcase */
import React, { useState, useRef } from 'react';
import { useSubmit, useTransition, useSearchParams } from '@remix-run/react';
import PropTypes from 'prop-types';
import AnswerInputText from 'app/components/AnswerInputText/AnswerInputText';
import Button from 'app/components/Atoms/Button';
import useUser from 'app/utils/hooks/useUser';
import ACTIONS from 'app/utils/actions';
import {
  CANCEL,
  SUBMIT,
  UPDATE_ANSWER,
  SUBMIT_ANSWER,
  ANONYMOUS_USER,
  MAXIMUM_ANSWER_LENGTH,
  MINIMUM_ANSWER_LENGTH,
  editAnswerMessage,
  editAnswerInfo,
  addAnswerMessage,
  addAnswerInfo,
  DISABLED_BUTTON,
  SECONDARY_BUTTON,
  CLOSE_BUTTON,
} from 'app/utils/constants';
import { deleteNoMarkupFormatHTML } from 'app/utils/strings/stringOperations';
import { getTimeDiff } from 'app/utils/dates/timeOperations';
import QuestionMarkdown from 'app/components/QuestionMarkdown/QuestionMarkdown';
import * as Styled from 'app/components/Modals/AnswerModal/AnswerModal.Styled';
import { validTextLength } from 'app/utils/strings/input';

function AnswerModal(props) {
  AnswerModal.propTypes = {
    question: PropTypes.shape(),
    onClose: PropTypes.func.isRequired,
    openAssignAnswerModal: PropTypes.func.isRequired, // eslint-disable-line
  };

  AnswerModal.defaultProps = {
    question: null,
  };

  const submit = useSubmit();
  const transition = useTransition();
  const submitAnswerForm = useRef();
  const profile = useUser();
  const [searchParams] = useSearchParams();

  const initialState = {
    Answer: props.question.answer ? props.question.answer : '',
    isAnswering: false,
    sanitizedInput: props.question.answer ? deleteNoMarkupFormatHTML(props.question.answer.answer_text) : '',
  };

  const [answerData, setAnswerData] = useState(initialState);

  const onAnswerChange = (answer) => {
    setAnswerData({
      ...answerData,
      sanitizedInput: deleteNoMarkupFormatHTML(answer),
    });
  };

  const getQuestionAuthor = (question) => {
    if (!question.is_anonymous && question.created_by) {
      return question.created_by.full_name;
    }
    return ANONYMOUS_USER.username;
  };

  const onSubmitAnswer = () => {
    if (transition.state !== 'idle') {
      return;
    }
    const {
      question,
      onClose,
    } = props;
    const answerValue = answerData.sanitizedInput;
    const answerValueNoHTML = deleteNoMarkupFormatHTML(answerValue);

    if (answerValue !== answerValueNoHTML) {
      return;
    }

    const action = question.answer
      ? ACTIONS.UPDATE_QUESTION_ANSWER
      : ACTIONS.CREATE_QUESTION_ANSWER;

    const data = new FormData(submitAnswerForm.current);
    data.set('action', action);

    if (question.Answer) {
      data.set('answerId', question.answer.answer_id);
    } else {
      data.set('employee_id', profile.employee_id);
      data.set('questionId', question.question_id);
    }

    data.set('answer', answerValueNoHTML);

    onClose();
    let url = `/questions/${question.question_id}`;
    const urlSearchParam = searchParams.get('order');
    url = urlSearchParam !== null ? `${url}?order=${urlSearchParam}` : url;

    submit(data, {
      method: 'post',
      action: url,
      replace: true,
    });
  };

  const renderSecondaryButton = () => {
    if (props.question.answer) {
      return (
        <Button
          type="button"
          category={SECONDARY_BUTTON}
          onClick={props.onClose}
        >
          {CANCEL}
        </Button>
      );
    }

    return null;
  };

  const renderAnswerSubtitle = ({ question, question: { answer } }) => {
    if (answer) {
      return editAnswerInfo(answer.answeredby.full_name, getTimeDiff(answer.answered_at));
    }
    return addAnswerInfo(getQuestionAuthor(question), getTimeDiff(question.createdAt));
  };

  const {
    question,
    question: { question_id },
  } = props;
  const { answer } = question;
  const sanitizedInputLength = answerData.sanitizedInput.length;

  return (
    <div onClick={props.onClose}>
      <Styled.Modal show hide={props.onClose}>
        <Styled.ModalDialog onClick={(e) => e.stopPropagation()}>
          <Button
            category={CLOSE_BUTTON}
            onClick={props.onClose}
          />
          <Styled.ModalHeader>
            <Styled.ModalTitle>
              {answer ? editAnswerMessage(question_id) : addAnswerMessage(question_id)}
            </Styled.ModalTitle>
            <QuestionMarkdown source={question.question} />
            <Styled.ModalSubtitle>{renderAnswerSubtitle(props)}</Styled.ModalSubtitle>
          </Styled.ModalHeader>
          <Styled.ModalBody>
            <div className="row">
              <div className="col-md-12">
                <AnswerInputText
                  inputValue={answer ? answer.answer : ''}
                  onInputChange={onAnswerChange}
                />
              </div>
            </div>
          </Styled.ModalBody>
          <Styled.ModalFooter>
            {renderSecondaryButton()}
            <Button
              id="submitAnswerBtn"
              category={DISABLED_BUTTON}
              onClick={onSubmitAnswer}
              value={SUBMIT}
              disabled={!validTextLength(
                sanitizedInputLength,
                MINIMUM_ANSWER_LENGTH,
                MAXIMUM_ANSWER_LENGTH,
              )}
            >
              {props.question.answer ? UPDATE_ANSWER : SUBMIT_ANSWER}
            </Button>
          </Styled.ModalFooter>
        </Styled.ModalDialog>
      </Styled.Modal>
    </div>
  );
}

export default AnswerModal;
