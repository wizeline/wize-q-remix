import { useRef } from 'react';
import { useSubmit, useTransition } from "@remix-run/react";
import PropTypes from 'prop-types';
import Button from '~/components/Atoms/Button/Button';
import { ACTIONS } from "~/utils/actions";
import {
  answerDeleteWarning,
  ANSWER_DELETE_WARNING_SUBTITLE,
  CANCEL,
  CLOSE_BUTTON,
  DANGER_BUTTON,
  DELETE_ANSWER,
  SECONDARY_BUTTON,
} from '~/utils/constants';

import * as Styled from '~/components/Modals/DeleteAnswerModal/DeleteAnswerModal.Styled';

function DeleteAnswerModal({ question, onClose, onSubmitSuccess, ...props }) {

  const submit = useSubmit();
  const transition = useTransition();
  const deleteAnswerForm = useRef();

  const onDeleteAnswer = () => {
    if (transition.state !== "idle") {
        return;
    }

    const data = new FormData(deleteAnswerForm.current);
    data.set("action", ACTIONS.DELETE_ANSWER);
    data.set("answerId", question.Answer.answer_id);

    onClose();

    submit(data, {
        method: "post",
        action: `/questions/${question.question_id}`,
    });

  };

  return (
    <div onClick={onClose}>
      <Styled.Modal show>
        <Styled.ModalDialog onClick={e => e.stopPropagation()}>
          <Button category={CLOSE_BUTTON} onClick={onClose} />
          <Styled.ModalHeader>
            <Styled.ModalInfo>
              <Styled.ModalTitle>
                {answerDeleteWarning(question.question_id)}
              </Styled.ModalTitle>
              <Styled.ModalSubtitle>{ANSWER_DELETE_WARNING_SUBTITLE}</Styled.ModalSubtitle>
            </Styled.ModalInfo>
          </Styled.ModalHeader>
          <Styled.ModalFooter>
            <Button type="button" category={SECONDARY_BUTTON} onClick={onClose}>
              {CANCEL}
            </Button>
            <Button type="button" category={DANGER_BUTTON} onClick={onDeleteAnswer}>
              {DELETE_ANSWER}
            </Button>
          </Styled.ModalFooter>
        </Styled.ModalDialog>
      </Styled.Modal>
    </div>
  );
}

DeleteAnswerModal.propTypes = {
  question: PropTypes.shape(),
  onClose: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
  deleteAnswer: PropTypes.func.isRequired,
};

DeleteAnswerModal.defaultProps = {
  question: null,
};

export default DeleteAnswerModal;