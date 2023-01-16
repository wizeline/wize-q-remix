/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import img from 'app/images/caret-down-solid.svg';

export const FooterDiv = styled.div`
    background-color: #f4f7f9;
    color: #a2abaf;
    font-size: 12px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px 15px 70px;

    @media (max-width: 400px) {
        padding: 0 15px 20px;
    }
`;

export const FooterContainer = styled.div`
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
    text-align: center;

    @media (min-width: 1200px) {
        width: 1170px;
    }

    @media (min-width: 992px) and (max-width: 1199px) {
        width: 970px;
    }

    @media (min-width: 768px) and (max-width: 991px) {
        width: 750px;
    }
`;

export const FooterLink = styled.a`
    color: #666;

    &:hover {
        text-decoration: underline;
    }
`;

export const ContactInputDiv = styled.div`
    background-color: #f4f7f9;
    box-sizing: border-box;
    min-height: 64.8752vh;
    padding: 2% 0 7%;
    position: relative;
    text-align: center;
`;

export const ContactForm = styled.form`
    align-items: center;
    display: flex;
    flex-direction: column;
    margin: auto;
    padding: 20px;
    border-radius: 4px;
    box-sizing: border-box;
    max-width: 390px;
    width: 100%;
`;

export const ContactFormP = styled.p`
    border-radius: 4px;
    box-sizing: border-box;
    display: inline-block;
    margin: 10px 0;
    max-width: 390px;
    padding: 12px 16px;
    width: 100%;
    color: var(--color-dark-50);
    line-height: 24px;
`;

export const ContactSelect = styled.select`
    -moz-appearance: none; /* Firefox */
    -webkit-appearance: none; /* Safari and Chrome */
    appearance: none;
    background: #fff url(${img}) no-repeat;
    background-position-x: calc(100% - 16px);
    background-position-y: 6px;
    background-size: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    color: #222;
    cursor: pointer;
    display: inline-block;
    height: 40px;
    border-radius: 4px;
    box-sizing: border-box;
    margin: 10px 0;
    max-width: 390px;
    padding: 12px 16px;
    width: 100%;
`;

export const ContactTextArea = styled.textarea`
    border: 1px solid #ccc;
    height: 150px;
    border-radius: 4px;
    box-sizing: border-box;
    display: inline-block;
    margin: 10px 0;
    max-width: 390px;
    padding: 12px 16px;
    width: 100%;
    resize: none;
    overflow: auto;
    border-radius: 4px;
    box-sizing: border-box;
`;

export const BtnContainer = styled.div`
    padding: 12px 0;
    border-radius: 4px;
    box-sizing: border-box;
    display: inline-block;
    margin: 10px 0;
    max-width: 390px;
    width: 100%;
`;

export const SubmitBtn = styled.button`
    background-color: var(--color-secondary);
    border-radius: 3px;
    border: none;
    color: #fff;
    cursor: pointer;
    margin: 4px 2px;
    padding: 12px 32px;
    text-decoration: none;
    width: 100%;
    text-transform: none;
    overflow: visible;

    &:hover {
        background-color: #00a7e587;
    }
`;

export const SuccessDiv = styled.div`
    background-color: white;
    color: var(--color-dark-50);
    margin-top: 50px;
    max-width: 500px;
    padding: 30px 20px;
    margin-right: auto;
    margin-left: auto;  

    @media (min-width: 1200px) {
        width: 1170px;
    }

    @media (min-width: 992px) and (max-width: 1199px) {
        width: 970px;
    }

    @media (min-width: 768px) and (max-width: 991px) {
        width: 750px;
    }
`;

export const ContactCardDiv = styled.div`
    background-color: #1c1c1c;
`;

export const ContactInputHeader = styled.div`
    background-color: #fff;
    text-align: center;
    font-size: 14px;
    margin: 0 auto;
    box-sizing: border-box;
`;

export const ContactInputHeaderH1 = styled.h1`
    color: #a2abaf;
    letter-spacing: 1.5px;
    padding: 72px 0 12px;
    text-transform: uppercase;
    font-size: 14px;
    margin: 0 auto;
    max-width: 390px;
`;

export const ContactInputHeaderH2 = styled.h2`
    color: var(--color-dark-50);
    font-size: 24px;
    font-weight: 600;
    padding: 12px 0 8px;
    margin: 0 auto;
    max-width: 390px;
`;

export const ContactInputHeaderP = styled.p`
    color: var(--color-dark-50);
    letter-spacing: 0.6px;
    line-height: 1.71;
    padding: 8px 10px 28px;
    font-size: 14px;
    margin: 0 auto;
    max-width: 390px;
`;

export const ContactInputSitesDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 0 auto;
    max-width: 390px;
`;

export const ContactInputGoTo = styled.div`
    margin: 20px 40px 40px;
    max-width: 390px;
`;

export const ContactInputGoToP = styled.p`
    font-size: 16px;
    margin: 8px 0 4px;
    padding: 0;
    max-width: 390px;
`;

export const ContactInputGoToA = styled.a`
    padding: 4px 0;
    white-space: nowrap;
    color: var(--color-secondary);
    margin: 0 auto;
    max-width: 390px;
`;

export const ContactInputGoToImg = styled.img`
    background-color: #f4f7f9;
    border-radius: 50%;
    box-shadow: 0 0 0 10px #f4f7f9;
    height: 28px;
    margin: 18px;
    width: 28px;
    max-width: 390px;
`;
