import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import "./App.css";
import {
  changeAmount,
  changeBaseCcy,
  changeTermsCcy,
  swapCurrencies,
} from "./redux/currencies";
import { attemptTransaction } from "./redux/pockets";
import { appLoaded } from "./redux/appState";
import { canExchange } from "./redux/selectors";

import { formatAmount } from "./utils/formatting";

import { CurrencyPanel } from "./components/CurrencyPanel";
import { FlipButton } from "./components/FlipButton";
import { Rate } from "./components/Rate";
import { AppHeader } from "./components/AppHeader";
import { CTAButton } from "./components/CTAButton";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CentralBar = styled.div`
  position: relative;
  top: 12px;
`;

export const AppComponent = (props) => {
  const {
    pockets,
    notionalAmount,
    notionalCcy,
    baseCcy,
    termsCcy,
    currenciesList,
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

  const baseAmount =
    notionalCcy === baseCcy
      ? notionalAmount
      : (notionalAmount / rate).toFixed(2);
  const termsAmount =
    notionalCcy === termsCcy
      ? notionalAmount
      : (notionalAmount * rate).toFixed(2);

  const basePocket = pockets[baseCcy] || pockets[baseCcy];
  const termsPocket = pockets[termsCcy] || pockets[termsCcy];

  return (
    <div className="App">
      <AppHeader>Exchange</AppHeader>
      <CurrencyPanel
        editable
        currencies={currenciesList}
        ccy={baseCcy}
        funds={basePocket}
        amount={baseAmount}
        onChangeCcy={onChangeBase}
        onChangeAmount={onChangeAmount}
      />

      <CentralBar className="central-bar">
        <FlipButton onClick={onSwap} />{" "}
        <Rate baseCcy={baseCcy} termsCcy={termsCcy} rate={rate} />
      </CentralBar>

      <CurrencyPanel
        editable={false}
        currencies={currenciesList}
        ccy={termsCcy}
        funds={termsPocket}
        amount={termsAmount}
        onChangeCcy={onChangeTerms}
      />

      <CTAButton onClick={onExchange} disabled={isExchangeDisabled}>
        Exchange
      </CTAButton>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notionalAmount: state.currencies.notionalAmount,
  notionalCcy: state.currencies.notionalCcy,
  currenciesList: state.currencies.currenciesList,
  baseCcy: state.currencies.baseCcy,
  termsCcy: state.currencies.termsCcy,
  isExchangeDisabled: !canExchange(state),
  rate: state.currencies.rate,
  pockets: state.pockets.amounts,
});

const mapDispatchToProps = (dispatch) => ({
  onExchange: (evt) => dispatch(attemptTransaction()),
  onChangeBase: (evt) => dispatch(changeBaseCcy(evt.target.value)),
  onChangeTerms: (evt) => dispatch(changeTermsCcy(evt.target.value)),
  onChangeAmount: (evt, notionalCcy) =>
    dispatch(changeAmount({ value: evt.target.value, notionalCcy })),
  onSwap: () => dispatch(swapCurrencies()),
  onAppLoaded: () => dispatch(appLoaded()),
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
