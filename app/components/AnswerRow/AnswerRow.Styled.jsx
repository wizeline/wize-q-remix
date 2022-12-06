import styled, { css } from 'styled-components';
import Markdown from 'react-markdown';
import { QuestionerResponderContainer } from '../QuestionResponderInfo/QuestionResponderInfo.Styled';

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
  padding: 15px 20px 10px;

  @media screen and (max-width: 480px) {
    padding: 15px 12px 10px;
  }
`;

export const AnsweredBy = styled.div`
  color: var(--color-secondary);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: ${(props) => (props.isPreview ? '14px' : '4px')};
`;

export const AnsweredMetadata = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 17px;
  position: relative;
  width: 100%;
  display: flex;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

export const AnsweredRightContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const AnsweredMetadataLeft = styled.div`
    display: flex;
    align-items: flex-start;
    width: 100%;

    ${(props) => !props.hasJobTitle && css`
      align-items: center;

      @media screen and (max-width: 480px) {
        flex-direction: column;
        align-items: flex-start;
      }
    `}

    @media screen and (max-width: 480px) {
      flex-direction: column;

      ${QuestionerResponderContainer} {
        margin-bottom: 5px;
      }
    }
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

export const AnswerRowBorderBottom = styled.div`
  margin-top: 8px;
  width: 100%;
`;
