/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.div`
    max-height: 480px;
    overflow: auto;
    padding: 0px 30px;
    background: rgb(233,77,68);
    background: linear-gradient(0deg, rgba(233,77,68,1) 0%, rgba(0,167,229,0.8085828081232493) 51%, rgba(229,200,166,1) 100%);

  table {
    background: rgb(244, 247, 249);
    border-bottom: 1px solid black;
        tr{
            border-bottom: 1px solid black;
        }
    }
`;
