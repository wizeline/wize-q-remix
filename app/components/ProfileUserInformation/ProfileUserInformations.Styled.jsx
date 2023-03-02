/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const ProfileContainer = styled.div`
    margin: 50px auto;
`;

export const UserImg = styled.img`
    border: 3px solid #fff;
    border-radius: 50%;
    box-shadow: 0 0 14px rgb(0 0 0 / 10%);
    min-height: 150px;
    left: 42px;
    overflow: hidden;
    position: relative;
    top: -75px;
    min-width: 150px;

    @media (max-width: 768px) {
        width: 70px;
        height: 70px;
        top: -50px;
    }
`;

export const BlueBar = styled.div`
    width: 100%;
    background: #203449;
    margin-top: 20px;
    height: 100px;
    display: flex;

    @media (max-width: 768px) {
       height: 70px;
    }
`;

export const ProfileName = styled.span`
    font-size: 30px;
    color: white;
    margin: auto;
    margin-left: 248px;

    @media (max-width: 768px) {
        font-size: 20px;
        margin-left: 150px;
        margin-bottom: 0px;
    }
`;

export const WhiteBar = styled.div`
    width: 100%;
    background: #FFFFFF;
    height: 100px;
    display: flex;

    @media (max-width: 768px) {
        height: 70px;
     }
`;

export const ImgContainer = styled.div`
    min-width: 248px;
    position: relative;

    @media (max-width: 768px) {
        min-width: 0px;
     }
`;

export const ContainerMetrics = styled.div`
    width: 100%;
    display: flex;
    align-items: center; 
`;

export const Metrics = styled.div`
    font-size: 30px;
    text-align: center;
    margin: 2%;
    font-weight: bolder;
    overflow-wrap: break-word;
    width: 100px;

    @media (max-width: 768px) {
        font-size: 16px;

     }
`;

export const LabelMetrics = styled.div`
     font-size: 16px;

     @media (max-width: 768px) {
        font-size: 10px;
     }
`;
