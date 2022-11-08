import styled, { css } from 'styled-components';


export const QuestionerResponderContainer = styled.div`
  align-items: center;
  color: var(--color-dark-50);
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const QuestionerResponderInfoContainer = styled.div`
  font-family: "Nunito", sans-serif;
  font-size: 12px;
  margin-left: 8px;


  ${props => !props.hasJobTitle && css`
    display: flex;
    align-items: center;
  `}
`;

export const QuestionerResponderName = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

export const QuestionerResponderJobTitle = styled.span`
  margin-top: 4px;
  font-size: 12px;
`;

export const QuestionerResponderCircumstance = styled.span`
  letter-spacing: 0.7px;
  margin-top: 8px;
`;

export const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
