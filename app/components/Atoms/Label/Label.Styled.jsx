import styled, { css } from 'styled-components';

export const Label = styled.div`
  background-color: var(--color-secondary-lowOpacity);
  border-radius: 20px;
  color: var(--color-secondary);
  display: flex;
  font-weight: 600;
  font-size: 11px;
  line-height: normal;
  margin-right: 7px;
  padding: 5px 10px;
  width: fit-content;
  height: fit-content;

  ${props => props.text === 'Not Assigned' && css`
    display: none;
  `}

  ${props => props.type === 'Location' && css`
    background-color: var(--color-primary-lowOpacity);
    color: var(--color-primary);
  `}

  ${props => props.type === 'Department' && css`
    background-color: var(--color-secondary-lowOpacity);
    color: var(--color-secondary);
  `}

  ${props => props.type === 'Answer' && css`
    background-color: var(--color-green-bg);
    color: var(--color-green);
    text-transform: uppercase;
    font-weight: 700;
    font-size: 10px;
  `}
`;