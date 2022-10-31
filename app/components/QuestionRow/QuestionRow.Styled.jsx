import styled, { css } from 'styled-components';

export const QuestionRowContainer = styled.div`
    align-items: flex-start;
    background: #fff;
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
    padding-botton: 8px;
    width: 100%;
    position: relative;
    @media screen and (max-width: 480px) {
      padding: 0 20px;
    }
    ${props => props.isQuestionModalOpen && css`
        @media screen and (max-width: 480px) {
          padding: 0 10px;
        }
    `}
`;

export const QuestionRowMetadataTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 17px;
  width: 100%;
  @media screen and (max-width: 480px) {
    padding: 24px 0 0;
  }
`;

export const QuestionRowOptions = styled.div`
  align-items: flex-end;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  margin-right: 10px;
  > span:first-child {
    color: #a2abaf;
    font-family: "Nunito", sans-serif;
    font-size: 12px;
    margin-bottom: 2px;
  }
`;

export const PinQuestionIconHolder = styled.span`
  margin-right: 25px;
  margin-top: 8px;
  float: right;
  display: block;
  position: relative;
  > img:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 480px) {
    margin: 0px 8px;
  }
`;


export const PinActionableIconHolder = styled.img`
  margin-right: 0px;
  margin-top: 0px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  float: right;
  height: 16px;
  width: 16px;
  filter: invert(28%) sepia(8%) saturate(331%) hue-rotate(169deg) brightness(97%) contrast(82%);
`;

export const PinTooltipMessage = styled.span`
  display: none;
  width: 210px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0px;
  position: absolute;
  z-index: 1000;
  right: 25px;
  top: -25px;
  font-size: 11px;
  letter-spacing: 0.5px;

  ${PinQuestionIconHolder}:hover & {
    display: block;
  }
`


export const UnpinActionableIconHolder = styled.img`
  margin-right: 0px;
  margin-top: 0px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  float: right;
  height: 16px;
  width: 16px;
  filter: invert(72%) sepia(70%) saturate(2758%) hue-rotate(178deg) brightness(103%) contrast(106%);
`;

export const PinnedIndicator = styled.span`
  float: right;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: fit-content;

  > img {
    display: block;
    display: block;
    margin-left: 5px;
    margin-right: auto;
    float: right;
    height: 12px;
    width: 12px;
    filter: invert(95%) sepia(6%) saturate(18%) hue-rotate(201deg) brightness(89%) contrast(91%);
  }
  > span {
    min-width: 80px;
    color: var(--color-dark-25);
    font-family: "Nunito", sans-serif;
    font-size: 11px;
    letter-spacing: 0.7px;
    @media screen and (max-width: 480px) {
      font-size: 9px;
      letter-spacing: 0.7px;
    }
`;

export const QuestionRowWrapper = styled.div`
    width: 100%;
`;

export const QuestionRowContent = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 0;
`;

export const QuestionRowMetadataBottom = styled.div`
  color: var(--color-dark-25);
  display: flex;
  align-items: flex-end;
  font-family: "Nunito", sans-serif;
  font-size: 12px;
  font-weight: 600;
  justify-content: space-between;
  letter-spacing: 0.7px;
  margin-top: 20px;
  margin-bottom: 8px;
  width: 100%;
`;

export const QuestionRowBorderBottom = styled.div`
  border-bottom: var(--color-dark-25) solid 1px;
  width: 100%;
`;

export const QuestionRowLine = styled.div`
    display: none;
    border-right: 1px solid var(--color-dark-25);
    height: 95%;
    left: 22px;
    top: 70px;
    position: absolute;
    width: 1px;
    @media screen and (max-width: 480px) {
        left: 42px;    
        top: 90px;
    }
    ${props => (!props.hasAnswer || props.isQuestionModalOpen) && css`
        display: none
    `}
`;

export const QuestionRowDate = styled.div`
    display: flex;
    height: fit-content;
    color: var(--color-dark-25);
    font-family: "Nunito", sans-serif;
    font-size: 12px;
    letter-spacing: 0.7px;
    margin-bottom: 10px;
`;

export const RightWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
`;

export const QuestionRowMetadataSectionOne = styled.div`
    display: flex;
    align-items: center;
`;