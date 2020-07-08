import { createAction, handleActions } from 'redux-actions';
import { select, take, put, call } from 'redux-saga/effects';

export const initialState = {
    amounts: {
        USD: 200,
        EUR: 500,
        GBP: 100
    }
};

export const executeTransaction = createAction('EXECUTE_TRANSACTION');
export const attemptTransaction = createAction('ATTEMPT_TRANSACTION');

export const pocketsReducer = handleActions(
    {
        [executeTransaction]: (state, {payload}) => {
            const { baseCcy, termsCcy, dealtAmount, notionalAmount } = payload;

            const newNotionalAmount = state.amounts[baseCcy] + notionalAmount;
            const newDealtAmount = (state.amounts[termsCcy] ? state.amounts[termsCcy] : 0) + dealtAmount;

            return {
                ...state,
                amounts: {
                    ...state.amounts,
                    [baseCcy]: newNotionalAmount,
                    [termsCcy]: newDealtAmount
                }

            };
        }
    }, initialState
);

export function* executeIfEnoughFunds() {
    const state = yield select();
    const { notionalAmount, baseCcy, termsCcy, rate } = state.currencies;
    const pocketAmounts = state.pockets.amounts;

    if (pocketAmounts[baseCcy] >= notionalAmount) {
        yield put(executeTransaction({
            baseCcy,
            termsCcy,
            notionalAmount: notionalAmount * -1,
            dealtAmount: parseFloat((notionalAmount * rate).toFixed(2))
        }));
    }
}
