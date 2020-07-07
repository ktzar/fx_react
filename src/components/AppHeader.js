import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
    font-size: 24px;
    color: #333;
    padding: 5px 0
`;

export const AppHeader = props => {
    return (
      <Header className="App-header">
        {props.children}
      </Header>
    );
};
