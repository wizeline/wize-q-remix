import styled from 'styled-components';

const handleColorType = (props) => {
  if (props.selected) {
    return 'var(--color-secondary-active)';
  } else if (props.notButton) {
    return 'var(--color-secondary)';
  }
  return '#31425a';
};

const setCursorType = (props) => {
  if (props.processingFormSubmission) {
    return 'not-allowed';
  }
  return 'pointer';
};

export const ContainerCounterButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 3px;
  color: ${props => handleColorType(props)};
  cursor: ${props => setCursorType(props)};
  display: inline-flex;
  flex-direction: row;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  font-weight: 600;
  justify-content: center;
  padding: 8px 10px;
  transition: all 0.3s ease-in-out;
  :hover {
    background-color: #f4f7f9;
  }
  img,
  span {
    align-items: flex-end;
    display: flex;
    min-height: 20px;
  }
  img {
    height: 17px;
    margin-right: 10px;
    width: 17px;
  }
`;

export const ContainerCounterButtonNotMobile = styled.div`
  display: unset;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
