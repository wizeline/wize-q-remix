import styled from 'styled-components';
import doubleQuotes from '~/images/react-icons/ri/double-quotes-r.svg';

export const QuestionTextAreaWrapper = styled.div`
  letter-spacing: 0.6px;
  line-height: 1.71;
  word-wrap: break-word;
  border: none;
  border-bottom: none;
  border-radius: 3px;
  color: var(--color-dark-50);
  font-size: 14px;
  outline: none;
  resize: none;
  width: 100%;
  &:disabled {
    color: grey;
  }
  .public-DraftEditorPlaceholder-inner,
  .public-DraftEditor-content {
    padding-left: 5px;
  }
  .public-DraftEditor-content{
    min-height: 50px;
    font-family: Arial, Helvetica, sans-serif;
  }
  .rdw-editor-wrapper {
    display: flex;
    flex-direction: column-reverse;
    height: 220px;
  }
  .rdw-editor-toolbar {
    padding: 0;
  }
  .toolbar-class{
    border: none;
  }
  .rdw-option-wrapper{
    border: 1px solid transparent;
    padding: 15px 5px;
    border-radius: 5px;
  }
  .rdw-option-wrapper:hover {
    border: 1px solid var(--color-primary);
    box-shadow: none;
    transition-property: border-color;
    transition-duration: 180ms;
    transition-timing-function: ease-in-out;
  }
  .rdw-option-active {
    border: 1px solid #dee0e1;
    box-shadow: none;
    transition-property: border-color;
    transition-duration: 180ms;
    transition-timing-function: ease-in-out;
  }
  /* To show Quotes Icon */
  .rdw-inline-wrapper:last-child {
    position: relative;
    .rdw-option-wrapper {
      width: 35px;
      z-index: 1;
      /* Hide the text. */
      text-indent: 105%;
      white-space: nowrap;
      overflow: hidden;
      // Quotes icon
      background-image: url("${doubleQuotes}");
      background-repeat: no-repeat;
      background-position: center;
    }
  }
`;
export const QuestionInputTextOptions = styled.div`
    align-items: baseline;
    display: inline-flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 1%;
    padding-top: 1%;
    float: left;
`;

export const WrapperButton = styled.div`
  display: flex;
  align-items: center;
`;

export const OptionEditor = styled.button`
  border: none;
  background-color: transparent;
  padding: 5px;
  font-size: 20px;
  .option-icon {
    color: #c6c6c6;
  }
`;
