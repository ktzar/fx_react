import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import posed from "react-pose";

import { formatAmount } from "../utils/formatting";

const BalanceContainer = styled.div`
  color: #888;
  text-align: left;
  margin: 16px 6px 16px 25px;
  font-size: 14px;
  position: relative;
  top: 0;
  transition: background;

  span {
    display: inline-block;
  }
`;

const AnimatedText = posed.span({
  down: { translateY: "5px", color: "#900" },
  up: { translateY: "-5px", color: "#090" },
  static: { translateY: "0px", color: "#888" },
});

export const Balance = ({ increases, changed, ccy, funds }) => {
  const pose = changed ? (increases ? "up" : "down") : "static";
  return (
    <BalanceContainer className="balance">
      {"Balance: " + ccy + " "}
      <AnimatedText pose={pose}>{formatAmount(funds)}</AnimatedText>
    </BalanceContainer>
  );
};

Balance.propTypes = {
  increases: PropTypes.bool,
  changed: PropTypes.bool,
  ccy: PropTypes.string,
  funds: PropTypes.number,
};
