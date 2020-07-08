import React from "react";
import styled from "styled-components";

const RoundButton = styled.button`
  border: 0;
  width: 30px;
  height: 30px;
  border-radius: 25px;
  font-size: 20px;
  cursor: pointer;
  background: ;
  background: ${(props) => (props.disabled ? "#999" : "#5dade2")};
  box-shadow: 0 5px 5px rgba(93, 173, 226, 0.3);
  color: white;
  position: relative;
  top: 2px;

  &:hover,
  &:active,
  &:focus {
    outline: none;
    background-color: #4d9dd2;
  }
`;

export const FlipButton = (props) => {
  return <RoundButton onClick={props.onClick}>⇵</RoundButton>;
};
