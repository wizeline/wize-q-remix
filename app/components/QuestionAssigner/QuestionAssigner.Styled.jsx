/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const QuestionAssigner = styled.div`
  display: inline;
`;

export const Employee = styled.div`
  font-family: "Nunito", sans-serif;
  @media screen and (min-width: 1025px) {
    text-align: center;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    text-align: center;
  }
`;

export const EmployeeTitle = styled.div`
  text-align: center;
  .caret {
    margin-bottom: 2px;
    margin-left: 5px;
  }
`;

export const DepartmentAssigned = styled.div`
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    display: none;
  }
`;

export const JobTitle = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 12px;
`;

export const Department = styled.div`
  text-align: center; 
`;
