import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Form, useSubmit } from '@remix-run/react';
import * as S from 'app/components/Modals/EditUserModal/EditUserModal.Styled';
import { PRIMARY_BUTTON, SECONDARY_BUTTON } from 'app/utils/constants';
import UserImage from 'app/components/Atoms/UserImage/UserImage';
import Button from 'app/components/Atoms/Button';
import ACTIONS from 'app/utils/actions';

function EditUserModal({ user, onClose }) {
  const formRef = useRef();
  const submit = useSubmit();
  const [uAdmin, setUAdmin] = useState(user.is_admin);
  const [uJobTitle, setUJobTitle] = useState(user.job_title);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(formRef.current);
    data.set('action', ACTIONS.UPDATE_USER);
    submit(data, { method: 'post', action: '/admin', replace: true });
  };

  return (
    <S.Wrapper>
      <Form onSubmit={onSubmit} ref={formRef}>
        <S.Container>
          <S.User>
            <UserImage src={user.profile_picture} size="extra big" />
            <S.UserInfo>
              <h2>{user.full_name}</h2>
              <span><b>{user.job_title !== null ? user.job_title : ''}</b></span>
              <span>{user.email}</span>
            </S.UserInfo>
          </S.User>
          <S.Roles>
            <h3>Roles</h3>
            <span>Edit roles for this user</span>
            <S.RolesTable>
              <S.TableRow noBorder>
                <li><b>Name</b></li>
                <li><b>Action</b></li>
              </S.TableRow>
              <S.TableRow>
                <li>Job Title</li>
                <li><input name="job_title" type="text" value={uJobTitle} onChange={(e) => { setUJobTitle(e.target.value); }} /></li>
              </S.TableRow>
              <S.TableRow>
                <li>Role Title</li>
                <li>
                  Employee
                  {user.is_admin && ', Admin'}
                </li>
              </S.TableRow>
              <S.TableRow>
                <li>Admin</li>
                <li><input name="is_admin" type="checkbox" checked={uAdmin} onChange={(e) => { setUAdmin(e.target.checked); }} disabled={user.is_admin} /></li>
              </S.TableRow>
            </S.RolesTable>
            <S.ButtonContainer>
              <Button category={SECONDARY_BUTTON} onClick={onClose}>
                Cancel
              </Button>
              <Button
                category={PRIMARY_BUTTON}
                type="submit"
              >
                Save
              </Button>
            </S.ButtonContainer>
          </S.Roles>
        </S.Container>
        <input type="hidden" name="employee_id" value={user.employee_id} />
      </Form>
    </S.Wrapper>
  );
}

EditUserModal.propTypes = {
  user: PropTypes.shape({
    employee_id: PropTypes.number,
    full_name: PropTypes.string,
    email: PropTypes.string,
    job_title: PropTypes.string,
    is_admin: PropTypes.bool,
    profile_picture: PropTypes.node,
    departments: PropTypes.shape([]),
  }),
  onClose: PropTypes.func,
};

EditUserModal.defaultProps = {
  user: {
    employee_id: '',
    full_name: '',
    email: '',
    job_title: '',
    is_admin: false,
  },
  onClose: () => { },
};

export default EditUserModal;
