/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const CommentListContainer = styled.div`
  @media screen and (max-width: 768px) {
    margin-top: 12px;
    padding: 0 8px;
  }

  & .question-comment {
    @media screen and (max-width: 768px) {
      padding-top: 12px;
    }
  }
`;

export const SortSelectorContainer = styled.div`
  float: right;
  width: 20.5em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-right: 0.6em;
  margin-bottom: 0.8em;
`;

export const SortSelectorText = styled.span`
  margin-top: 0.3em;
`;

export const CommentListHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;