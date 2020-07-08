import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { formatRate } from "../utils/formatting";

const RoundSection = styled.button`
  border: 0;
  background: white;
  border-radius: 20px;
  padding: 6px 8px;
  background-color: #5dade2;
  color: white;

  &:hover,
  &:active,
  &:focus {
    outline: none;
  }
`;

export const Rate = (props) => {
  return (
    <RoundSection>
      ⤮ {props.baseCcy} 1 = {props.termsCcy} {formatRate(props.rate)}
    </RoundSection>
  );
};

Rate.propTypes = {
  baseCcy: PropTypes.string,
  termsCcy: PropTypes.string,
  rate: PropTypes.number,
};
