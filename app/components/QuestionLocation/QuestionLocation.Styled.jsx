import styled from 'styled-components';

export const QuestionLocationWrapper = styled.div`
  display: inline;
  @media screen and (min-width: 1025px){
    text-align: left;
    width: 35px;
    margin-right: 7px;
    .dropdown-menu {
      right: 0;
      left: auto;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 1024px){
    width: 33.3%;
    .dropdown-menu {
      right: 0;
      left: auto;
    }
  }
`;
