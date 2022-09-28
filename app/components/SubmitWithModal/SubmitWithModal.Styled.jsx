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
    ${props => (props.variant === 'submit' ? 'padding: 0px 24px;max-width: 55vw;' : 'padding: 24px 24px;max-width: 70vw;')}
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
    ${props => (props.variant === 'logout' ? 'border-top: 1px solid #e5e5e5;padding: 15px;text-align: right;' : 'border-bottom: none;')}
`;

export const ModalHeader = styled.div`
    overflow-y: hidden;
    padding: 15px;
    box-sizing: border-box;
    display: block;
    font-size: 14px;
    ${props => (props.variant === 'logout' ? 'border-bottom: 1px solid #e5e5e5;padding: 15px;' : 'border-bottom: none;')}
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


export const ProfileContainer = styled.div`
    border: 1px solid var(--color-secondary);
    float: left;
    height: 50px;
    overflow: hidden;
    text-align: center;
    width: 50px;
`;

export const ProfileImg = styled.img`
    height: 48px;
    width: 48px;
`;

export const IdentityWarning = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  line-height: 2vh;
  span {
    font-family: "Nunito", sans-serif;
    font-weight: 600;
  }
`;

export const WarningsHeader = styled.div`
  padding-bottom: 20px;
  span {
    font-family: "Nunito", sans-serif;
    font-weight: 600;
    padding-left: 8px;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding-top: 12px;
  padding-inline-start: 0;
  li {
    margin-bottom: 20px;
  }
`;

export const WarningIcon = styled(MdErrorOutline)`
  font-size: 5rem;
`;

export const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 30rem;
`;

export const IdentityMessage = styled.div`
  font-size: 2.5rem;
  text-align: center;
  line-height: 1;
`;

export const UserName = styled.p`
  font-size: 2rem;
  text-align: center;
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
