import styled from 'styled-components';
import { Navbar, Button } from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';

export const AppNav = styled(Navbar).attrs(props => ({
  fluid: true,
}))` 
  background-color: #203449;
  border-color: white;
  border-radius: 0;
  margin-bottom: 0;
  padding: 5px;
  width: 100%;
  .dropdown.btn-group {
    float: left;
    margin-left: 30px;
  }
`;

export const ButtonBootstrap = styled(Button)`
  display: none;
  border: 1px solid transparent;
  border-radius: 25px;
  position: absolute;
  right: 65px;
  top: 8px;
  &:hover,
  &.hover {
    background-color: #ddd;
    border: 1px solid transparent;
  }
  &:focus,
  &.focus {
    background-color: #ddd;
    border: 1px solid transparent;
  }
  &:active:hover,
  &:active:focus {
    background-color: #ddd;
    border: 1px solid transparent;
    color: transparent;
  }
  @media (max-width: 768px) {
    display: block;
  }
`;

export const SearchBarNavContainer = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    width: 100%;
  }
`;

export const IconWrapper = styled.div`
  width: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchIcon = styled(AiOutlineSearch)`
  font-size: 30px;
  color: rgba(78, 81, 84, 0.65);
`;