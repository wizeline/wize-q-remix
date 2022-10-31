import styled, { css } from 'styled-components';

export const QuestionCardContainer = styled.article`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 4px 0 rgba(225, 229, 233, 0.8);
  padding-top: 15px;
  padding-bottom: 8px;

  > div {
    align-items: center;
    display: flex;
    flex-direction: column;
  }
`;

export const QuestionCardWrapper = styled.div`
  width: 94%;

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

export const QuestionCardBorder = styled.div`
  width: 100%;

  ${props => props.hasAnswer && css`
    margin-bottom: 15px;
  `}

  @media screen and (max-width: 480px) {
    padding: 0;
  }
`;

export const QuestionCardActions = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${props => props.hasDetail && css`
    padding-bottom: 8px;
    background-color: #fff;
  `}

  @media screen and (max-width: 480px) {
    padding-bottom: 8px;
  }
`;

export const CounterButtonsWrapper = styled.div`
  justify-content: space-between;
  width: 100%;

  ${props => props.isAdmin && !props.hasAnswer && css`
    justify-content: flex-start;
  `}
  
`;
