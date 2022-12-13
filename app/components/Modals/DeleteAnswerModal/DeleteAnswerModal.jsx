import React, { useRef } from 'react';
import { useSubmit, useTransition, useSearchParams } from '@remix-run/react';
import PropTypes from 'prop-types';
import Button from 'app/components/Atoms/Button/Button';
import ACTIONS from 'app/utils/actions';
import {
  answerDeleteWarning,
  ANSWER_DELETE_WARNING_SUBTITLE,
  CANCEL,
  CLOSE_BUTTON,
  DANGER_BUTTON,
  DELETE_ANSWER,
  SECONDARY_BUTTON,
} from 'app/utils/constants';

import * as Styled from './DeleteAnswerModal.Styled';

function DeleteAnswerModal({
  question, onClose,
}) {
  const submit = useSubmit();
  const transition = useTransition();
  const deleteAnswerForm = useRef();
  const [searchParams] = useSearchParams();

  const onDeleteAnswer = () => {
    if (transition.state !== 'idle') {
      return;
    }

    const data = new FormData(deleteAnswerForm.current);
    data.set('action', ACTIONS.DELETE_ANSWER);
    data.set('answerId', question.Answer.answer_id);

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

  return (
    <div onClick={onClose}>
      <Styled.Modal show>
        <Styled.ModalDialog onClick={(e) => e.stopPropagation()}>
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
};

DeleteAnswerModal.defaultProps = {
  question: null,
};

export default DeleteAnswerModal;
