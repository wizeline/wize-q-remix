/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components';
import { NavDropdown as BootstrapNavDropdown } from 'react-bootstrap';

export const NavDropdown = styled(BootstrapNavDropdown)`
  background: none;
  box-shadow: none;
  padding: 0;

  .btn-default.active,
  .open > .dropdown-toggle,
  .open > .dropdown-toggle:hover {
    background: none;
    color: #333;
  }
  a {
    box-shadow: none !important;  
  }
  .dropdown-menu {
    border: 1px solid #e1e5e9;
    padding: 0;
    margin-top: 5px;
    width: auto;

    left: auto;
    right: 0;
    box-shadow: 0 6px 12px rgb(0 0 0 / 18%);

    a {
      line-height: 40px !important;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--color-secondary) !important;
      padding: 3px 20px;
      text-align: right;
      display: block;
    }
  }

  .dropdown-toggle::after {
    display: none !important; 
  }
`;

export const UserInfo = styled.div`
  color: black;
  cursor: default;
`;

export const NavDropdownItem = styled(BootstrapNavDropdown.Item)`
  background: none;
  padding: 0;
  width: auto;
  &:hover {
    background-color: none;
  }
  ${props => props.footer && css`
    background-color: #f4f7f9;
    a {
      color: var(--color-secondary) !important;
      font-family: "Nunito", sans-serif;
      font-size: 14px;
      font-weight: 600;
      line-height: 40px !important;
      padding-right: 25px;
      text-align: right;
    }
  `}
`;