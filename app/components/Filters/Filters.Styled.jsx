import styled, { css } from 'styled-components';


export const Filters = styled.div`
  background-color: #f4f7f9;
  margin: 0 11px;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  @media (min-width: 768px) and (max-width: 1024px) {
    margin: 0 auto;
    max-width: 592px;
    padding: 20px 0 5px;
    position: relative;
  }
  @media (max-width: 767px) {
    margin: 0 auto;
    max-width: 592px;
    padding: 20px 0 5px;
    position: relative;
  }
`;

export const Icon = styled.img`
  height: 20px;
  margin-right: 10px;
  width: 17px;
`;

export const FiltersLine = styled.hr`
  border-top: 1px solid #e6e6e6;
  margin: 16px 0 24px;
  display: ${props => props.visibility};
  ${props => props.secondary && css`
    margin: 0;
  `}
  
  @media (min-width: 768px) and (max-width: 1024px) {
    display: block;
  }
  @media (max-width: 767px){
   display: block;
  }
`;

export const FiltersWrapper = styled.div`
  flex-grow: 1;
  transition: box-shadow 300ms;
  width: 100%;
  @media (min-width: 768px) and (max-width: 1024px) {
      display: ${props => props.hideComponent};
      margin: 0 auto;
      padding: 10px 0;
      width: 248px;
  }
  @media (max-width: 767px) {
      display: ${props => props.hideComponent};
      margin: 0 auto;
      padding: 10px 0;
      width: 248px;
  }
  #sort-toggle.dropdown-toggle.btn {
    background: #fff;
    border: none;
    font-size: 14px;
    height: 56px;
    width: 100%;
    &:hover {
      background-color: #ecf7ff;
    }
  }
`;

export const FiltersContainer = styled.div`
  display: unset;
`;

export const FiltersBlock = styled.div``;

export const FiltersLabel = styled.div`
  font-size: 12px;
  margin: 8px 0 4px;
  width: auto;
  a {
    color: var(--color-secondary);
    float: right;
    font-size: 12px;
    text-decoration: none;
  }
`;

export const FiltersField = styled.div`
  border-color: transparent;
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  .sort-toggle.dropdown {
    border: 1px solid #e1e5e9;
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 rgba(225, 229, 233, 0.8);
    margin: 8px 0;
    width: 100%;
  }
  .caret {
    color: var(--color-secondary);
    font-size: 50px;
    position: absolute;
    right: 24px;
    top: 48%;
  }
  .sort-toggle.dropdown.open .caret {
    -moz-transform: scale(1, -1);
    -ms-transform: scale(1, -1);
    -o-transform: scale(1, -1);
    -webkit-transform: scale(1, -1);
    transform: scale(1, -1);
  }
  .dropdown .menu-dropdown {
    box-shadow: none;
    margin: 0;
    min-width: 100%;
    width: 100%;
  }
  .dropdown.open .menu-dropdown {
    border: none;
    box-shadow: 0 3px 6px 0 rgba(225, 229, 233, 0.8);
    display: inline-table;
    padding: 5px 0 8.9px;
    position: unset;
  }
  .dropdown.open .menu-dropdown {
    border: none;
    box-shadow: 0 3px 6px 0 rgba(225, 229, 233, 0.8);
    display: inline-table;
    padding: 5px 0 8.9px;
    position: unset;
  }
  ${props =>
    props.departments &&
    css`
      .dropdown-menu li:nth-child(2) a label {
        border-bottom: 1px solid #e6e6e6;
        padding-bottom: 12px;
      }
    `}
`;