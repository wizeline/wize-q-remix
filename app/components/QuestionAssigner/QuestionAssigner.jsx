import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaBuilding } from 'react-icons/fa';
import * as S from './QuestionAssigner.Styled';
import DropdownTitle from '../DropdownTitle';
import { NOT_ASSIGNED_DEPARTMENT_ID } from '../../utils/constants';

function QuestionAssigner({
  department,
  onSelectDepartment,
  departments,
}) {
  const initialState = {
    noDepartmentSelected: {
      name: 'I don\'t know whom to assign it.',
      department_id: NOT_ASSIGNED_DEPARTMENT_ID,
    },
  };

  const renderDepartmentOptions = () => {
    const options = departments.map((dep) => (
      <MenuItem eventKey={dep} key={dep.department_id}>
        {dep.name}
      </MenuItem>
    ));
    return options;
  };

  const { noDepartmentSelected } = initialState;

  return (
    <S.QuestionAssigner>
      <S.Department>
        <DropdownButton
          bsStyle="default"
          title={(
            <DropdownTitle title={department.name} type="Department">
              <FaBuilding color={department.name ? 'white' : 'black'} />
            </DropdownTitle>
          )}
          className="question-input-dropdown"
          noCaret
          onSelect={onSelectDepartment}
          id="department-dropdown-btn"
        >
          <MenuItem eventKey={noDepartmentSelected}>
            {noDepartmentSelected.name}
          </MenuItem>
          {renderDepartmentOptions()}
        </DropdownButton>
      </S.Department>
    </S.QuestionAssigner>
  );
}

QuestionAssigner.propTypes = {
  onSelectDepartment: PropTypes.func.isRequired,
  department: PropTypes.shape({
    name: PropTypes.string.isRequired,
    department_id: PropTypes.number.isRequired,
  }).isRequired,
  departments: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
};

export default QuestionAssigner;
