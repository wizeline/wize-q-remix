/* eslint-disable camelcase */
import React, {
  useState, useCallback, useEffect,
} from 'react';
import { debounce } from 'lodash';
import { Form, useFetcher, useSubmit } from '@remix-run/react';
import PropTypes from 'prop-types';
import { PRIMARY_BUTTON, SECONDARY_BUTTON } from 'app/utils/constants';
import * as S from 'app/components/Modals/EditDeparmentModal/EditDepartmentModal.Styled';
import Button from 'app/components/Atoms/Button';
import ACTIONS from 'app/utils/actions';
import SearchDropdown from 'app/components/SearchDropdown/SearchDropdown';

function EditDepartmentModal({ department, onClose }) {
  const fetcher = useFetcher();
  const submit = useSubmit();
  const [currentUser, setCurrentUser] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);

  const {
    department_id, name, is_active, ManagerDepartmet,
  } = department;

  useEffect(() => {
    if (ManagerDepartmet && ManagerDepartmet.full_name !== undefined) {
      const element = document.getElementById('search-id');
      element.value = ManagerDepartmet.full_name;
    }
  }, []);

  useEffect(() => {
    if (fetcher.data && fetcher.data.searchUsers !== undefined) {
      setShowDropdown(fetcher.data.searchUsers.length > 0);
    }
  }, [fetcher.data]);

  const sendQuery = (searchValue) => {
    fetcher.load(`/?userSearch=${searchValue}`);
  };

  const delayedQuery = useCallback(debounce((value) => sendQuery(value), 400), []);

  const onChange = (e) => {
    setShowDropdown(e.target.value !== '');
    delayedQuery(e.target.value);
  };

  const onHandlerClick = (value) => {
    const element = document.getElementById('search-id');
    element.value = value.full_name;
    setCurrentUser(value);
    setShowDropdown(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.set('action', ACTIONS.UPDATE_DEPARTMENT);
    data.set('department_id', department_id);
    data.set('name', name);
    data.set('ManagerDepartmet', JSON.stringify(currentUser));

    submit(data, { method: 'post', action: '/admin', replace: true });

    onClose();
  };

  const buildData = () => {
    if (fetcher.data && fetcher.data.searchUsers !== undefined) return fetcher.data.searchUsers;
    return [];
  };

  return (
    <S.Wrapper>
      <Form>
        <S.Container>
          <S.Roles>
            <h3>
              {name}
            </h3>
            <S.RolesTable>
              <S.TableRow>
                <li><b>Deparment:</b></li>
                <li>{name}</li>
              </S.TableRow>
              <S.TableRow>
                <li><b> Active: </b></li>
                <li><input name="is_admin" type="checkbox" checked={is_active} /></li>
              </S.TableRow>
              <S.TableRow>
                <li>
                  <b>User:</b>
                  {' '}
                </li>
                <li>
                  <SearchDropdown
                    keyValue="full_name"
                    inputId="search-id"
                    onChange={(e) => { onChange(e); }}
                    data={buildData()}
                    showDropdown={showDropdown}
                    onDropdownClick={onHandlerClick}
                  />
                </li>
              </S.TableRow>
            </S.RolesTable>
            <S.ButtonContainer>
              <Button category={SECONDARY_BUTTON} onClick={onClose}>Cancel</Button>
              <Button category={PRIMARY_BUTTON} onClick={onSubmit}> Save </Button>
            </S.ButtonContainer>
          </S.Roles>
        </S.Container>
      </Form>
    </S.Wrapper>
  );
}

EditDepartmentModal.propTypes = {
  department: PropTypes.shape({
    department_id: PropTypes.number,
    name: PropTypes.string,
    is_active: PropTypes.bool,
    ManagerDepartmet: PropTypes.shape(
      {
        full_name: PropTypes.string,
      },
    ),
  }),
  onClose: PropTypes.func.isRequired,

};

EditDepartmentModal.defaultProps = {
  department: {
    department_id: undefined,
    name: '',
    is_active: true,
    ManagerDepartmet: {
      full_name: '',
    },
  },
};

export default EditDepartmentModal;
