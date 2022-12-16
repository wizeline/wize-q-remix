/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

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
    padding: 24px 24px;
    max-width: 70vw;

    @media (max-width: 768px) {
        max-height: 100%;
        max-width: 100%;
        height: 100%;
    }
`;

export const ModalBody = styled.div`
    display: block;
    font-size: 15px;
    background-color: #fff;
    border-bottom: none;
    position: relative;
    padding: 15px;
    box-sizing: border-box;
    text-align: justify;
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
    ${(props) => (props.variant === 'logout'
    ? `border-top: 1px solid #e5e5e5;
    padding: 15px;
    text-align: right;`
    : 'border-bottom: none;')}
`;

export const ModalHeader = styled.div`
    overflow-y: hidden;
    padding: 15px;
    box-sizing: border-box;
    display: block;
    font-size: 14px;
    ${(props) => (props.variant === 'logout'
    ? `border-bottom: 1px solid #e5e5e5;
        padding: 15px;`
    : 'border-bottom: none;')}
`;

export const ModalTitle = styled.div`
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    letter-spacing: normal;
    margin-bottom: 8px;
`;

export const ModalSubtitle = styled.div`
    font-size: 16px;
    font-weight: normal;
    letter-spacing: 0.6px;
    line-height: 1.71;
`;

export const ValueText = styled.span`
    color: ${(props) => props.color};
    font-weight: 600;
    font-size: 16px;
    text-decoration:  ${(props) => props.color} underline overline;
`;

export const ValuesInformation = styled.div`
    margin: 20px 0 20px 20px;
`;
