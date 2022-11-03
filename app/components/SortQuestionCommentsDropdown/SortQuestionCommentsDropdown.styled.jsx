import styled from 'styled-components';

export const Main = styled.div`
    font-family: sans-serif;
    background: #f0f0f0;
`;

export const DropDownContainer = styled.div`
    width: 10em;
    margin: 0;
    position: relative;
`;

export const DropDownHeader = styled.div`
    margin-bottom: 0.2em;
    padding: 0.4em 2em 0.4em 1em;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
    font-weight: 500;
    font-size: 1.3rem;
    color: #3faffa;
    background: #ffffff;
    cursor: pointer;
`;

export const DropDownListContainer = styled.div`
    position: absolute;
    width: 100%;
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
