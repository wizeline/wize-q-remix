import styled from 'styled-components';

export const Button = styled.button`
  all: unset;
  align-items: center;
  background-color: var(--color-secondary);
  border-radius: 4px 0 0 4px;
  bottom: 45px;
  box-shadow: 0 2px 4px 0 #c7c6c6;
  display: flex;
  height: 40px;
  justify-content: center;
  opacity: ${props => props.display === true ? 0.9 : 0};
  padding-left: 11px;
  position: fixed;
  right: 0px;
  transition: opacity 200ms;
  width: 124px;
  transition: opacity 200ms, visibility 0s 200ms;
  &:hover {
    background-color: var(--color-secondary-hover);
    cursor: pointer;
  }
  &:active {
    background-color: var(--color-secondary-active);
  }
  svg {
    align-self: center;
  }
`;

export const Span = styled.span`
  color: #ffffff;
  font-family: 'NunitoSans Regular', sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.58px;
  padding-left: 11px;
  padding-right: 24px;
`;
