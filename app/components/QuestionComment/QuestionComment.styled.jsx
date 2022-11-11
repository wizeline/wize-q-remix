import styled, { css } from 'styled-components';
import Markdown from 'react-markdown';
import { ContainerCounterButton } from '~/components/CounterButton/CounterButton.Styled';
import { CommentInputTextArea } from '~/components/CommentInput/CommentInput.styled';
import { 
  CircleIcon,
  QuestionerResponderContainer,
  QuestionerResponderName 
} from '~/components/QuestionResponderInfo/QuestionResponderInfo.Styled';

export const QuestionCommentContainer = styled.div`
  border-radius: 20px;
  margin-bottom: 24px;
  width: 100%;
  padding-bottom: ${props => (!props.isDeleting ? '16px' : '10px')};
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(225, 229, 233, 0.8);
  padding: 15px 20px 10px;
  ${props => props.isDeleting && css`border: 1px solid #cd3140;`}
  ${props => props.hadApprover && css`border: 1px solid var(--color-green-border);`}
  ${props => props.isCommunityAnswer && css`border: 1px solid var(--color-gold-border);`}

  ${ContainerCounterButton} {
    :hover {
      background-color: transparent;
    }
  }

  &:last-child {
    margin: 0;
  }

  @media screen and (max-width: 768px) {
    ${props => (props.isEditing && `
      position: relative;
    `)};
  }
`;

export const QuestionCommentMetadata = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
  padding-bottom: 8px;

  p {
    display: flex;
    margin: 0;
  }

  @media screen and (max-width: 480px) {
    ${CircleIcon} {
      display: none;
    }

    ${QuestionerResponderContainer} {
      flex-direction: column;
      align-items: flex-start;
    }

    ${QuestionerResponderName} {
      margin-top: -8px;
    }
  }
`;

export const QuestionCommentText = styled.div`
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  letter-spacing: 0.6px;
  line-height: 1.71;
  padding-left: 43px;

  @media screen and (max-width: 768px) {
    ${props => (props.isEditing && `
    max-height: 100%;
    overflow-y: auto;
    `)};
  }
`;

export const QuestionCommentMarkdown = styled(Markdown)`
  display: inline;

  p {
    color: var(--color-dark-50);
    margin: 0;
    overflow-wrap: break-word;
  }
`;

export const QuestionCommentOptionsWrapper = styled.div`
  align-items: center;
  display: flex;
`;

export const QuestionCommentOptions = styled.div`
  margin-left: 5px;

  img {
    cursor: pointer;
    height: 15px;
    width: 15px;
  }

  img:first-child {
    margin-right: 16px;
  }
`;

export const QuestionCommentDeleteConfirmation = styled.div`
  align-items: center;
  border-top: 1px solid #e5e5e5;
  display: flex;
  padding-top: 10px;

  p {
    font-family: "NunitoSans Semibold", sans-serif;
    margin-right: auto;
    margin-top: 10px;
  }
`;

export const QuestionCommentEdit = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;

  div {
    line-height: 15px;
    padding-right: unset;
    position: static;
  }
`;

export const QuestionCommentShowMore = styled.span`
  color: var(--color-secondary);
  cursor: pointer;
  display:${props => (props.isEditing && 'none')};
`;

export const QuestionCommentButtons = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin-top: 15px;
  width: fit-content;
    
`;

export const QuestionCommentWrapper = styled.div`
  border-radius: 15px;
  width: 100%;

  ${CommentInputTextArea} {
    @media screen and (max-width: 768px) {
      ${props => (props.isEditing && `
        height: 200px;
      `)};
    }
  }

  @media screen and (max-width: 768px) {
    ${props => (props.isEditing && `
      background-color: #fff;
      position: fixed;
      padding: 20px 15px;
      border-radius: 0;
      top: 0;
      left: 0;
      z-index: 1000;
      height: 100%;
      width: 100%;
    `)};
  }
`;

export const QuestionCommentCounterSpan = styled.span` 
  display: flex;
  justify-content: center;

  ${props => (props.upVoteActive && `
    color: var(--color-green);
  `)};

  ${props => (props.downVoteActive && `
    color: var(--color-primary);
  `)};
`;

export const QuestionCommentDotsWrapper = styled.div`
  cursor: pointer;
`;

export const QuestionCommentDate = styled.div`
  display: flex;
  height: fit-content;
  color: var(--color-dark-metadata);
  font-family: "Nunito", sans-serif;
  font-size: 12px;
  letter-spacing: 0.7px;
`;


// tooltip
export const CommentAsAnswerToolTipText = styled.span`
background-color: black;
border-radius: 6px;
color: #fff;
display: block;
padding: 5px;
position: absolute;
visibility: hidden;
width: 168px;
z-index: 100;

`;

export const CommentAsAnswerToolTip = styled.button`
background-color: transparent;
border: none;
position: relative;
 &:hover ${CommentAsAnswerToolTipText} {
  visibility: visible;
 }
`;

export const ArrowUp = styled.div`
  border-radius: 50%;
  height: 1.8em;
  width: 1.8em;
  margin-right: 5px;

  ${props => (props.upVoteActive && `
    background-color: var(--color-green-bg);
  `)};
`;

export const ArrowDown = styled.div`
  border-radius: 50%;
  height: 1.8em;
  width: 1.8em;
  margin-left: 5px;

  ${props => (props.downVoteActive && `
    background-color: var(--color-primary-lowOpacity);
  `)};
`;

export const ApproverName = styled.span`
  font-family: "Nunito", sans-serif;
  font-size: 12px;
  color: var(--color-green);
`;
