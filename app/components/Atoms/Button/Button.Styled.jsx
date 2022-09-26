import styled, { css } from 'styled-components';
import { MdClose } from 'react-icons/md';
import {
  PRIMARY_BUTTON,
  DISABLED_BUTTON,
  SECONDARY_BUTTON,
  DANGER_BUTTON,
  TEXT_BUTTON,
  ICON_BUTTON,
} from '~/utils/constants';

export const MainButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  justify-content: center;
  margin: 0;
  padding: 0;
  text-align: center;
  transition: all 0.3s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  white-space: nowrap;

  &:focus {
    outline: none;
  }

  ${props =>
    props.category === PRIMARY_BUTTON &&
    css`
      background-color: var(--color-secondary);
      border: 1px solid transparent;
      color: #fff;
      line-height: 1.42857;
      margin: 0 0 0 10px;
      padding: 6px 12px;
      min-width: 76px;
      touch-action: manipulation;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);

      &:hover {
        background-color: var(--color-secondary-hover);
        box-shadow: 0 3px 4px 0 rgba(233, 236, 239, 0.5);
      }

      &.login-button {
        font-size: 18px;
        height: 44px;
        letter-spacing: 0.3px;
        margin: 0;
        padding: 0 32px;
      }

      &.large-button {
        line-height: inherit;
        margin: 0;
        padding: 12px 32px;
        width: 100%;
      }

      &.add-comment-button {
        display: none;
        @media (max-width: 500px) {
            display: inline-block;
        }
      }

      &.writing-mobile {
        @media (max-width: 768px) {
          display: none;
        }
      }
    `}

  ${props =>
    props.category === SECONDARY_BUTTON &&
    css`
      background-color: #fff;
      border: 1px solid var(--color-secondary);
      color: var(--color-secondary);
      line-height: 1.42857;
      margin: 0 0 0 10px;
      padding: 6px 12px;
      min-width: 76px;
      touch-action: manipulation;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);

      &:hover {
        background-color: #f8f9fa;
        box-shadow: 0 3px 4px 0 rgba(233, 236, 239, 0.5);
      }

      &.edit-comment-button {
        margin: 0 0 0 20px;
        height: 34px;
      }
    `}

  ${props =>
    props.category === DISABLED_BUTTON &&
    css`
      background-color: var(--color-secondary);
      border: 1px solid transparent;
      color: #fff;
      line-height: 1.42857;
      margin: 0 0 0 10px;
      padding: 6px 12px;
      min-width: 76px;
      touch-action: manipulation;

      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
      &:hover:enabled {
        background-color: var(--color-secondary-hover);
        border: 1px solid var(--color-secondary-hover);
        box-shadow: 0 3px 4px 0 rgba(233, 236, 239, 0.5);
        opacity: 1;
      }

      &.edit-comment-button {
        margin: 0 0 0 20px;
        height: 34px;
      }
    `}

  ${props =>
    props.category === DANGER_BUTTON &&
    css`
      background-color: var(--color-primary);
      border: 1px solid var(--color-primary);
      color: #fff;
      line-height: 1.42857;
      margin: 0 0 0 10px;
      padding: 6px 12px;
      min-width: 76px;
      touch-action: manipulation;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);

      &:hover {
        background-color: var(--color-primary-hover);
        border: 1px solid var(--color-primary-hover);
        box-shadow: 0 3px 4px 0 rgba(233, 236, 239, 0.5);
      }
    `}    

  ${props =>
    props.category === TEXT_BUTTON &&
    css`
      background-color: transparent;
      color: var(--color-secondary);
      letter-spacing: 0.6px;

      &.admin-button {
        font-size: 12px;
        margin-right: 12px;
        padding: 5px;
      }

      &.preview-button {
        font-family: "Nunito", sans-serif;
        height: 32px;
        padding: 1px 6px;
      }

      &.undo-button {
        color: #fff;
        font-size: 14px;
        font-family: "Nunito", sans-serif;
        margin: 3px 0;
        position: absolute;
        right: 48px;
        text-decoration: underline;
      }

      &.show-filters-button {
        display: none;
        color: var(--color-dark-50);
        padding: 6px 10px;
        text-align: left;
        &:hover {
          background-color: var(--color-secondary-light);
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          display: block;
        }
        @media (max-width: 767px) {
          display: block;
        }
      }
    `}

  ${props =>
    props.category === ICON_BUTTON &&
    css`
      display: flex;

      &.clear-button {
        background-color: var(--color-dark-25);
        border-radius: 50%;
        position: absolute;
        right: 6px;
        top: auto;
        &:hover {
          background-color: var(--color-dark-50);
        }
      }
    `} 
`;

export const CloseButton = styled(MdClose)`
  position: absolute;
  top: 3px;
  right: 3px;
  font-size: 28px;
  color: #555555;
  cursor: pointer;

  &:hover {
    color: darkgray;
  }

  &.question-modal-button {
    z-index: 1000;
    top: 3px;
    right: 25px;
  }
`;