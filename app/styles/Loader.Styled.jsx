import styled, { css, keyframes } from 'styled-components';

import { LSPIN_SMALL, LSPIN_LARGE, LSPIN_MEDIUM } from '~/utils/constants';

export const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 40px auto;
`;

export const LoaderText = styled.span`
  font-family: "Nunito";
  font-size: 18px;
  margin: 15px 0;
  text-align: center;

  ${props =>
    props.size === LSPIN_SMALL &&
    css`
      font-size: 14px;
      margin: 10px 0;
    `}

  ${props =>
    props.size === LSPIN_LARGE &&
    css`
      font-size: 20px;
      margin: 20px 0;
    `}
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.img`
  animation: ${rotate} 0.8s linear infinite;
  display: inline-block;
  margin: 20px 0;

  ${props =>
    props.size === LSPIN_SMALL &&
    css`
      width: 43px;
      height: 30px;
      margin: 15px 0;
    `}

  ${props =>
    props.size === LSPIN_MEDIUM &&
    css`
      width: 95px;
      height: 60px;
    `}

  ${props =>
    props.size === LSPIN_LARGE &&
    css`
      width: 122px;
      height: 82px;
    `}
`;