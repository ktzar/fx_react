import { createAction, handleActions } from 'redux-actions';
import { eventChannel } from 'redux-saga';
import { select, take, put, call } from 'redux-saga/effects';
import { inputToAmount } from '../utils/formatting';

const API_HOST = 'https://api.exchangeratesapi.io';

const initialState = {
    notionalAmount: 100,
    notionalCcy: 'GBP',
    currenciesList: ['GBP', 'USD'],
    dealtCcy: 'GBP',
    baseCcy: 'GBP',
    termsCcy: 'USD',
    rate: 1.22
};

//actions
export const newRate = createAction('NEW_RATE');
export const swapCurrencies = createAction('SWAP_CURRENCIES');
export const changeAmount = createAction('CHANGE_AMOUNT');
export const changeBaseCcy = createAction('CHANGE_BASE_CCY');
export const changeTermsCcy = createAction('CHANGE_TERMS_CCY');
export const receiveCurrencies = createAction('RECEIVE_CURRENCIES');

export const currenciesReducer = handleActions(
    {
        [changeAmount]: (state, {payload}) => {
            const {value, notionalCcy} = payload;
            const notionalAmount = Math.min(10000000, inputToAmount(value))
            return {
                ...state,
                notionalAmount,
                notionalCcy
            };
        },
        [receiveCurrencies]: (state, {payload}) => {
            return {
                ...state,
                currenciesList: payload
            };
        },
        [swapCurrencies]: (state, payload) => {
            return {
                ...state,
                baseCcy: state.termsCcy,
                termsCcy: state.baseCcy
            };
        },
        [newRate]: (state, {payload}) => {
            return {
                ...state,
                rate: payload
            };
        },
        [changeBaseCcy]: (state, {payload}) => {
            return {
                ...state,
                baseCcy: payload === state.termsCcy ? state.baseCcy : payload
            };
        },
        [changeTermsCcy]: (state, {payload}) => {
            return {
                ...state,
                termsCcy: payload === state.baseCcy ? state.termsCcy : payload
            };
        }
    },
    initialState
);

let subscription;
const POLLING_TIME = 20000;

export function* startSubscription(action) {
    try {
        if (subscription) {
            subscription.close();
        }
        const state = yield select();
        const base = state.currencies.baseCcy;
        const terms = state.currencies.termsCcy;

        subscription = eventChannel( emit => {
            emitRate(emit, base, terms);
            const interval = setInterval(() => {
                emitRate(emit, base, terms);
            }, POLLING_TIME);

            return () => {
                clearInterval(interval);
            }
        })

        while (true) {
            const message = yield take(subscription);
            yield put(newRate(message));
        }

    } catch (e) {
    }
}

function emitRate(emit, baseCcy, termsCcy) {
    const uri = `${API_HOST}/latest?symbols=${termsCcy}&base=${baseCcy}`;
    return fetch(uri)
        .then(d => d.json())
        .then(d => {emit(d.rates[termsCcy]);})
}
function fetchCurrenciesList() {
    return fetch(API_HOST + '/latest?base=GBP')
        .then(d => d.json())
        .then(d => {const ccys = Object.keys(d.rates); ccys.sort(); return ccys;});
}

export function* fetchCurrencies() {
    try {
        const currencies = yield call(fetchCurrenciesList);
        yield put(receiveCurrencies(currencies));
    } catch(err) {
        //TODO error action to display message to the user
    };
}
