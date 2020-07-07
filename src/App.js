import React, {useEffect} from 'react';
import './App.css';
import { connect } from 'react-redux';
import { changeAmount, changeBaseCcy, changeTermsCcy, swapCurrencies } from './redux/currencies';
import { attemptTransaction } from './redux/pockets';
import { appLoaded } from './redux/appState';

import { formatAmount } from './utils/formatting';

export const AppComponent = (props) => {
    const { pockets, notionalAmount, notionalCcy, baseCcy, termsCcy, currenciesList, rate } = props;
    const { onAppLoaded, onChangeBase, onChangeTerms, onSwap, onChangeAmount, onExchange } = props;

    useEffect(onAppLoaded, []);

    const baseAmount = notionalCcy === baseCcy ? notionalAmount : (notionalAmount / rate).toFixed(2);
    const termsAmount = notionalCcy === termsCcy ? notionalAmount : (notionalAmount * rate).toFixed(2);

    const basePocket = pockets[baseCcy] || pockets[baseCcy];
    const termsPocket = pockets[termsCcy] || pockets[termsCcy];


  return (
    <div className="App">
      <header className="App-header">
        Exchange
      </header>
      <section>
        <div>
            <select value={baseCcy} onChange={onChangeBase}>
                {currenciesList.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input onChange={evt => onChangeAmount(evt, baseCcy)} value={baseAmount}/>
        </div>
        <div>
            { basePocket ? `${formatAmount(basePocket)} ${baseCcy} available` : `No ${baseCcy} funds available` }
        </div>
      </section>
      <button onClick={onSwap}>Flip {rate}</button>
      <section>
        <div>
            <select value={termsCcy} onChange={onChangeTerms}>
                {currenciesList.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <label>{formatAmount(termsAmount)}</label>
        </div>
        <div>
            { termsPocket ? `${formatAmount(termsPocket)} ${termsCcy} available` : `No ${termsCcy} funds available` }
        </div>
      </section>
      <button onClick={onExchange}>Exchange</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
    notionalAmount: state.currencies.notionalAmount,
    notionalCcy: state.currencies.notionalCcy,
    currenciesList: state.currencies.currenciesList,
    baseCcy: state.currencies.baseCcy,
    termsCcy: state.currencies.termsCcy,
    rate: state.currencies.rate,
    pockets: state.pockets.amounts
});

const mapDispatchToProps = (dispatch) => ({
    onExchange: evt => dispatch(attemptTransaction()),
    onChangeBase: evt => dispatch(changeBaseCcy(evt.target.value)),
    onChangeTerms: evt => dispatch(changeTermsCcy(evt.target.value)),
    onSwap: () => dispatch(swapCurrencies()),
    onChangeAmount: (evt, notionalCcy) => dispatch(changeAmount({value: evt.target.value, notionalCcy})),
    onAppLoaded: () => dispatch(appLoaded())
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
