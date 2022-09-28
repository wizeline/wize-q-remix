import styled from 'styled-components';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export const Wrapper = styled.div`
  width: 100%;
  padding: 18px 16px 0;
  margin: 0 !important;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  .img-circle {
      box-shadow: 0 0 0 1px var(--color-secondary);//todo modify for theme variables
      height: 48px;
  }
`;

export const InputAuthorName = styled.span`
  color: var(--color-secondary);
  font-family: "Nunito";
  white-space: initial;
`;

export const InputAutorProfile = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
`;

export const InputAutorInfo = styled.div`
  color: var(--color-dark-50);
  margin-left: 10px;
  padding-top: 5px;
  text-align: left;
  white-space: initial;
`;

export const DropdownActorButton = styled(DropdownButton)`
  background-color: #fff;
  box-shadow: none;
  border: none;
  border-radius: 2px;
  color: var(--color-secondary);
  font-family: "Nunito", sans-serif;
  letter-spacing: 0.4px;
  outline: none;
  &:hover {
    background-color: #fff;
  }
  .caret {
    color: var(--color-secondary);
    margin-left: 5px;
  }
  &:active {
    background-color: #fff;
  }
`;

export const Item = styled(MenuItem)`
  a {
    display: flex !important;
    flex-direction: row;
    align-items: center;
  }
`;
export const Name = styled.span`
  margin-left: 10px;
`;
