import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import { usePagination, DOTS } from 'app/utils/hooks/usePagination';
import AddEditTagModal from '../Modals/AddEditTagModal';
import * as styled from './AdminTags.styled';

function AdminTags({
  tags, currentPage, totalPages, size,
}) {
  const quantityRef = useRef();
  const [showModal, setShowModal] = useState(false);
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

  const createPaginationItem = (i, idx) => (
    <styled.TablePagination.Item
      key={idx}
      onClick={() => changePage(i)}
      active={(i) === currentPage}
    >
      {i}
    </styled.TablePagination.Item>
  );

  const getPaginationItems = () => {
    const item = paginationRange.map((__page, idx) => {
      if (__page === DOTS) {
        // eslint-disable-next-line react/no-array-index-key
        return <styled.TablePagination.Ellipsis key={idx} />;
      }
      return createPaginationItem(__page, idx);
    });
    return [...item];
  };

  const paginationItems = getPaginationItems();

  const prevPageHandler = () => {
    setSearchParams({
      size,
      page: currentPage - 1,
    });
  };

  const setValues = (value) => {
    setSearchParams({
      size: value,
      page: currentPage,
    });
  };

  return (
    <div>
      <styled.TabContainer>
        Select the number of results
        <select
          ref={quantityRef}
          onChange={(e) => { setValues(e.target.value); }}
          defaultValue={10}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>
        <styled.TagTable style={{ width: '100%' }}>
          <thead>
            <styled.HeaderTable>
              <th>Tag</th>
              <th>
                <styled.ContainerLeft
                  onClick={() => { setShowModal(true); }}
                >
                  <styled.AddTagButton />
                </styled.ContainerLeft>
              </th>
            </styled.HeaderTable>
          </thead>
          <tbody>
            {tags.map((tag) => (
              <styled.RowTable key={tag.tag_id}>
                <td>{tag.tag_text}</td>
              </styled.RowTable>
            ))}
          </tbody>
        </styled.TagTable>
        <styled.PaginationContainer>
          <div>
            Page
            {' '}
            {currentPage}
            {' '}
            of
            {' '}
            {totalPages}
          </div>

          <styled.TablePagination boundarylinks="true">
            {currentPage > 1 && (
            <styled.TablePagination.Prev onClick={prevPageHandler} />
            )}
            {paginationItems}

            {currentPage < totalPages && (
            <styled.TablePagination.Next onClick={nextPageHandler} />
            )}
          </styled.TablePagination>
        </styled.PaginationContainer>
      </styled.TabContainer>
      {showModal && <AddEditTagModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

AdminTags.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
};

export default AdminTags;
