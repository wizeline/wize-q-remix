/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

const colorDark50 = '#4E5154';
const colorSecondary = '#00A7E5';

export const About = styled.div`
  background-color: #fff;
  color: ${colorDark50};
  line-height: 1.71;
  text-align: center;
`;

export const AboutBody = styled.div`
  margin: auto;
  max-width: 65%;
  padding: 0 20px;

  @media (max-width: 767px) {
    max-width: 100%;
  }

  h1 {
    color: #a2abaf;
    font-size: 14px;
    letter-spacing: 1.5px;
    margin: auto;
    padding: 72px 0 12px;
    text-transform: uppercase;
  }

  h2 {
    color: ${colorDark50};
    font-size: 24px;
    font-weight: 600;
    padding: 8px 10px;
  }

  h3 {
    color: ${colorDark50};
    font-size: 24px;
    font-weight: 600;
    margin: 40px 40px 18px 18px;
    padding: 8px 10px;
    text-align: left;
  }

  p {
    color: ${colorDark50};
    letter-spacing: 0.6px;
    margin: 40px 40px 18px 18px;
    padding: 8px 10px;
    text-align: justify;
  }

  span ul {
    list-style: none;

    @media (max-width: 767px) {
      padding-left: 20px;
    }
  }

  span ul li {
    padding-top: 10px;
    width: 60%;

    @media (max-width: 767px) {
      width: 100%;
    }

    &:before {
      display: inline-block;
      content: "\\2022";
      font-size: 30px;
      font-weight: bold;
      left: 6px;
      line-height: 0;
      margin-left: -1em;
      margin-top: 12px;
      position: relative;
      top: 4px;
      width: 1em;
      color: ${colorSecondary};

      @media (max-width: 767px) {
        left: 6px;
      }
    }
  }

  span ul.inside-list li::before {
    content: "\00b0";
    font-weight: unset;
    left: 22px;
    top: 23px;

    @media (max-width: 767px) {
      left: 32px;
    }
  }
`;

export const BoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const BoxContainer = styled.div`
    padding: 16px;
    
    @media screen and (min-width: 1025px){
      max-width: 50%;
    }

    @media (max-width: 767px) {
      left: 32px;
    }
`;

export const BoxImageContainer = styled.div`
display: inline-block;
height: 48px;
margin-right: 8px;
`;

export const BoxImage = styled.img`
  float: left;
  margin: 28px;

  @media (max-width: 767px) {
    margin-top: 0px;
  }
`;

export const BoxBoldText = styled.div`
  color: ${colorDark50};
  font-family: "NunitoSans Semibold";
  margin-top: 44px;
  margin: 28px;
  text-align: left;

  @media (max-width: 767px)  {
    margin-top: 0px;
  }
`;

export const BoxMetadata = styled.div`
  margin: 28px;
  text-align: left;
`;

export const AboutMetadata = styled.div`
  @media (max-width: 767px)  {
    margin-top: 24px;
  }
`;

export const AboutWhatElseContainer = styled.div`
  margin-bottom: 28px;
  margin-top: 28px;
`;

export const AboutWhatElseImg = styled.img`
  float: right;
  margin-left: 100px;
  margin-right: 28px;

  @media (max-width: 767px) {
    float: none;
    margin: auto;
  }
`;

export const AboutWHatElseText = styled.div`
  margin-top: 44px;
  text-align: left;
  width: 70%;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const AboutWHatElseBold = styled.div`
  color: ${colorDark50};
  font-family: "NunitoSans Semibold";
  margin-top: 44px;
  margin: 28px;
  text-align: left;
`;

export const AboutWhatElseMetadata = styled.div`
  margin: 28px;
  text-align: left;
`;

export const AboutFooter = styled.div`
  padding: 50px 0;

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 50px 0 100px;
  }

  @media (max-width: 767px) {
    padding: 50px 0 100px;
  }

  a {
    text-decoration: none;
  }

  p {
    margin: auto;
    max-width: 800px;
    padding: 0 20px;

    @media (max-width: 767px) {
      margin-bottom: 20px;
    }
  }
`;
