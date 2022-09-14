import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 40px auto;
  width: 90vw;

  @media (max-width: 576px) {
    flex-direction: column;

    h2 {
      margin-bottom: 30px;
    }
  }
`;