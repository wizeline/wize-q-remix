import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';

// eslint-disable-next-line
export const AppNav = styled(Navbar)` 
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