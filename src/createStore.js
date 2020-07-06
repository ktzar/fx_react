import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { takeLatest } from 'redux-saga/effects';

import { currenciesReducer, startSubscription } from './redux/currencies';

const rootReducer = combineReducers({
    currencies: currenciesReducer
});

export function* rootSaga() {
    yield [
        takeLatest(
            [swapCurrencies, changeBaseCurrency, changeTermsCurrency],
            startSubscription
        )
    ];
};

export function createAppStore() {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(rootSaga);

    return store;
}
