import styled from 'styled-components';

export const QuestionDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    background-color: #f4f7f9;
    padding-top: 40px;
    @media (max-width: 1025px) {
      flex-direction: column-reverse;
    }
    @media (max-width: 768px) {
      padding-top: 20px;
    }
`;

export const QuestionSlogan = styled.div`
  flex: 1;
  @media (max-width: 1025px) {
    display: none;
  }
`;

export const QuestionInput = styled.div`
  flex: 2;
  height: 100%;
`;

export const QuestionRecommendations = styled.div`
  flex: 1;
`;

export const RecommendationsContainer = styled.div`
  padding: 0 40px;
  @media (max-width: 768px) {
    padding: 0 25px 0 20px;
  }
`;

export const Recommendations = styled.div`
  background-color: var(--color-secondary-light);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  font-size: 13px;
  padding: 20px;
  span {
    display: flex; 
    flex-direction: row;
    &:first-child {
      justify-content: center;
      color: var(--color-secondary);
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 15px;
    }
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4) {
      margin-bottom: 10px;
    }
  }
`;