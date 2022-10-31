import styled, { css } from 'styled-components';

export const Label = styled.div`
  background-color: var(--color-secondary-lowOpacity);
  color: var(--color-secondary);
  border-radius: 20px;
  font-weight: 600;
  font-size: 12px;
  line-height: normal;
  padding: 5px 10px;
  margin-right: 7px;

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
    background-color: var(--color-dark-100);
  `}
`;