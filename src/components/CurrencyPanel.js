import React from 'react';
import styled from 'styled-components';

import { formatAmount } from '../utils/formatting';

const CurrencySection = styled.div`
    background: white;
    background: linear-gradient(0deg, white 0%, #ebebeb 100%);
    align-self: center;
    padding: 30px 8px;

    input, label {
        font-size: 30px;
    }
`;

const Amount = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Balance = styled.div`
    color: #888;
    text-align: left;
    margin: 16px 0;
    font-size: 14px;
`;

const CurrencySelect = styled.select`
  width: 120px;
  height: 35px;
  background: transparent;
  color: gray;
  padding-left: 5px;
  font-size: 30px;
  border: none;
  margin-left: 10px;
  cursor: pointer;
`;

const AmountInput = styled.input`
    width: 50%;
    text-align: right;
    background: transparent;
    border: 0;
`;

const AmountLabel = styled.label`
    color: #888;
`;

export const CurrencyPanel = ({editable, currencies, ccy, funds, amount, onChangeCcy, onChangeAmount}) => {
    return (
      <CurrencySection>
        <Amount>
            <CurrencySelect value={ccy} onChange={onChangeCcy}>
                {currencies.map(c => <option key={c} value={c}>{c}</option>)}
            </CurrencySelect>
            { editable
                ?  <AmountInput onChange={evt => onChangeAmount(evt, ccy)} value={amount}/>
                : <AmountLabel>{formatAmount(amount)}</AmountLabel>
            }
        </Amount>
        <Balance>
            { 'Balance: '+ ccy + ' ' + formatAmount(funds) }
        </Balance>
      </CurrencySection>
  );
};

//TODO proptypes
