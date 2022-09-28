import styled from 'styled-components';
import { DropdownButton, Pagination } from 'react-bootstrap';

export const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 2rem auto;
  width: 90vw;
  select {
    width: 10rem;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #d3d3d4;
    border-radius: 15px;
    padding: 1px 4px;
    margin: 1rem 0;
    &:focus {
      outline: none;
    }
  }
`;

export const UserTable = styled.table`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 2rem auto;
  border-radius: 9px;
  border: 1px solid #f2efed;
  tr {
    justify-content: space-between;
  }
  @media (max-width: 481px) {
    .table-desktop-view {
      display: none;
    }
  }
`;

export const RowTable = styled.tr`
  padding: 0.5rem 0;
  border: 1px solid #f2efed;
  .row-btn {
    margin: 0;
  }
  td {
    min-width: 18vw;
    max-width: 18.01vw;
    text-align: left;
    padding: 0 0.8rem;
    overflow-wrap: break-word;
    div {
      margin: 0.3 auto;
      display: flex;
      align-items: center;
    }
  }
  img {
    margin: 0.8rem;
    width: 2.5rem;
    border-radius: 50%;
  }
  @media (max-width: 767px) {
    td {
      min-width: 17.5vw;
      max-width: 17.51vw;
      text-align: left;
      padding: 0 0.8rem;
      overflow-wrap: break-word;
    }
    div {
      margin: 0.3 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    img {
      margin: 0.3rem;
      width: 2rem;
    }
  }
  @media (max-width: 481px) {
    .table-desktop-view {
      display: none;
    }
    td {
      min-width: 45.5vw;
      max-width: 45.51vw;
      text-align: left;
      padding: 0 0.8rem;
      overflow-wrap: break-word;
    }
    div {
      flex-direction: row;
    }
  }
`;

export const HeaderTable = styled.tr`
  background-color: #f4f7f9;
  padding: 1rem 0;
  th {
    font-size: 1.5rem;
    min-width: 18vw;
    max-width: 18.01vw;
    color: #524f4e;
    margin: 2rem;
    padding: 0 0 0 1rem;
    @media (max-width: 767px) {
      margin: 0;
      padding: 0;
    }
  }
  .button-header{
    padding: 0.5rem 0 0 0;
  }
  
  @media (max-width: 481px) {
    th {
      min-width: 45.5vw;
      max-width: 45.51vw;
      text-align: left;
      padding: 0 0.8rem;
      overflow-wrap: break-word;
    }
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem auto;
  padding: 1.5rem 0;
  width: 90vw;
  align-items: center;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

export const FilterDropdown = styled(DropdownButton)`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: #524f4e;
  align-items: center;
  :hover {
    background: transparent;
  }
`;

export const TablePagination = styled(Pagination)`
 background-color: white;  
`;

export const Alert = styled.div`
  display: flex;
  color: var(--color-secondary-active);
  align-items: center;
  background-color: var(--color-secondary-light);
  border-radius: 10px;
  font-family: "Nunito";
  font-size: 16px;
  min-height: 50px;
  margin: 15px auto;
  padding: 6px 16px;
  justify-content: center;
  width: 50vw;
  .message {
    padding: 8px 15px;
  }
  @media (max-width: 576px) {
    width: 90vw;
  }
`;