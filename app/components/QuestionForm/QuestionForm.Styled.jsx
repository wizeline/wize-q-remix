/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { QuestionAssigner } from '../QuestionAssigner/QuestionAssigner.Styled';
import { QuestionLocationWrapper } from '../QuestionLocation/QuestionLocation.Styled';

// Question Input Main
export const InputForm = styled.div`
  background-color: #f4f7f9;
  color: var(--color-dark-50);
  font-size: 14px;
  padding: 4% 0;
  text-align: center;
  .open ul {
    border: none;
    border-radius: 10px;
    box-shadow: 0 3px 4px 0 rgba(156, 156, 156, 0.5);
    letter-spacing: 0.6px;
    width: 304px;
    background-color: #eee;
  }
  .dropdown-menu a {
    color: var(--color-dark-50);
    padding-right: 16px;
  }
`;

export const InputContainer = styled.div`
  background: #fff;
  box-shadow: 0 3px 6px 0 rgba(225, 229, 233, 0.8);
  color: var(--color-dark-50);
  float: none;
  margin: auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 20px 15px 0 15px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    min-width: 700px;
  }
  @media screen and (max-width: 767px) {
    max-width: 680px;
    width: 100%;
  }
`;

export const InputTopWrapper = styled.div`
  align-items: center;
  display: flex;
  svg:nth-child(2) {
    margin: 0 5px;
  }
`;

// Ask Button
export const Submit = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  padding-bottom: 10px;
  position: absolute;
  right: 0;
  text-align: center;
  @media screen and (min-width: 1025px) {
    text-align: right;
  }
  @media screen and (max-width: 767px) {
    position: static;
    width: 100%;
    flex-wrap: wrap;
  }
  p {
    display: flex;
    margin: 0;
    align-items: center;
    // Switch
    label {
      margin: 0;
      margin-left: 5px;
    }
  }
  button {
    background: var(--color-secondary);
    border: none;
    border-radius: 3px;
    color: #fff;
    height: 33px;
    @media screen and (min-width: 1025px){
      width: 77px;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
      width: 248px;
    }
    @media screen and (max-width: 767px) {
      width: 100%;
    }
    &:disabled {
      background: #d8d8d8;
    }
    &:hover:enabled {
      background-color: white;
      border: solid 1px var(--color-secondary);
      color: var(--color-secondary);
    }
  }
`;

// Dropdown Menus Buttons and List
export const Options = styled.div`
  display: flex;
  align items: center;
  .btn-group {
    width: 100%;
  }
  @media screen and (max-width: 767px) {
    flex-wrap: wrap;
  }
  ${QuestionAssigner},
  ${QuestionLocationWrapper} {
    align-items: center;
    display: flex;
    margin-right: 10px;
    min-width: 150px;
    @media screen and (max-width: 767px) {
      margin-bottom: 10px;
    }
    .question-input-dropdown.btn-default[role=button] {
      background-color: #f1f1f1;
      border: none;
      border-radius: 20px;
      box-shadow: none;
      display: flex;
      font-family: "Nunito", sans-serif;
      font-size: 13px;
      letter-spacing: 0.4px;
      min-width: 150px;
      width: 100%;
      @media screen and (max-width: 767px) {
        min-width: 250px;
      }
    }
  }
  ${QuestionAssigner} {
    .question-input-dropdown.btn-default[role=button] {
      background-color: ${(props) => (props.department === '' ? '#f1f1f1' : 'var(--color-secondary)')};
      color: ${(props) => (props.department === '' ? 'var(--color-dark-50)' : '#fff')};
    }
  }
  ${QuestionLocationWrapper} {
    .question-input-dropdown.btn-default[role=button] {
      background-color: ${(props) => (props.location === '' ? '#f1f1f1' : 'var(--color-secondary)')};
      color: ${(props) => (props.location === '' ? 'var(--color-dark-50)' : '#fff')};
    }
  }
`;

// Tooltip
export const SubmitTooltipText = styled.span`
  background-color: #31425a;
  border-radius: 2px;
  bottom: 135%;
  color: #fff;
  display: block;
  font-weight: normal;
  letter-spacing: 0.6px;
  padding: 12px;
  position: absolute;
  text-align: left;
  visibility: hidden;
  width: 168px;
  z-index: 100;
  @media screen and (min-width: 1025px) {
    left: -58%;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    display: none;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
  span {
    font-family: "Nunito";
    font-weight: bold;
  }
  &:after {
    border: 5px solid transparent;
    border-top-color: #31425a;
    content: "";
    left: 50%;
    margin-left: -5px;
    position: absolute;
    top: 100%;
  }
`;

export const SubmitTooltip = styled.button`
  position: relative;
  &:hover ${SubmitTooltipText} {
    visibility: visible;
  }
`;
