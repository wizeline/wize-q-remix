import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import EditDepartmentModal from 'app/components/Modals/EditDeparmentModal';
import AssignedUserToDeparmentModal from 'app/components/Modals/AssignedUserToDeparmentModal';
import * as Styled from 'app/components/AdminDepartments/AdminDepartments.styled';
import { useSearchParams } from 'react-router-dom';
import { usePagination, DOTS } from 'app/utils/hooks/usePagination';
import { TbEdit, TbUsers } from 'react-icons/tb';

function AdminDepartments({
  departments, currentPage, totalPages, isLoading, size,
}) {
  const quantityRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [showModalUser, setShowModalUser] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState({});
  const [, setSearchParams] = useSearchParams();

  const paginationRange = usePagination({
    currentPage: (currentPage === 0 ? 1 : currentPage + 1),
    totalPages,
  });

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

  const handleModal = (deparment) => {
    if (!showModal) {
      setCurrentDepartment(deparment);
    }
    setShowModal(!showModal);
  };

  const handleModalUsers = (department) => {
    if (!showModalUser) {
      setCurrentDepartment(department);
    }
    setShowModalUser(!showModalUser);
  };

  const renderModal = () => {
    if (showModal) {
      return (
        <EditDepartmentModal
          department={currentDepartment}
          onClose={() => handleModal()}
        />
      );
    }
    if (showModalUser) {
      return (
        <AssignedUserToDeparmentModal
          department={currentDepartment}
          onClose={() => handleModalUsers()}
        />
      );
    }
    return null;
  };

  const setValues = (value) => {
    setSearchParams({
      size: value,
      page: currentPage,
    });
  };

  return (
    <div>
      <Styled.TableContainer>
        Select the number of results
        <select
          ref={quantityRef}
          onChange={(e) => { setValues(e.target.value); }}
          defaultValue={size}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>

        <Styled.DepartmentTable>
          <thead>
            <Styled.HeaderTable>
              <th> Department</th>
              <th> Manager</th>
              <th> Action </th>
            </Styled.HeaderTable>
          </thead>
          <tbody>
            {departments.map((deparment) => (
              <Styled.RowTable>
                <td>{deparment.name}</td>
                <td>
                  {' '}
                  {(deparment.ManagerDepartmet && deparment.ManagerDepartmet.full_name !== undefined) ? deparment.ManagerDepartmet.full_name : ''}
                  {' '}
                </td>
                <td>
                  <div style={{ display: 'flex', color: '#4F5D70' }}>
                    <div
                      style={{ padding: '10px' }}
                      onClick={() => {
                        handleModal(deparment);
                      }}
                    >
                      <TbEdit />
                    </div>
                    <div
                      style={{ padding: '10px' }}
                      onClick={() => { handleModalUsers(deparment); }}
                    >
                      <TbUsers />
                    </div>
                  </div>
                </td>
              </Styled.RowTable>
            ))}
          </tbody>
        </Styled.DepartmentTable>

        {!isLoading && (
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
        )}

        {renderModal()}
      </Styled.TableContainer>
    </div>
  );
}

AdminDepartments.propTypes = {
  departments: PropTypes.arrayOf(PropTypes.shape()),
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired,
};

AdminDepartments.defaultProps = {
  departments: [],
};

export default AdminDepartments;
