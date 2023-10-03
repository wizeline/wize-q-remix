/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import addTag from 'app/images/ic_add-tag.svg';
import { Pagination } from 'react-bootstrap';

export const TabContainer = styled.div`
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

export const ContainerOptions = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ContainerSelect = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContainerLeft = styled.div`
  float: right;
  cursor: pointer;
  width: 30px;
  heigth: 30px;
`;

export const AddTagButton = styled.img.attrs(() => ({ src: addTag }))`
  width: 100%;
  height: 100%;
`;

export const TagTable = styled.table`
  table-layout: fixed ;
  width: 100% ;
  border-radius: 9px;
  border: 1px solid #f2efed;
`;

export const RowTable = styled.tr`
  padding: 0.5rem 0;
  border: 1px solid #f2efed;
  td {
    padding: 12px;
  }
`;

export const HeaderTable = styled.tr`
  background-color: #f4f7f9;
  padding: 1rem 0;
  th {
    font-size: 1.5rem;
    color: #524f4e;
    margin: 2rem;
    padding: 0 0 0 1rem;
    @media (max-width: 767px) {
      margin: 0;
      padding: 0;
    }
  }
  
  @media (max-width: 481px) {
    th {
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

export const TablePagination = styled(Pagination)`
 background-color: white;  
`;
