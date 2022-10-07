import styled, { css } from 'styled-components';


export const QuestionerResponderContainer = styled.div`
  align-items: center;
  color: var(--color-dark-50);
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  div {
    align-items: flex-start;
    display: inline-flex; 
    flex-direction: column;
    justify-content: center;
  }
`;

export const QuestionerResponderInfoContainer = styled.div`
  font-family: "Nunito", sans-serif;
  font-size: 12px;
  margin-left: 8px;
`;

export const QuestionResponderDepartment = styled.div`
  align-self: flex-start;
  border-radius: 20px;
  border: 2px solid var(--color-secondary);
  color: var(--color-secondary);
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  line-height: normal;
  margin-top: 5px;
  padding: 6px 8px 4px;
  ${props => props.department === 'Not Assigned' && css`
    border: 2px solid var(--color-secondary-light);
    color: var(--color-secondary-light);
  `}
  ${props => props.isAnswer && css`
    border: 2px solid #72d8b6;
    color: #72d8b6;
  `}
`;

export const QuestionerResponderName = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 18px;
  letter-spacing: 0.5px;
  @media screen and (max-width: 768px) {
    margin-right: 8px;
  }
`;

export const QuestionerResponderJobTitle = styled.span`
  margin-top: 4px;
  font-size: 13px;
  @media screen and (max-width: 768px) {
    margin-right: 8px;
  }
`;

export const QuestionerResponderCircumstance = styled.span`
  letter-spacing: 0.7px;
  margin-top: 8px;
`;
