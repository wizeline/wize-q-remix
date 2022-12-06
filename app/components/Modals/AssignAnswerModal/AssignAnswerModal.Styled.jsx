/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { DropdownButton } from 'react-bootstrap';

export const AssignModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 1055;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);

    .job-title {
        font-size: 12px;
    }
`;

export const AssignModalDialog = styled.div`
    position: relative;
    border-radius: 5px;
    border: 0;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    margin: 0 auto;
    max-width: 70vw;
    padding: 24px 24px;
    width: 100%;
    display: block;
    max-height: calc(100vh - 150px);
    overflow-y: visible;

    @media (max-width: 768px) {
        max-height: 100%;
        max-width: 100%;
        height: 100%;
    }
`;

export const ModalHeader = styled.div`
    overflow-y: hidden;
    padding: 15px;
    box-sizing: border-box;
    display: block;
    font-size: 14px;
    ${(props) => (props.variant === 'logout' ? `
        border-bottom: 1px solid #e5e5e5;
        padding: 15px;` : `
        border-bottom: none;`
  )}
`;

export const ModalBody = styled.div`
    display: block;
    font-size: 14px;
    background-color: #fff;
    border-bottom: none;
    position: relative;
    padding: 15px;
    box-sizing: border-box;
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
    ${(props) => (props.variant === 'logout' ? `
        border-top: 1px solid #e5e5e5;
        padding: 15px;text-align: right;`
    : `
        border-bottom: none;`
  )}
`;

export const ModalTitle = styled.div`
    font-family: "Nunito";
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    letter-spacing: normal;
    margin-bottom: 8px;
`;

export const SelectContainer = styled.div`
    background-color: #fff;
    border: solid 1px #e1e5e9;
    box-shadow: 0 3px 6px 0 rgba(225, 229, 233, 0.8);
    height: 56px;
    margin-bottom: 19px;
    padding-left: 0;
    position: relative;
    max-width: 100%;
`;

export const CustDropDownButton = styled(DropdownButton)`
  background-color: #fff;
  border: none;
  border-radius: 0;
  color: var(--color-secondary);
  display: inline-block;
  height: 54px;
  letter-spacing: 0.8px;
  line-height: 1.71;
  padding-left: 10px;
  text-overflow: ellipsis;


  &:hover,
  &:active,
  &:focus {
    background-color: #fff;
    box-shadow: none;
    color: var(--color-secondary);
  }

  @media (max-width: 500px) {
    white-space: break-spaces;
  }

  
`;
