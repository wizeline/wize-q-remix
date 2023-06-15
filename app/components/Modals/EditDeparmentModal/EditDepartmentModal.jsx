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
  const [currentSubstitute, setCurrentSubstitute] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [showSubstitute, setShowSubstitute] = useState(false);

  const {
    department_id, name, is_active, ManagerDepartmet, AlternateManager,
  } = department;

  useEffect(() => {
    setIsActive(is_active);
    if (ManagerDepartmet && ManagerDepartmet.full_name !== undefined) {
      const managerInput = document.getElementById('search-id');
      managerInput.value = ManagerDepartmet.full_name;
      setCurrentUser(ManagerDepartmet);
    }
    if (AlternateManager && AlternateManager.full_name !== undefined) {
      const substituteInput = document.getElementById('search-substitute');
      substituteInput.value = AlternateManager.full_name;
      setCurrentSubstitute(AlternateManager);
    }
  }, []);

  const sendQuery = (searchValue) => {
    fetcher.load(`/?userSearch=${searchValue}`);
  };

  const delayedQuery = useCallback(debounce((value) => sendQuery(value), 400), []);

  const onChange = (e) => {
    if (e.target.value === '') {
      if (e.target.id === 'search-id') setCurrentUser({});
      if (e.target.id === 'search-substitute') setCurrentSubstitute({});
      return;
    }
    if (e.target.id === 'search-id') setShowDropdown(e.target.value !== '');
    if (e.target.id === 'search-substitute') setShowSubstitute(e.target.value !== '');
    delayedQuery(e.target.value);
  };

  const onDropdownClick = (elementId, user) => {
    const element = document.getElementById(elementId);
    element.value = user.full_name;
    switch (elementId) {
      case 'search-id':
        setCurrentUser(user);
        setShowDropdown(false);
        break;
      case 'search-substitute':
        setCurrentSubstitute(user);
        setShowSubstitute(false);
        break;
      default:
        setShowDropdown(false);
        setShowSubstitute(false);
        break;
    }
  };

  const onHandlerClick = (user) => {
    onDropdownClick('search-id', user);
  };

  const onHandlerClickSubstitute = (user) => {
    onDropdownClick('search-substitute', user);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.set('action', ACTIONS.UPDATE_DEPARTMENT);
    data.set('department_id', department_id);
    data.set('is_active', isActive);
    data.set('name', name);
    data.set('ManagerDepartmet', JSON.stringify(currentUser));
    data.set('AlternateManager', JSON.stringify(currentSubstitute));

    submit(data, { method: 'post', action: '/admin', replace: true });

    onClose();
  };

  const onChecked = (e) => {
    setIsActive(e.target.checked);
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
                <li>
                  <input
                    name="is_admin"
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => { onChecked(e); }}
                  />

                </li>
              </S.TableRow>
              <S.TableRow>
                <li>
                  <b>Manager:</b>
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
              <S.TableRow>
                <li>
                  <b>Substitute : (manager)</b>
                  {' '}
                </li>
                <li>
                  <SearchDropdown
                    keyValue="full_name"
                    inputId="search-substitute"
                    onChange={(e) => { onChange(e); }}
                    data={buildData()}
                    showDropdown={showSubstitute}
                    onDropdownClick={onHandlerClickSubstitute}
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
    AlternateManager: PropTypes.shape({
      full_name: PropTypes.string,
    }),
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
    AlternateManager: {
      full_name: '',
    },
  },
};

export default EditDepartmentModal;
