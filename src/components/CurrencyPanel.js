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
  margin-right: 20px;
  text-align: right;
  background: transparent;
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
  amount,
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
            onChange={(evt) => onChangeAmount(evt, ccy)}
            value={amount}
          />
        ) : (
          <AmountLabel>{formatAmount(amount)}</AmountLabel>
        )}
      </Amount>
      <Balance increases={!editable} ccy={ccy} funds={funds} />
    </CurrencySection>
  );
};

CurrencyPanel.propTypes = {
  editable: PropTypes.bool,
  currencies: PropTypes.array,
  ccy: PropTypes.string,
  funds: PropTypes.number,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChangeCcy: PropTypes.func,
  onChangeAmount: PropTypes.func,
};
