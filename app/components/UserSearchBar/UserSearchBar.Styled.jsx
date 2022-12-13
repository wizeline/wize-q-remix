/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';

export const SearchField = styled.div`
  align-items: center;
  display: flex;
  background-color: #fff;
  border: 1px solid #d3d3d4;
  border-radius: 20px;
  height: 40px;
  justify-content: center;
  max-width: 270px;
  position: relative;
  width: 100%;
  transition: all 0.5s ease;
`;

export const IconWrapper = styled.div`
  left: 10px;
  top: auto;
  width: 22px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.input`
  background-color: transparent;
  border: none;
  font-size: 14px;
  height: 100%;
  padding: 0 40px;
  width: 100%;
  &:focus {
    outline: none;
  }
  ::placeholder,
  ::-webkit-input-placeholder {
    color: rgba(78, 81, 84, 0.65);
    font-family: "Nunito", sans-serif;
  }
`;

export const SearchIcon = styled(AiOutlineSearch)`
  font-size: 30px;
  color: rgba(78, 81, 84, 0.65);
`;

export const ClearIcon = styled(MdClose)`
  font-size: 28px;
  color: rgba(78, 81, 84, 0.65);
  padding: 5px;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: #fff;
  }
`;
