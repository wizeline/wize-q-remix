/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { Link } from '@remix-run/react';
import img from 'app/images/header-background-dots-pattern.svg';

export const BackgroundDiv = styled.div`
    background-image: url(${img});
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
`;

export const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 60rem;
    margin-top: 3.5rem;
    width: 100%;
`;

export const Container = styled.div`
    align-items: center;
    margin: 0 auto;
    width: 70.4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (min-width: 768px) and (max-width: 1024px) {
        width: 704px;
    }

    @media (max-width: 767px) {
        width: 288px;
    }
`;

export const Img = styled.img`
    display: block;
    height: 12.5rem;
    margin-bottom: 5rem;
    max-width: 100%
`;

export const Title = styled.h2`
    font-size: 4rem;
    font-weight: bold;
    line-height: 1.25;
    text-align: center;
    margin: 0 0 5rem 0;
`;

export const SLink = styled(Link)`
    color: #fff;
    background-color: var(--color-secondary);
    border-radius: 5px;
    font-size: 1.6rem;
    padding: 1.5rem 4.1rem;
    text-decoration: none;

    &:hover {
        color: #fff;
        background-color: var(--color-secondary-hover);
        cursor: pointer;
        text-decoration: none;
    }

    &:active {
        background-color: var(--color-secondary-active);
    }
`;
