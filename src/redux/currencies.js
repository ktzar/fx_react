import { createAction, handleActions } from 'redux-actions';
import { eventChannel } from 'redux-saga';
import { select, take, put, call } from 'redux-saga/effects';

const initialState = {
    currenciesList: ['GBP', 'USD'],
    dealtCurrency: 'GBP',
    baseCurrency: 'GBP',
    termsCurrency: 'USD',
    rate: 1.22
};

//actions
export const newRate = createAction('NEW_RATE');
export const swapCurrencies = createAction('SWAP_CURRENCIES');
export const changeBaseCurrency = createAction('CHANGE_BASE_CCY');
export const changeTermsCurrency = createAction('CHANGE_TERMS_CCY');
export const receiveCurrencies = createAction('RECEIVE_CURRENCIES');

export const currenciesReducer = handleActions(
    {
        [receiveCurrencies]: (state, {payload}) => {
            return {
                ...state,
                currenciesList: payload
            };
        },
        [swapCurrencies]: (state, payload) => {
            return {
                ...state,
                baseCurrency: state.termsCurrency,
                termsCurrency: state.baseCurrency
            };
        },
        [newRate]: (state, {payload}) => {
            return {
                ...state,
                rate: payload
            };
        },
        [changeBaseCurrency]: (state, {payload}) => {
            return {
                ...state,
                baseCurrency: payload // TODO check if same as terms
            };
        },
        [changeTermsCurrency]: (state, {payload}) => {
            return {
                ...state,
                termsCurrency: payload // TODO check if same as base
            };
        }
    },
    initialState
);

let subscription;
const POLLING_TIME = 20000;

function createPriceChannel({base, terms}) {
    return eventChannel( emit => {
        emitRate(emit, base, terms);
        const interval = setInterval(() => {
            emitRate(emit, base, terms);
        }, POLLING_TIME);

        return () => {
            clearInterval(interval);
        }
    });
}

export function* startSubscription(action) {
    try {
        if (subscription) {
            subscription.close();
        }
        const state = yield select();
        const base = state.currencies.baseCurrency;
        const terms = state.currencies.termsCurrency;
        console.log({base, terms});
        subscription = yield call(createPriceChannel, {base, terms});

        while (true) {
            const message = yield take(subscription);
            console.log({message});
            yield put(newRate(message));
        }

    } catch (e) {
    }
}

function emitRate(emit, baseCcy, termsCcy) {
    const uri = `https://api.exchangeratesapi.io/latest?symbols=${termsCcy}&base=${baseCcy}`;
    return fetch(uri)
        .then(d => d.json())
        .then(d => {emit(d.rates[termsCcy]);})
}

function fetchCurrenciesList() {
    return fetch('https://api.exchangeratesapi.io/latest?base=GBP')
        .then(d => d.json())
        .then(d => Object.keys(d.rates));
}

export function* fetchCurrencies() {
    try {
        const currencies = yield call(fetchCurrenciesList);
        yield put(receiveCurrencies(currencies));
    } catch(err) {
        //TODO error action to display something
    };
}
