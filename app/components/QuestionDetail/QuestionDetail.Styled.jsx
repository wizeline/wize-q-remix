import styled, { css } from 'styled-components';

export const Container = styled.div`
display: flex;
justify-content: center;
`;


export const QuestionDetail = styled.div`
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
    font-family: 'Nunito', sans-serif;
    font-size: 15px;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 10px;

    @media (max-width: 768px) {
        padding-left: 20px;
    }
`;

export const QuestionDetailHeader = styled.div`
    padding: 24px 20px 0;

    @media screen and (max-width: 480px) {
        padding: 0;
    }
`;

export const QuestionDetailBody = styled.div`
    padding: 24px 20px 0;

    @media screen and (max-width: 480px) {
        padding: 0;
    }
`;

export const QuestionDetailFooter = styled.div`
    padding: 24px 20px 0;
`;
