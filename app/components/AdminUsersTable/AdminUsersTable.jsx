import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useActionData, useSearchParams } from '@remix-run/react';
import { usePagination, DOTS } from 'app/utils/hooks/usePagination';
import Button from 'app/components/Atoms/Button/Button';
import { PRIMARY_BUTTON } from 'app/utils/constants';
import * as Styled from 'app/components/AdminUsersTable/AdminUsersTable.Styled';
import EditUserModal from 'app/components/Modals/EditUserModal/EditUserModal';

function AdminUsersTable({
  users, currentPage, totalPages, size,
}) {
  const [modal, setModal] = useState(false);
  const [currentUser, setCurrenUser] = useState({});
  const quantityRef = useRef(0);

  const paginationRange = usePagination({
    currentPage: (currentPage === 0 ? 1 : currentPage + 1),
    totalPages,
  });

  const [, setSearchParams] = useSearchParams();

  const data = useActionData();

  useEffect(() => {
    if (data && data.successMessage) {
      setModal(false);
    }
  }, [users, data]);

  const handleModal = (u) => {
    if (!modal) {
      setCurrenUser(u);
    }
    setModal(!modal);
  };

  const changePage = (page) => {
    setSearchParams({
      size,
      page,
    });
  };

  const nextPageHandler = () => {
    setSearchParams({
      size,
      page: currentPage + 1,
    });
  };

  const prevPageHandler = () => {
    setSearchParams({
      size,
      page: currentPage - 1,
    });
  };

  const createPaginationItem = (i, idx) => (
    <Styled.TablePagination.Item
      key={idx}
      onClick={() => changePage(i)}
      active={(i) === currentPage}
    >
      {i}
    </Styled.TablePagination.Item>
  );

  const getPaginationItems = () => {
    const item = paginationRange.map((__page, idx) => {
      if (__page === DOTS) {
        // eslint-disable-next-line react/no-array-index-key
        return <Styled.TablePagination.Ellipsis key={idx} />;
      }
      return createPaginationItem(__page, idx);
    });
    return [...item];
  };

  const paginationItems = getPaginationItems();

  const renderHeader = () => (
    <thead>
      <Styled.HeaderTable>
        <th>Name</th>
        <th className="table-desktop-view">Email</th>
        <th className="table-desktop-view">Job Title</th>
        <th className="table-desktop-view">Roles</th>
        <th>Action</th>
      </Styled.HeaderTable>
    </thead>
  );

  const setQTY = (value) => {
    setSearchParams({
      size: value,
      page: currentPage,
    });
  };

  if (!users.length) {
    return (
      <Styled.Alert>
        <span className="message">There are no results to show</span>
      </Styled.Alert>
    );
  }

  return (
    <div>
      <Styled.TableContainer>
        Select the number of results
        <select ref={quantityRef} onChange={(e) => setQTY(e.target.value)} defaultValue={size}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>
        <Styled.UserTable>
          {renderHeader()}
          <tbody>
            {users.map((user) => (
              <Styled.RowTable key={user.employee_id}>
                <td>
                  <div>
                    <img src={user.profile_picture} alt="" />
                    {user.full_name}
                  </div>
                </td>
                <td className="table-desktop-view">{user.email}</td>
                <td className="table-desktop-view">{user.job_title}</td>
                <td className="table-desktop-view">
                  Employee
                  {user.is_admin && ', Admin'}
                </td>
                <td>
                  <Button
                    category={PRIMARY_BUTTON}
                    onClick={() => handleModal(user)}
                    className="row-btn"
                  >
                    Edit roles
                  </Button>
                </td>
              </Styled.RowTable>
            ))}
          </tbody>
        </Styled.UserTable>
        <Styled.PaginationContainer>
          <div>
            Page
            {' '}
            {currentPage}
            {' '}
            of
            {' '}
            {totalPages}
          </div>

          <Styled.TablePagination boundarylinks="true">
            {currentPage > 1 && (
            <Styled.TablePagination.Prev onClick={prevPageHandler} />
            )}
            {paginationItems}

            {currentPage < totalPages && (
            <Styled.TablePagination.Next onClick={nextPageHandler} />
            )}
          </Styled.TablePagination>
        </Styled.PaginationContainer>
        { modal ? (
          <EditUserModal
            user={currentUser}
            onClose={() => handleModal()}
          />
        ) : null}
      </Styled.TableContainer>
    </div>
  );
}

AdminUsersTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape(),
  ),
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
};

AdminUsersTable.defaultProps = {
  users: [],
};

export default AdminUsersTable;
