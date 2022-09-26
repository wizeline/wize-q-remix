import styled, { css } from 'styled-components';

export const Container = styled.div`
  border: 1px solid var(--color-secondary);
  border-radius: 50%;
  overflow: hidden;
  height: 32px;
  min-width: 32px;
  width: fit-content;
  ${props => props.size === 'small' && css`
    height: 20px;
    min-width: 20px;
  `}
  ${props => props.size === 'big' && css`
    height: 46px;
    min-width: 46px;
  `}
  ${props => props.size === 'extra big' && css`
    min-height: 100px;
    min-width: 100px;
  `}
  ${props => props.customSize && css`
    min-height: ${props.customSize};
    min-width: ${props.customSize};
  `}
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  height: 100%;
  width: auto;
`;