import styled, { css } from 'styled-components';
import { BsFillPinAngleFill, BsPinFill } from "react-icons/bs";

export const QuestionRowContainer = styled.div`
    align-items: flex-start;
    background: #fff;
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
    padding-botton: 8px;
    width: 100%;
    position: relative;
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


export const PinActionableIconHolder = styled(BsPinFill)`
  font-size: 15px;
  color: var(--color-dark-25);

  &:hover {
    cursor: pointer;
  }
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


export const UnpinActionableIconHolder = styled(BsPinFill)`
  font-size: 15px;
  color: var(--color-secondary);

  &:hover {
    cursor: pointer;
  }
`;

export const PinnedIndicator = styled.span`
  float: right;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  height: fit-content;

  > span {
    min-width: 80px;
    color: var(--color-dark-metadata);
    font-family: "Nunito", sans-serif;
    font-size: 11px;
    letter-spacing: 0.7px;
    @media screen and (max-width: 480px) {
      font-size: 9px;
      letter-spacing: 0.7px;
    }
`;

export const PinnedIcon = styled(BsFillPinAngleFill)`
  color: var(--color-dark-metadata);
  margin-left: 4px;
  font-size: 12px;
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
    color: var(--color-dark-metadata);
    font-family: "Nunito", sans-serif;
    font-size: 12px;
    letter-spacing: 0.7px;
`;

export const RightWrapper = styled.div`
    display: flex;
    padding-top: 5px;
`;

export const QuestionRowMetadataSectionOne = styled.div`
    display: flex;
    align-items: center;
`;


export const QuestionId = styled.span`
  font-size: 12px;
  color: var(--color-dark-metadata);
  font-weight: 500;
`;

export const DisableControls = styled.div`
    display:flex;
`

export const ChipButton = styled.button`
  height: 25px;
  font-size: 12px;
  border-radius: 25px;
  font-weight: 10px;
  color: #fff;
  background-color: ${props=>props.colorValue?'#84c9ef': '#f49c9c'}
`


export const ButtonTooltipMessage = styled.span`
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

  ${DisableControls}:hover & {
    display: block;
  }
`
