import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { takeLatest, all } from 'redux-saga/effects';

import {
    currenciesReducer,
    startSubscription,
    swapCurrencies,
    changeBaseCcy,
    changeTermsCcy,
    fetchCurrencies,
    receiveCurrencies
} from './redux/currencies';

import { 
    pocketsReducer,
    attemptTransaction,
    executeIfEnoughFunds
} from './redux/pockets';

import { appLoaded } from './redux/appState';

const rootReducer = combineReducers({
    currencies: currenciesReducer,
    pockets: pocketsReducer
});

export function* rootSaga() {
    yield all([
        takeLatest(
            [receiveCurrencies, swapCurrencies, changeBaseCcy, changeTermsCcy],
            startSubscription
        ),
        takeLatest(appLoaded, fetchCurrencies),
        takeLatest(attemptTransaction, executeIfEnoughFunds)
    ]);
};

export function createAppStore() {
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        rootReducer,
        {},
        composeEnhancers(applyMiddleware(sagaMiddleware))
    );

    sagaMiddleware.run(rootSaga);

    return store;
}
