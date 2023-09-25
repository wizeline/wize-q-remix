/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
`;

export const Container = styled.div`
  background-color: white;
  padding: 24px;
  max-width: 600px;
  max-height: 600px;
  width: 600px;
  height: 300px;
  border-radius: 12px;
`;

export const CloseBtn = styled.div`
  float: right;
  cursor: pointer;
`;

export const InputText = styled.input`
  width: 100%;
  margin: 8px 0px;
  border-radius: 16px;
  padding: 12px 20px;
  border: none;
  height: 100%;
  background-color: transparent;

`;

export const TagContaniner = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Tag = styled.div`
  border: none;
  padding: 12px 8px;
  text-align: center;
  box-shadow: 4px 4px 10px 0px var(--color-secondary);
  border-radius: 16px;
  margin: 4px;
  &:hover {
    background-color: var(--color-secondary);
    cursor: pointer;
    color: white;
    box-shadow: none;
  }
  ${(props) => props.selected && css`
    border-radius:16px 0px 0px 16px;
    background-color: var(--color-secondary);
    color: white;
    box-shadow: none;
    margin: 4px 0px 4px 4px;
  `}
`;

export const BtnRemoveTag = styled.div`
  display: flex;
  align-items: center;
  border-radius: 0px 16px 16px 0px;
  margin: 4px 0px;
  background-color: var(--color-secondary);
  color: white;
  svg {
    width: 2em;
  }
  cursor: pointer;
`;
