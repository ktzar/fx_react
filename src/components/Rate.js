import React from 'react';
import styled from 'styled-components';

import { formatRate } from '../utils/formatting';

const RoundSection = styled.button`
    border: 1px solid #ccc;
    background: white;
    border-radius: 20px;
    color: #5DADE2;
`;

export const Rate = props => {
    return (
        <RoundSection>💱 {props.baseCcy}1 = {props.termsCcy}{props.rate}</RoundSection>
    );
};
