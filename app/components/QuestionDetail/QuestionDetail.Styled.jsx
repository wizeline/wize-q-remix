import styled, { css } from 'styled-components';

export const Container = styled.div`
background-color: #f4f7f9;
display: flex;
justify-content: center;
`;


export const QuestionDetail = styled.div`
background-color: white;
border-radius: 15px;
width: 100%;
margin-bottom: 30px

`;

export const CounterButtonsWrapper = styled.div`
    display: inline-flex;
    justify-content: space-between;
    width: 100%;

    @media (max-width: 768px) {
        padding-left: 10px;
    }

    ${props => props.isAdmin && !props.hasAnswer && css`
        justify-content: flex-start;
  `}
`;

export const NumComments = styled.div`
    color: var(--color-dark-50);
    font-family: 'NunitoSans Regular', sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 10px;
    padding: 24px 0 0;

    @media (max-width: 768px) {
        padding-left: 20px;
    }
`;

export const QuestionDetailHeader = styled.div`
    display: block;
    flex-shrink: 1;
    padding: 24px 20px 0;
    border-radius: 15px;
`;

export const QuestionDetailBody = styled.div`
    display:block;
    padding: 24px 20px 0;
    max-height: 550px;
    overflow-y: scroll;
`;

export const QuestionDetailFooter = styled.div`
    display:block;
    padding: 24px 20px 0;
    border-radius: 15px;
`;
