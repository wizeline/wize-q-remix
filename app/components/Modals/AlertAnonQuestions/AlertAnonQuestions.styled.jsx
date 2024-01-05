/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { MdErrorOutline } from 'react-icons/md';

export const Modal = styled.div` 
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 1050;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalDialog = styled.div`
    position: relative;
    border-radius: 5px;
    border: 0;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    overflow: hidden;
    margin: 0 auto;
    width: 100%;
    display: block;
    max-height: calc(100vh - 150px);
    overflow-y: auto;
    padding: 0px 24px;
    max-width: 55vw;
    @media (max-width: 768px) {
        max-width: 80vw;
    }
    @media (max-width: 576px) {
        max-height: 100%;
        max-width: 100%;
        height: 100%;
    }
`;

export const ModalFooter = styled.div`
    border-top: none;
    background-color: #fff;
    border-bottom: none;
    padding: 15px;
    text-align: right;
    box-sizing: border-box;
    display: block;
    font-size: 14px;
    ${(props) => (props.variant === 'logout' ? 'border-top: 1px solid #e5e5e5;padding: 15px;text-align: right;' : 'border-bottom: none;')}
`;

export const ModalHeader = styled.div`
    overflow-y: hidden;
    padding: 15px;
    box-sizing: border-box;
    display: block;
    font-size: 14px;
    ${(props) => (props.variant === 'logout' ? 'border-bottom: 1px solid #e5e5e5;padding: 15px;' : 'border-bottom: none;')}
`;

export const ModalBody = styled.div`
  float: right;
  cursor: pointer;
`;

export const WarningContainer = styled.div`
  display: flex;
  gap: 10px;
  border-radius: 5px;
  background-color: #F8E9B7;
  color: #9f640b;
  justify-content: space-evenly;
  width: 80%;
  margin: 0 auto;
  align-items: center;
  padding: 15px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  @media (max-width: 768px) {
    width: 90%;
  }
  @media (max-width: 576px) {
    width: 100%;
  }
`;

export const WarningIcon = styled(MdErrorOutline)`
  font-size: 5rem;
`;

export const Warnings = styled.div`
  list-style-type: none;
  margin: 0;
  text-align: left;
  padding: 3px;
  p {
    margin: 0;
    font-size: 1.5rem;
  }
`;

export const LinkContainer = styled.div`
text-align: center;
font-size: 1.5rem;
padding-top: 20px;
`;
