import styled, { css } from 'styled-components';

export const AnswerOptions = styled.div`
  display: flex;
  button {
    background: transparent;
    border: 0;
    &:first-child {
      margin-right: 16px;
    }
    :disabled {
      opacity: 0.5;
    }
    > img {
      height: 15px;
      width: 15px;
    }
  }
  ${props => !props.isPreview && css`
    @media screen and (max-width: 480px) {
      min-width: fit-content;
    }
    & > img:first-child {
      @media screen and (max-width: 480px) {
        margin-right: 24px;
      }
    }
  `}
  ${props => props.isDisabled && css`
    display: inline-block;
    position: relative;
  `}
`;

export const OptionsTooltip = styled.div`
  font-family: 'Nunito', sans-serif;
  background-color: #31425a;
  border-radius: 6px;
  bottom: 150%;
  color: #fff;
  left: 50%;
  margin-left: -60px;
  padding: 8px;
  position: absolute;
  text-align: center;
  width: 120px;
  z-index: 1;
  font-size: 14px;
  letter-spacing: 0.6px;
  &::after {
    border: 5px solid transparent;
    border-top-color: #31425a;
    content: " ";
    left: 50%;
    margin-left: -5px;
    position: absolute;
    top: 100%;
  }
`;
