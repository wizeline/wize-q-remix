import styled from 'styled-components';
import { DropdownButton } from 'react-bootstrap';

export const CommentInputMainContainer = styled.div`
    @media screen and (max-width: 500px) {
        display: none;
    }

    &.writing-mobile {
        display: block;
        margin-left: unset;
        margin-top: 16px;
    
        @media screen and (max-width: 767px) {
          width: 100vw;
        }
    }
`;

export const CommentInputTextArea = styled.div`
    display: block;
    position: relative;
    width: 100%;

    @media screen and (max-width: 767px) {
        min-width: 90px;
    }
`;

export const CommentInputTextAreaForm = styled.div`
    display: flex;
    flex: 1;
`;

export const CommentInputOptions = styled.div`
    padding-bottom: 1%;

    @media (max-width: 500px) {
        display: none;
    }
`;

export const CommentInputText = styled.div`
    display: flex;
    flex: 85%;
    flex-direction: column;

    @media (max-width: 500px) {
        flex-direction: column-reverse;
    }
`;

export const CommentInputForm = styled.form`
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0 24px 0 0;

    @media (max-width: 500px) {
        padding: 0 16px 0 0;
    }
`;

export const CommentInputAuthor = styled.div`
    display: flex;
    justify-content: center;
    margin: 0 0 0 16px;

    .open > .dropdown-menu {
        margin-left: 15px;
        width: auto;
        @media (max-width: 500px) {
          margin-left: 0;
          top: 40px;
          height: 100%;
        }
    }
    
    .dropdown-menu > li > a {
        padding: 4px 8px;
    }
`;

export const CommentInputButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;

    @media (max-width: 500px) {
        margin-top: 12px;
    }
`;

export const QuestionInputTextPreview = styled.div`
    letter-spacing: 0.6px;
    line-height: 1.5;
    padding-bottom: 1%;
    text-align: right;
    text-align: left;

    @media (max-width: 767px) {
        position: unset;
    }
`;

export const QuestionInputTextPreviewDiv = styled.div`
    padding: 10px;
    text-align: left;
    word-wrap: break-word;
    width: 100%;
    letter-spacing: 0.6px;
    line-height: 1.71;
    word-wrap: break-word;
    overflow-wrap: break-word;
`;

export const AuthorImg = styled.img`
    box-shadow: 0 0 0 1px var(--color-secondary);
    margin-left: 5px;
    margin-right: 10px;
    height: 40px;
    border-radius: 50%;

    ${props => (props.variant === 'dropdown' ? 'height: 32px' : 'height: 40px')}
`;

export const CommentInputAuthorPictureDiv = styled.div`
    float: left;
`;

export const AuthorNameContainer = styled.div`
    color: var(--color-dark-50);
    padding-top: 5px;
    text-align: left;
`;

export const AuthorNameContainerCaret = styled.span`
    border-color: transparent transparent var(--color-secondary);
    border-style: solid;
    border-width: 0 0 7.5px 7.5px;
    color: var(--color-secondary);
    margin-left: -16px;
    margin-top: 28px;
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    vertical-align: middle;
`;

export const DropdownButtonStyled = styled(DropdownButton)`
    background-color: #f7f7f7;
    border: unset;
    padding: 0%;
`;
