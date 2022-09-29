import styled from 'styled-components';

export const Switch = styled.label`
position: relative;
display: inline-block;
width: 36px;
height: 20px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  input + span:before {
    transform: translate(1px, -1px);
  }
  input:checked + span {
    background-color: var(--toastify-color-progress-success);
  }
  
  input:focus + span {
    box-shadow: 0 0 1px #2196F3;
  }
  
  input:checked + span:before {
    -webkit-transform: translate(17px, -1px);
    -ms-transform: translate(17px, -1px);
    transform: translate(17px, -1px);
  }
`;

export const Slider = styled.span`
position: absolute;
cursor: pointer;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: #ccc;
-webkit-transition: .4s;
transition: .4s;
border-radius: 20px;
&:before {  
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 1px;
  bottom: 1px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}
`;