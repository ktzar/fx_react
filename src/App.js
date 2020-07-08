import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import {
  changeAmount,
  changeBaseCcy,
  changeTermsCcy,
  swapCurrencies,
} from "./redux/currencies";
import { attemptTransaction } from "./redux/pockets";
import { appLoaded } from "./redux/appState";
import { canExchange } from "./redux/selectors";

import { CurrencyPanel } from "./components/CurrencyPanel";
import { FlipButton } from "./components/FlipButton";
import { Rate } from "./components/Rate";
import { AppHeader } from "./components/AppHeader";
import { CTAButton } from "./components/CTAButton";

const AppContainer = styled.div`
  text-align: center;
  font-family: Helvetica, Arial, sans;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const CentralBar = styled.div`
  position: relative;
  top: 16px;
`;

export const AppComponent = (props) => {
  const {
    pockets,
    baseAmount,
    termsAmount,
    notionalCcy,
    baseCcy,
    termsCcy,
    currenciesList,
    recentTransaction,
    rate,
  } = props;
  const {
    onAppLoaded,
    onChangeBase,
    onChangeTerms,
    onSwap,
    onChangeAmount,
    onExchange,
  } = props;
  const { isExchangeDisabled } = props;

  useEffect(onAppLoaded, []);

  const basePocket = pockets[baseCcy] || pockets[baseCcy];
  const termsPocket = pockets[termsCcy] || pockets[termsCcy];

  return (
    <AppContainer>
      <AppHeader>Exchange</AppHeader>

      <CurrencyPanel
        editable
        currencies={currenciesList}
        ccy={baseCcy}
        direction="SELL"
        funds={basePocket}
        amount={baseAmount}
        changed={recentTransaction}
        onChangeCcy={onChangeBase}
        onChangeAmount={(evt) => onChangeAmount(evt, baseCcy)}
      />

      <CentralBar className="central-bar">
        <FlipButton onClick={onSwap} />{" "}
        <Rate baseCcy={baseCcy} termsCcy={termsCcy} rate={rate} />
      </CentralBar>

      <CurrencyPanel
        editable
        currencies={currenciesList}
        direction="BUY"
        ccy={termsCcy}
        changed={recentTransaction}
        funds={termsPocket}
        amount={termsAmount}
        onChangeAmount={(evt) => onChangeAmount(evt, termsCcy)}
        onChangeCcy={onChangeTerms}
      />

      <CTAButton
        onClick={onExchange}
        disabled={recentTransaction || isExchangeDisabled}
      >
        Exchange
      </CTAButton>
    </AppContainer>
  );
};

const mapStateToProps = (state) => ({
  baseAmount: state.currencies.baseAmount,
  termsAmount: state.currencies.termsAmount,
  notionalCcy: state.currencies.notionalCcy,
  currenciesList: state.currencies.currenciesList,
  baseCcy: state.currencies.baseCcy,
  termsCcy: state.currencies.termsCcy,
  isExchangeDisabled: !canExchange(state),
  rate: state.currencies.rate,
  pockets: state.pockets.amounts,
  recentTransaction: state.pockets.recentTransaction,
});

const mapDispatchToProps = (dispatch) => ({
  onExchange: (evt) => dispatch(attemptTransaction()),
  onChangeBase: (evt) => dispatch(changeBaseCcy(evt.target.value)),
  onChangeTerms: (evt) => dispatch(changeTermsCcy(evt.target.value)),
  onChangeAmount: (evt, ccy) =>
    dispatch(changeAmount({ value: evt.target.value, ccy })),
  onSwap: () => dispatch(swapCurrencies()),
  onAppLoaded: () => dispatch(appLoaded()),
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
