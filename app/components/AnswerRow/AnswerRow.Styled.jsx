import styled, { css } from 'styled-components';
import Markdown from 'react-markdown';

export const AnswerRow = styled.div` 
  font-family: 'NunitoSans Regular', sans-serif;
  font-size: 14px;
  letter-spacing: 0.6px;
  line-height: 1.71;
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
  padding: 30px 0 0 50px;
  @media screen and (max-width: 480px) {
    margin-top: 20px;
    padding: 0 20px;
  }
  ${props => !props.isPreview && css`
    @media screen and (max-width: 480px) {
      padding: 0;
      margin-top: 0;
    }
  `}
  ${props => props.isQuestionModalOpen && css`
    padding: 0;
    ${AnswerRow} {
      @media screen and (max-width: 480px) {
        padding: 0;
      }
    }
  `}
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
  justify-content: space-between;
  margin-bottom: 17px;
  position: relative;
  ${props => !props.isPreview && css`
    margin-bottom: 8px;
    padding-bottom: 8px;
  `}
`;

export const AnswerMetadataBottom = styled.div`
  color: var(--color-dark-25);
  display: flex;
  flex-direction: column;
  font-family: "NunitoSans SemiBold",sans-serif;
  font-size: 12px;
  align-items: end;
  letter-spacing: 0.7px;
  margin-top: 8px;
  margin-bottom: 8px;
`;

export const AnswerRowLineVertical = styled.div`
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
  border-bottom: var(--color-dark-25) solid 1px;
  margin-top: 8px;
  width: 100%;
`;