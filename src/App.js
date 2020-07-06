import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { changeBaseCurrency, changeTermsCurrency, swapCurrencies } from './redux/currencies';
import { appLoaded } from './redux/appState';

export const AppComponent = (props) => {
    const { baseCurrency, termsCurrency, currenciesList, rate, onAppLoaded, onChangeBase, onChangeTerms, onSwap} = props;

    useEffect(onAppLoaded, []);
    const amount = 200;

  return (
    <div className="App">
      <header className="App-header">
        Exchange
      </header>
      <section>
        <div>
            <select value={baseCurrency} onChange={onChangeBase}>
                {currenciesList.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input value={amount}/>
        </div>
      </section>
      <button onClick={onSwap}>Flip {rate}</button>
      <section>
        <div>
            <select value={termsCurrency} onChange={onChangeTerms}>
                {currenciesList.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input value={amount * rate} />
        </div>
      </section>
      <button>Exchange</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
    currenciesList: state.currencies.currenciesList,
    baseCurrency: state.currencies.baseCurrency,
    termsCurrency: state.currencies.termsCurrency,
    rate: state.currencies.rate
});

const mapDispatchToProps = (dispatch) => ({
    onChangeBase: evt => dispatch(changeBaseCurrency(evt.target.value)),
    onChangeTerms: evt => dispatch(changeTermsCurrency(evt.target.value)),
    onSwap: () => dispatch(swapCurrencies()),
    onAppLoaded: () => dispatch(appLoaded())
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
