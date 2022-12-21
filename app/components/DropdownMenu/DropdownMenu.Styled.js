import styled from 'styled-components';

export const StyledMenu = styled.div`
    display:flex;
    background-color: #f1f1f1;
      border-radius: 20px;
      box-shadow: none;
      display: flex;
      font-family: "Nunito", sans-serif;
      width: 100%;
      color: black;
      margin-right:10px;
      @media screen and (max-width: 767px) {
        min-width: 250px;
      }

      & svg{
          color:inherit !important;
      }

      & button{
      background-color: #f1f1f1;
      border: none;
      border-radius: 20px;
      box-shadow: none;
      display: flex;
      font-size: 13px;
      letter-spacing: 0.4px;
      min-width: 150px;
      width: 100%; 
      }

     & button{
        background-color: ${(props) => (props.item === null ? '#f1f1f1' : 'var(--color-secondary)')};
        color: ${(props) => (props.item === null ? 'var(--color-dark-50)' : '#fff')};
      }

      & button:focus{
        background-color: ${(props) => (props.item === null ? '#f1f1f1' : 'var(--color-secondary)')};
        color: ${(props) => (props.item === null ? 'var(--color-dark-50)' : '#fff')};
      }

      & button:hover{
        background-color: ${(props) => (props.item === null ? '#f1f1f1' : 'var(--color-secondary)')};
        color: ${(props) => (props.item === null ? 'var(--color-dark-50)' : '#fff')};
      }

    
     
`;

export default StyledMenu;
