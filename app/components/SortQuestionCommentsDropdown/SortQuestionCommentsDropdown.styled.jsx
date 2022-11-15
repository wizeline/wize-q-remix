import styled from 'styled-components';

export const Main = styled.div`
    font-family: sans-serif;
    background: #f0f0f0;
`;

export const DropDownContainer = styled.div`
    margin: 0;
    position: relative;
`;

export const DropDownHeader = styled.div`
    font-weight: 700;
    font-size: 1.3rem;
    color: #3faffa;
    cursor: pointer;
    display: flex;
    align-items:center;
`;

export const DropDownListContainer = styled.div`
    right: 0;
    position: absolute;
    width: 10em;
    z-index: 999;
`;

export const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: black;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

export const ListItem = styled.li`
  list-style: none;
  margin-bottom: 0.8em;
  :hover {
    color: #3faffa;
    cursor: pointer;
  }  
`;
