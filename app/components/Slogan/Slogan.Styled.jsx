/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const SloganContainer = styled.div`
  p {
    font-weight: 100;
    width: fit-content;
    font-size: 15px;
    padding: 0 40px;
    span:first-child {
      color: var(--color-secondary);
      font-weight: 600;
    }
    span:last-child {
      color: var(--color-primary);
      font-weight: 600;
    }
  }
`;
