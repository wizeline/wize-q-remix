import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Note = styled.span` 
  align-self: flex-start;
  color: #717274;
  font-size: 10.5px;
  font-size: 0.7em;
  height: 1rem;
  line-height: 1rem;
  margin-top: 3px;
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  white-space: nowrap;

  > b {
    margin-right: 3px;
  }

  > i {
    margin-right: 3px;
  }

  code {
    background-color: #f7f7f9;
    border: 1px solid #e1e1e8;
    color: #717274;
    margin-right: 3px;
    &:nth-of-type(2) {
      margin-left: 3px;
    }
  }
  @media screen and (max-width: 767px){
    opacity: 0;
  }
`;