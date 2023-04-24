/* eslint-disable camelcase */
import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import * as S from 'app/components/Modals/AssignedUserToDeparmentModal/AssinedUserToDeparmentModal.styled';
import { Form, useFetcher } from '@remix-run/react';
import Button from 'app/components/Atoms/Button';
import { SECONDARY_BUTTON } from 'app/utils/constants';
import { IoPersonAdd, IoTrash } from 'react-icons/io5';
import SearchDropdown from 'app/components/SearchDropdown/SearchDropdown';
import ACTIONS from 'app/utils/actions';

function AssignedUserToDeparmentModal({ department, onClose }) {
  const fetcher = useFetcher();
  const [employeesyDepartment, setEmployeesyDepartment] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employeeToAdd, setEmployeeToaAdd] = useState({});
  const { department_id, name, ManagerDepartmet } = department;

  const fetchEmployees = async () => {
    if (department_id) {
      fetcher.load(`/employees/getByDeparment/${parseInt(department_id, 10)}`);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.employees !== undefined) {
        setEmployeesyDepartment(fetcher.data.employees);
      }
      if (fetcher.data.searchUsers !== undefined) {
        setEmployees(fetcher.data.searchUsers.filter(
          (element) => employeesyDepartment.map((e) => e.id).indexOf(element.employee_id) < 0,
        ));
      }
    }
  }, [fetcher.data]);

  const isManager = (employee_id) => {
    if (ManagerDepartmet && ManagerDepartmet.employee_id !== undefined) {
      return parseInt(employee_id, 10) === parseInt(ManagerDepartmet.employee_id, 10);
    }
    return false;
  };

  const getElement = (id) => {
    const element = document.getElementById(id);
    return element;
  };

  const removeEmployee = (id) => {
    const data = new FormData();
    data.set('action', ACTIONS.REMOVE_EMPLOYEE_TO_DEPARTMENT);
    const values = {
      employeeId: id, departmentId: department_id,
    };
    data.set('values', JSON.stringify(values));
    fetcher.submit(data, { method: 'post', action: '/admin' });
    fetchEmployees();
  };

  const delayedQuery = useCallback(debounce((value) => fetcher.load(`/?userSearch=${value}`), 400), []);

  const onChange = (e) => {
    setShowDropdown(e.target.value !== '');
    delayedQuery(e.target.value);
  };

  const onHandlerClick = (value) => {
    setEmployeeToaAdd(value);
    getElement('search-id-user').value = value.full_name;
    setShowDropdown(false);
  };

  const onClear = () => {
    getElement('search-id-user').value = '';
  };

  const addEmployee = () => {
    onClear();
    const data = new FormData();
    data.set('action', ACTIONS.ADD_EMPLOYEE_TO_DEPARTMENT);
    const values = {
      departmentId: department_id,
      employeeId: employeeToAdd.employee_id,
      email: employeeToAdd.email,
    };
    data.set('values', JSON.stringify(values));
    fetcher.submit(data, { method: 'post', action: '/admin' });
    fetchEmployees();
  };

  return (
    <S.Wrapper>
      {/* wrapper */}
      <Form>
        <S.Container>
          {/* container */}
          <S.ModalContainer>
            {/* modal header */}
            <h3>
              {' '}
              {name}
            </h3>
            <div>
              {' '}
              Admin:
              {' '}
              {(ManagerDepartmet && ManagerDepartmet.full_name !== undefined)
            && ManagerDepartmet.full_name}
              {' '}
            </div>
            <S.ModalBody>
              <div>
                <S.TableRow>
                  <SearchDropdown
                    keyValue="full_name"
                    inputId="search-id-user"
                    onChange={(e) => { onChange(e); }}
                    data={employees}
                    showDropdown={showDropdown}
                    onDropdownClick={onHandlerClick}
                  />
                  <S.TableRow>
                    <div onClick={addEmployee}>
                      <IoPersonAdd />
                    </div>
                  </S.TableRow>
                </S.TableRow>
                {employeesyDepartment.map(({ id, name: full_name }) => (
                  <S.TableRow>
                    <li>
                      {full_name}
                      {isManager(id) && ' - manager '}
                    </li>

                    <li>
                      <div onClick={() => { removeEmployee(id); }}><IoTrash /></div>
                    </li>
                  </S.TableRow>
                ))}
              </div>
            </S.ModalBody>
          </S.ModalContainer>
          <S.ButtonContainer>
            <Button category={SECONDARY_BUTTON} onClick={onClose}>Close</Button>
          </S.ButtonContainer>
        </S.Container>
      </Form>
    </S.Wrapper>
  );
}

AssignedUserToDeparmentModal.propTypes = {
  department: PropTypes.shape({
    department_id: PropTypes.number,
    name: PropTypes.string,
    ManagerDepartmet: PropTypes.shape(
      {
        employee_id: PropTypes.number,
        full_name: PropTypes.string,
      },
    ),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AssignedUserToDeparmentModal;
