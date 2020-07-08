import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { formatRate } from "../utils/formatting";

const RoundSection = styled.button`
  border: 1px solid #ccc;
  background: white;
  border-radius: 20px;
  padding: 0 8px;
  color: #5dade2;
`;

export const Rate = (props) => {
  return (
    <RoundSection>
      💱 {props.baseCcy} 1 = {props.termsCcy} {props.rate}
    </RoundSection>
  );
};

Rate.propTypes = {
  baseCcy: PropTypes.string,
  termsCcy: PropTypes.string,
  rate: PropTypes.number,
};
