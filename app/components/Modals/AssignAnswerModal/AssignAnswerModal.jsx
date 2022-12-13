import React, { useState, useRef } from 'react';
import { useSubmit, useTransition, useLoaderData } from '@remix-run/react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, MenuItem } from 'react-bootstrap';
import Button from 'app/components/Atoms/Button/Button';
import {
  DISABLED_BUTTON, SECONDARY_BUTTON, CLOSE_BUTTON, DEPARTMENT_PLACEHOLDER,
} from 'app/utils/constants';
import ACTIONS from 'app/utils/actions';
import * as Styled from 'app/components/Modals/AssignAnswerModal/AssignAnswerModal.Styled';

function AssignAnswerModal(props) {
  const {
    question,
    onClose,
  } = props;

  const [departmentsDropdownSelected, setDeparmentsDropdownSelected] = useState(null);
  const [department, setDepartment] = useState({ name: DEPARTMENT_PLACEHOLDER, department_id: 0 });
  const { departments: departmentData } = useLoaderData();

  const submit = useSubmit();
  const transition = useTransition();
  const assignQuestionForm = useRef();

  const resetModal = () => {
    setDeparmentsDropdownSelected(null);
    setDepartment({ name: DEPARTMENT_PLACEHOLDER, department_id: 0 });
    onClose();
  };

  const onDepartmentAssigned = () => {
    resetModal();

    if (transition.state !== 'idle') {
      return;
    }

    const data = new FormData(assignQuestionForm.current);
    data.set('action', ACTIONS.ASSIGN_QUESTION);
    data.set('questionId', question.question_id);
    data.set('assigned_department', department.department_id);
    submit(data, { method: 'post', action: `/questions/${question.question_id}`, replace: true });

    setDepartment(
      { name: DEPARTMENT_PLACEHOLDER, department_id: 0 },
    );
  };

  const selectDepartmentIndex = (selectedDepartment) => departmentData.findIndex(
    (department1) => selectedDepartment.department_id === department1.department_id,
  );

  const handleDepartmentSelectChange = (selectedDepartment) => {
    const selectedDepartmentIndex = selectDepartmentIndex(selectedDepartment);

    setDeparmentsDropdownSelected(departmentData[selectedDepartmentIndex]);
    setDepartment(departmentData[selectedDepartmentIndex]);
  };

  const isSubmitEnabled = () => departmentsDropdownSelected;

  const renderDepartmentOptions = () => departmentData.map((department2) => (
    <MenuItem eventKey={department2} key={department2.department_id}>
      {department2.name}
    </MenuItem>
  ));

  const renderDepartmentSelectBox = () => (
    <FormGroup controlId="formControlsSelectMultiple">
      <ControlLabel>
        Specify which department you think your question
        should be addressed to:
      </ControlLabel>
      <Styled.SelectContainer>
        <Styled.CustDropDownButton
          bsStyle="default"
          title={department.name}
          onSelect={handleDepartmentSelectChange}
          id="dropdown"
        >
          {renderDepartmentOptions()}
        </Styled.CustDropDownButton>
      </Styled.SelectContainer>
    </FormGroup>
  );

  if (!question) { return null; }
  return (
    <div id="main" onClick={resetModal}>
      <Styled.AssignModal show>
        <Styled.AssignModalDialog onClick={(e) => e.stopPropagation()}>
          <Button category={CLOSE_BUTTON} onClick={resetModal} />
          <Styled.ModalHeader>
            <Styled.ModalTitle>
              Reassign question Q
              {question.question_id}
            </Styled.ModalTitle>
          </Styled.ModalHeader>
          <Styled.ModalBody>
            {renderDepartmentSelectBox()}
          </Styled.ModalBody>
          <Styled.ModalFooter>
            <Button
              type="button"
              category={SECONDARY_BUTTON}
              onClick={resetModal}
            >
              Cancel
            </Button>
            <Button
              category={DISABLED_BUTTON}
              value="Submit"
              disabled={!isSubmitEnabled()}
              onClick={onDepartmentAssigned}
            >
              Reassign Question
            </Button>
          </Styled.ModalFooter>
        </Styled.AssignModalDialog>
      </Styled.AssignModal>
    </div>
  );
}

AssignAnswerModal.propTypes = {
  question: PropTypes.shape(),
  onClose: PropTypes.func.isRequired,
};

AssignAnswerModal.defaultProps = {
  question: null,
};

export default AssignAnswerModal;
