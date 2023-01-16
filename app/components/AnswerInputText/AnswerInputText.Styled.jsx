/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const CommentInputText = styled.div`
    display: flex;
    flex: 85%;
    flex-direction: column;

    @media (max-width: 500px) {
        flex-direction: column-reverse;
    }
`;

export const CommentInputTextArea = styled.div`
    display: block;
    position: relative;
    width: 100%;
`;

export const CommentInputOptions = styled.div`
    padding-bottom: 1%;

    @media (max-width: 500px) {
        display: none;
    }
`;
