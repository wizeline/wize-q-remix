import styled from 'styled-components';

export const QuestionAssignerToolTipText = styled.span`
  background-color: var(--color-secondary);
  visibility: hidden;
  width: auto;
  color: #000;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  top: 80%;
  left: 45%;
  margin-left: -60px;
  &:after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 45%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #86cfeb transparent;
  }
`;

export const QuestionAssignerToolTipContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  &:hover ${QuestionAssignerToolTipText} {
    visibility: visible;
  }
`;
