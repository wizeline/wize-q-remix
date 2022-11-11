import styled, { css } from 'styled-components';
import { BsFillCircleFill } from "react-icons/bs";

export const QuestionerResponderContainer = styled.div`
  align-items: flex-start;
  color: var(--color-dark-50);
  display: inline-flex;
  flex-direction: row;
  justify-content: center;

  ${props => !props.hasJobTitle && css`
    align-items: center;
  `}
`;

export const QuestionResponderWrapper = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
`;

export const QuestionerResponderInfoContainer = styled.div`
  font-family: "Nunito", sans-serif;
  font-size: 12px;
  margin-left: 8px;
  display: flex;
  flex-direction: column;
`;

export const QuestionerResponderName = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: -3px;
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

export const CircleIcon = styled(BsFillCircleFill)`
    font-size: 5px;
    color: var(--color-dark-metadata);
    margin: 0 5px;
`;

export const DateContainer = styled.div`
  display: flex;
  align-items: center;
  width: max-content;

  @media screen and (max-width: 480px) {
    ${props => props.isComment && css`
      margin-left: 40px;
      margin-top: -13px;
    `};

    ${props => (props.isComment && props.hasJobTitle) && css`
        margin-top: -5px;
    `};
  }
`;
