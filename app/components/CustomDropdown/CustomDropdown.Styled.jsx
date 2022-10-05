import styled from 'styled-components';
import { Dropdown, MenuItem } from 'react-bootstrap';

export const CDropdown = styled(Dropdown)`
  .dropdown-menu {
    top: 98%;
  }
  .dropdown-menu > .sub-menu-item > a {
    line-height: 20px;
    padding: 5px;
  }
  .dropdown-menu a {
    text-decoration: none;
  }
  .dropdown-menu li {
    height: auto;
  }
  .custom-dropdown input {
    display: none;
  }
  .custom-dropdown input:checked ~ .custom-dropdown--span {
    background-color: white;
  }
  .custom-dropdown--span::after {
    content: "";
    display: none;
    position: absolute;
  }
  .custom-dropdown input:checked ~ .custom-dropdown--span::after {
    display: block;
  }
  .custom-dropdown .custom-dropdown--span::after {
    background-color: var(--color-secondary);
    border-radius: 50%;
    height: 12px;
    left: 1px;
    top: 1px;
    width: 12px;
  }
  .custom-dropdown-selected {
    color: var(--color-secondary);
    font-size: 14px;
    font-weight: 600;
    margin: 0 5px;
  }
  .toggle {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .toogle > .caret {
    position: absolute;
  }
  .dropdown-text {
    color: var(--color-secondary);
    float: left;
    font-size: 12px;
    padding-left: 5px;
  }
  .dropdown-text.first {
    font-size: 14px;
    font-weight: unset;
  }
`;

export const CDropdownText = styled.p`
  color: var(--color-secondary);
  float: left;
  font-size: 12px;
  padding-left: 5px;
  .first {
    font-size: 14px;
    font-weight: unset;
  }
`;

export const CMenuItem = styled(MenuItem)`
  .custom-dropdown {
    cursor: pointer;
    display: block;
    font-size: 14px;
    margin: 0;
    padding: 6px 0 6px 25px;
    position: relative;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }
  .custom-dropdown--span {
    background-color: #fff;
    border: 1px solid var(--color-secondary);
    border-radius: 50%;
    height: 16px;
    left: 0;
    margin-top: 4px;
    position: absolute;
    top: 10%;
    width: 16px;
    &:after {
      content: "";
    display: none;
    position: absolute;
    }
  }
`;
