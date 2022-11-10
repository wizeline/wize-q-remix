import styled from "styled-components";

export const Container = styled.div`
background-color: #f4f7f9;
display: flex;
width: 100%;
height: 100%;
flex-direction: row;
padding-top: 10px;
overflow:auto;

@media (max-width: 1025px) {
  flex-direction: column;
  height: auto;
}

@media (max-width: 768px) {
  height: auto;
}
`

export const BackToHomeQuestion = styled.div`
flex: 1;

    @media (max-width: 1025px) {
        padding: 20px 0; 
    }

    button {
        padding: 0 24px;
        color: var(--color-secondary);
        font-weight: bolder;
    }
`

export const QuestionDetail = styled.div`
flex: 2;
height: 100%;
width: 100%;
`
export const RecommendationsContainer = styled.div`
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0 25px 0 20px;
  }
`;

export const QuestionRecommendations = styled.div`
flex: 1;

    @media (max-width: 1025px){
        display:none;
    }
`

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
`