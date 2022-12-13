/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { SloganContainer } from 'app/components/Slogan/Slogan.Styled';

export const LoginDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LoginSubDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

export const SH3 = styled.h3`
  text-align: center;
  color: #646464;
  margin-bottom: 50px;
  font-family: "Nunito";
  font-size: 25px;
  letter-spacing: 0.4px;
  font-weight: 700;
`;

export const Span = styled.span`
  ${(props) => (props.variant === 'bold'
    ? 'font-family: "Nunito";'
    : 'font-family: "Nunito";')}
`;

export const Paragraph = styled.p`
  text-align: center;
  color: #646464;
  font-family: "Nunito";
  font-size: 18px;
  letter-spacing: 0.7px;
  margin-top: 50px;
  width: 350px;
`;

export const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45%;
  padding: 0 40px;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;

export const RightDiv = styled.div`
  display: flex;
  width: 55%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #203449;
  position: relative;

  img {
    height: fit-content;
    width: 200px;
    margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 120px;

    img {
      margin-bottom: 0;
    }
  }
`;

export const Slogan = styled.div`
  width: 320px;

  ${SloganContainer} {
    p {
      padding: 0;
      text-align: center;
      color: white;
      font-size: 18px;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const RedDiv = styled.div`
  width: 20px;
  background-color: var(--color-primary);
  position: absolute;
  height: 100%;
  left: 0;
`;

export const GoldDiv = styled.div`
  width: 20px;
  background-color: #e5c8a6;
  position: absolute;
  height: 100%;
  left: 20px;
`;

export const AdviceContainer = styled.div`
  color: white;
  font-size: 15px;

  p {
    font-weight: 100;
    width: fit-content;
  }
  a {
    text-decoration: none;
    color: var(--color-secondary);
  }
  ul {
    li {
      margin: 10px;
    }
  }
`;
