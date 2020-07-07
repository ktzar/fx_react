import React from 'react';
import styled from 'styled-components';

const RoundButton = styled.button`
    border: 1px solid #666;
    background: white;
    width: 22px;
    height: 20px;
    border-radius: 20px;
    cursor: pointer;

    &:hover, &:active, &:focus {
        outline: none;
    }
`;

export const FlipButton = props => {
    return (
        <RoundButton onClick={props.onClick}>⇵</RoundButton>
    );
}
