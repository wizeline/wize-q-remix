/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const LogoutModal = styled.div` 
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 2000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);  
`;

export const LogoutModalDialog = styled.div`
    position: relative;
    border-radius: 5px;
    border: 0;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    overflow: hidden;
    margin: 0 auto;
    max-width: 70vw;
    padding: 24px 0px;
    width: 100%;
    display: block;
    max-height: calc(100vh - 150px);
    overflow-y: auto;

    @media (max-width: 576px) {
        max-height: 90%;
        max-width: 90%;
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
    display: block;
    font-size: 14px;
    background-color: #fff;
    border-bottom: none;
    position: relative;
    padding: 15px;
    box-sizing: border-box;
`;

export const ModalTitle = styled.div`
    font-family: "Nunito";
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    letter-spacing: normal;
    margin-bottom: 8px;
`;
