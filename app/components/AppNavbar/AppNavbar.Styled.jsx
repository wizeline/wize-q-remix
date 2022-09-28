import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';

export const AppNav = styled(Navbar).attrs(props => ({
  fluid: true,
}))` 
  background-color: white;
  border-color: white;
  border-radius: 0;
  margin-bottom: 0;
  padding: 5px;
  width: 100%;
  .dropdown.btn-group {
    float: left;
    margin-left: 30px;
  }
`;