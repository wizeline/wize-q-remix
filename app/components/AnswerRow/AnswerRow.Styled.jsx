import styled, { css } from 'styled-components';
import Markdown from 'react-markdown';
import { BsFillCircleFill } from "react-icons/bs";

export const AnswerRow = styled.div` 
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  letter-spacing: 0.6px;
  line-height: 1.71;
  width: 100%;
`;

export const AnswerMarkdown = styled(Markdown)`
  color: var(--color-dark-50);
  overflow-wrap: break-word;
  p {
    color: var(--color-dark-50);
    overflow-wrap: break-word;
    @media screen and (max-width: 480px) {
      margin-bottom: 0
    }
  }
  a {
    color: var(--color-secondary);
    cursor: pointer;
  }
  @media screen and (max-width: 480px) {
    margin-bottom: 0
  }
`;

export const AnswerContainer = styled.div`
  width: 100%;
  background-color: #EDF5FF;
  border-radius: 0px 0px 15px 15px;
  padding: 15px 20px 10px 20px;

  @media screen and (max-width: 480px) {
    padding: 15px 12px 10px 12px;
  }
`;

export const AnsweredBy = styled.div`
  color: var(--color-secondary);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: ${props => (props.isPreview ? '14px' : '4px')};
`;

export const AnsweredMetadata = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  margin-bottom: 17px;
  position: relative;
  width: 100%;
  display: flex;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    justify-content: flex-start;
  }

  ${props => !props.hasJobTitle && css`
    align-items: center;

    @media screen and (max-width: 480px) {
      flex-direction: column;
      align-items: flex-start;
    }
  `}

  ${props => !props.isPreview && css`
    margin-bottom: 8px;
    padding-bottom: 8px;
  `}
`;

export const CircleIcon = styled(BsFillCircleFill)`
    font-size: 5px;
    color: var(--color-dark-metadata);
    margin: 0 5px;
`;

export const AnswerRowDate = styled.div`
  color: var(--color-dark-metadata);
  display: flex;
  flex-direction: column;
  font-family: "Nunito", sans-serif;
  font-size: 12px;
  align-items: end;
  letter-spacing: 0.7px;
  margin-right: 8px;
`;

export const AnswerRowLineVertical = styled.div`
  display: none;
  position: absolute;
  height: 65px;
  border-right: 1px solid var(--color-dark-25);
  left: -28px;
  bottom: 35px;
  @media screen and (max-width: 480px) {
    display: none;
  }
  ${props => props.isQuestionModalOpen && css`
    display: none
  `}
`;

export const AnswerRowLineHorizontal = styled.div`
  display: none;
  position: absolute;
  width: 20px;
  border-top: 1px solid var(--color-dark-25);
  left: -28px;
  bottom: 35px;
  @media screen and (max-width: 480px) {
    display: none;
  }
  ${props => props.isQuestionModalOpen && css`
    display: none
  `}
`;

export const AnswerRowBorderBottom = styled.div`
  margin-top: 8px;
  width: 100%;
`;