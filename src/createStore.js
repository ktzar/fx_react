import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { takeLatest, all } from 'redux-saga/effects';

import {
    currenciesReducer,
    startSubscription,
    swapCurrencies,
    changeBaseCurrency,
    changeTermsCurrency,
    fetchCurrencies
} from './redux/currencies';

import { appLoaded } from './redux/appState';

const rootReducer = combineReducers({
    currencies: currenciesReducer
});

export function* rootSaga() {
    yield all([
        takeLatest(
            [swapCurrencies, changeBaseCurrency, changeTermsCurrency],
            startSubscription
        ),
        takeLatest(appLoaded, fetchCurrencies)
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
