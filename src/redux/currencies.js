import { createAction, handleActions } from 'redux-actions';

const initialState = {
    baseCurrency: 'GBP',
    termsCurrency: 'USD',
    rate
};

//actions
export const swapCurrencies = createAction('SWAP_CURRENCIES');
export const newRate = createAction('NEW_RATE');
export const changeBaseCurrency = createAction('CHANGE_BASE_CCY');
export const changeTermsCurrency = createAction('CHANGE_TERMS_CCY');

export const currenciesReducer = handleActions(
    {
        [swapCurrencies]: (state, payload) => {
            return {
                ...state
            };
        },
        [newRate]: (state, payload) => {
            return {
                ...state
            };
        },
        [changeBaseCurrency]: (state, payload) => {
            return {
                ...state
            };
        },
        [changeTermsCurrency]: (state, payload) => {
            return {
                ...state
            };
        }
    },
    initialState
);

export function * startSubscription(action) {
    try {
    } catch (e) {
    }
}
