/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const InputContainer = styled.div`
    align-items: top;
    background-color: #fff;
    border-bottom: 1px solid #e2e8ea;
    border-radius: 3px;
    display: flex;
    min-height: 44px;
`;

export const InputLeftElement = styled.div`
`;
export const InputRightElement = styled.div`
`;

export const InputElement = styled.input`
    border: none;
    box-shadow: none;
    display: block;
    font-size: 14px;
    height: 100%;
    width: 100%;
    outline: none;
`;

export const TextAreaElement = styled.textarea`
    border: none;
    box-shadow: none;
    display: block;
    font-size: 14px;
    height: 100%;
    width: 100%;
    outline: none;
    padding: 12px 8px;
    resize: none;
`;
