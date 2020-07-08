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
    notionalAmount,
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
    <AppContainer>
      <AppHeader>Exchange</AppHeader>

      <CurrencyPanel
        editable
        currencies={currenciesList}
        ccy={baseCcy}
        funds={basePocket}
        amount={baseAmount}
        changed={recentTransaction}
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
        changed={recentTransaction}
        funds={termsPocket}
        amount={termsAmount}
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
  notionalAmount: state.currencies.notionalAmount,
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
  onChangeAmount: (evt, notionalCcy) =>
    dispatch(changeAmount({ value: evt.target.value, notionalCcy })),
  onSwap: () => dispatch(swapCurrencies()),
  onAppLoaded: () => dispatch(appLoaded()),
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
