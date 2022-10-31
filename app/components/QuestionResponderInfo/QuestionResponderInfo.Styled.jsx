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
