import styled from 'styled-components';

export const LoginDiv = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    margin-top: -100px;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const LoginSubDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const SH3 = styled.h3`
    text-align: center;
    color: #646464;
    margin-bottom: 35px;
    font-family: 'Nunito';
    font-size: 25px;
    letter-spacing: 0.4px;
`;

export const Span = styled.span`
    ${props => (props.variant === 'bold' ? 'font-family: "Nunito";' : 'font-family: "Nunito";')}
`;

export const Paragraph = styled.p`
    text-align: center;
    color: #646464;
    font-family: 'Nunito';
    font-size: 18px;
    letter-spacing: 0.7px;
    margin-top: 35px;
`;