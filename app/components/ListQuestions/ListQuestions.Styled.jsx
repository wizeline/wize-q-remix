

import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  background-color: #f4f7f9;
  grid-template-areas: "top top top" "left center right";
  grid-template-columns: 25% 50% 25%;
  margin: 0 auto;
  max-width: 1280px;
  width: 100%;
  padding-top: 40px;
  @media (min-width: 768px) and (max-width: 1024px) {
    grid-template-areas: "top top top" "filters filters filters" "left center right";
    grid-template-columns: 0 100% 0;
  }
  @media (max-width: 767px) {
    grid-template-areas: "top top top" "filters filters filters" "left center right";
    grid-template-columns: 0 100% 0;
    padding-top: 10px;
  }
`;

export const SloganWrapper = styled.div`
  grid-area: left;
  @media (max-width: 1025px) {
    display: none;
  }
`;

export const AskQuestionButtonWrapper = styled.div`
  padding-right: 10px;
  padding-left: 10px;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
`;

export const QuestionsTitle = styled.div`
  font-family: "NunitoSans Bold", sans-serif;
  font-size: 20px;
  letter-spacing: 0.6px;
  padding-top: 10px;
`;

export const QuestionsWrapper = styled.div`
  grid-area: center;
`;

export const QuestionList = styled.div`
  margin: 5px 0 10px;
  padding-left: 0;
`;

export const Alert = styled.div`
  grid-area: center;
  border-radius: 3px;
  margin: 0 auto;
  max-width: 592px;
  width: 94%;
  padding: 15px 10px;
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 100%;
  }
`;

export const FiltersWrapper = styled.div`
  grid-area: right;
  background-color: #f4f7f9;
  @media (max-width: 1024px) {
    grid-area: filters;
    padding: 0 0 20px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
  @media (max-width: 767px) {
    grid-area: filters;
    padding: 0 0 20px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
`;