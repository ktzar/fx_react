import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import { currenciesReducer, newRate, swapCurrencies, changeAmount, changeBaseCcy, changeTermsCcy, receiveCurrencies, fetchCurrencies, initialState } from './currencies';
import { fetchCurrenciesList } from '../services/currencies';

describe('Currencies reducer', () => {
    it('can swap currencies', () => {
        const newState = currenciesReducer(initialState, swapCurrencies());

        expect(newState.baseCcy).toEqual('USD');
        expect(newState.termsCcy).toEqual('GBP');
    });

    it('can change the terms currency', () => {
        const newState = currenciesReducer(initialState, changeTermsCcy('ZZZ'));

        expect(newState.baseCcy).toEqual('GBP');
        expect(newState.termsCcy).toEqual('ZZZ');
    });

    it('can change the base currency', () => {
        const newState = currenciesReducer(initialState, changeBaseCcy('ZZZ'));

        expect(newState.baseCcy).toEqual('ZZZ');
        expect(newState.termsCcy).toEqual('USD');
    });

    it('can store the new rate', () => {
        const newState = currenciesReducer(initialState, newRate(1.33));

        expect(newState.rate).toEqual(1.33);
    });
});

describe('startSubscription saga', () => {
    expectSaga(fetchCurrencies)
        .provide([
            [matchers.call.fn(fetchCurrenciesList), ['aa', 'bb']]
        ])
        .put(receiveCurrencies(['aa', 'bb']))
        .run();
});
