import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { formatAmount } from "../utils/formatting";
import { Balance } from "./Balance";

const CurrencySection = styled.div`
  background: linear-gradient(0deg, white 0%, #ebebeb 100%);
  align-self: center;
  padding: 30px;
  width: 100%;

  input,
  label {
    font-size: 30px;
  }
`;

const Amount = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CurrencySelect = styled.select`
  width: 120px;
  height: 35px;
  background: transparent;
  color: gray;
  padding-left: 0;
  font-size: 30px;
  border: none;
  margin-left: 20px;
  cursor: pointer;
`;

const AmountInput = styled.input`
  width: 50%;
  color: ${(props) => (props.direction === "BUY" ? "#292" : "#922")};
  margin-right: 20px;
  text-align: right;
  border-radius: 20px;
  padding: 0 10px;
  background: rgba(128, 128, 128, 0.1);
  border: 0;
`;

const AmountLabel = styled.label`
  color: #888;
  margin-right: 20px;
`;

export const CurrencyPanel = ({
  editable,
  currencies,
  ccy,
  funds,
  direction,
  amount,
  changed,
  onChangeCcy,
  onChangeAmount,
}) => {
  return (
    <CurrencySection>
      <Amount>
        <CurrencySelect value={ccy} onChange={onChangeCcy}>
          {currencies.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </CurrencySelect>
        {editable ? (
          <AmountInput
            direction={direction}
            onChange={(evt) => onChangeAmount(evt, ccy)}
            value={amount}
          />
        ) : (
          <AmountLabel>{formatAmount(amount)}</AmountLabel>
        )}
      </Amount>
      <Balance
        changed={changed}
        increases={direction === "BUY"}
        ccy={ccy}
        insufficient={amount > funds && direction === "SELL"}
        funds={funds}
      />
    </CurrencySection>
  );
};

CurrencyPanel.propTypes = {
  editable: PropTypes.bool,
  direction: PropTypes.string,
  currencies: PropTypes.array,
  ccy: PropTypes.string,
  funds: PropTypes.number,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChangeCcy: PropTypes.func,
  changed: PropTypes.bool,
  onChangeAmount: PropTypes.func,
};
