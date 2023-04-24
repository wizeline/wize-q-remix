/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const InputSearch = styled.input`
  padding: 8px;
  border-radius: 15px;
  background: #ECECEC;
  border: none;
  width: 100%;
  &:focus {
    border: none;
  }
`;

export const DropdownSearch = styled.div`
  margin: 0;
  padding: 10px;
  border: 1px solid #d1d1d1;
  background-color: white;
  position: absolute;
  width: 200px;
  border-radius: 15px;
}`;
