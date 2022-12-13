import styled, { css } from 'styled-components';
import { MenuItem, Dropdown } from 'react-bootstrap';

export const UDropdown = styled(Dropdown)`
  background: none;
  box-shadow: none;
  padding: 0;
  .btn-default.active,
  .open > .dropdown-toggle.btn-default,
  .open > .dropdown-toggle.btn-default:hover {
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
    a {
      color: #222;
      line-height: initial;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export const UInfo = styled.div`
  color: black;
  cursor: default;
`;

export const UMenuItem = styled(MenuItem)`
  background: none;
  padding: 0;
  width: auto;
  &:hover {
    background-color: none;
  }
  ${(props) => props.footer && css`
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
