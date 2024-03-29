/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
`;

export const Container = styled.div`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  border-radius: 15px;
  background-color: white;
  max-width: 500px;
  width: calc(100% - 40px);
  margin: 20px;
  padding: 15px 0;
  h2 {
    margin: 0;
  }
  h3 {
    margin: 15px 0;
  }
  span {
    margin: 6px 0;
  }
`;

export const Roles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 15px 25px;
`;

export const RolesTable = styled.div`
  border-radius: 15px;
  border: 1px solid #d8d8d8;
  margin: 10px 0 0;
`;

export const TableRow = styled.ul`
  border-top: ${(props) => (props.noBorder ? 'none' : '1px solid #d8d8d8')};
  list-style: none;
  margin: 0;
  padding: 15px;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  li {
    max-width: 50%;
    width: 250px;
  }
  input[type="text"] {
    max-width: calc(100% - 4px);
    padding: 5px 2px;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  button {
    margin-left: 10px;
  }
  @media (max-width: 576px) {
    justify-content: center;
  }
`;

export const InputSearch = styled.input`
  padding: 8px;
  border-radius: 15px;
  background: #ECECEC;
  border: none;
  
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
