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

export const currenciesReducer = handleActions(
    {
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
        [changeBaseCurrency]: (state, payload) => {
            return {
                ...state,
                baseCurrency: payload.value // TODO check if same as terms
            };
        },
        [changeTermsCurrency]: (state, payload) => {
            return {
                ...state,
                termsCurrency: payload.value // TODO check if same as base
            };
        }
    },
    initialState
);

let subscription;
const POLLING_TIME = 1000;

function getPrice() {
    return parseFloat((1 + Math.random()).toFixed(4));
}

function createPriceChannel( ) {
    return eventChannel( emit => {
        emit({newPrice: getPrice()});
        const interval = setInterval(() => {
            emit({newPrice: getPrice()});
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
        subscription = yield call(createPriceChannel, {/*TODO currencies info */});

        while (true) {
            const message = yield take(subscription);
            console.log({message});
            yield put(newRate(message.newPrice));
        }

    } catch (e) {
    }
}
