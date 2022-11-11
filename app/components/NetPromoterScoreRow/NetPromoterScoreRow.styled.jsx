import styled from 'styled-components';

export const NpsRowContainer = styled.div`
  background-color: var(--color-secondary);
  border: solid 1px rgba(80, 165, 231, 0.8);
  box-shadow: 0 3px 6px 0 rgba(225, 229, 233, 0.8);
  padding: 20px 24px 16px;
  width: 100%;

  > div {
    display: inline-block;
  }
`;

export const NpsRowDisplayText = styled.div`
  color: #fff;
  font-family: "NunitoSans Regular";
  font-size: 14px;
  letter-spacing: 0.6px;
  line-height: 1.71;
  vertical-align: top;
  width: 253px;

  p {
    padding-bottom: 0;
  }
`;

export const NpsRowOptionsContainer = styled.div`
  padding-left: 0;
  width: auto;
  height: auto;

  .nps-row__option--container {
    color: #fff;
    cursor: pointer;
    font-family: "NunitoSans Regular";
    font-size: 12px;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    position: relative;
    text-align: center;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .nps-row__option--container p {
    margin-bottom: 8px;
    width: 60px;
  }

  .nps-row__option--container input {
    cursor: pointer;
  }

  .nps-row__options--container label {
    margin-bottom: 0;
    margin-left: 32px;
  }

  .custom-radio {
    background-color: #fff;
    border-radius: 50%;
    display: block;
    height: 16px;
    margin: 0 auto;
    width: 16px;
  }

  .nps-row__option--container:hover input ~ .custom-radio {
    box-shadow: 0 0 0 2px var(--color-secondary-active);
  }

  .nps-row__option--container input:checked ~ .custom-radio {
    background-color: #fff;
  }

  .custom-radio::after {
    content: "";
    display: none;
    position: absolute;
  }

  .nps-row__option--container input:checked ~ .custom-radio::after {
    display: block;
  }

  .nps-row__option--container .custom-radio::after {
    background: #a2abaf;
    border-radius: 50%;
    height: 10px;
    margin: 3px;
    width: 10px;
  }

  .nps-row--container.invisible > div {
    width: auto;
  }
`;
