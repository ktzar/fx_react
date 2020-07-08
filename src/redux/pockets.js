import { createAction, handleActions } from "redux-actions";
import { delay, select, put } from "redux-saga/effects";

export const initialState = {
  amounts: {
    USD: 200,
    EUR: 500,
    GBP: 100,
  },
  recentTransaction: false,
};

export const recentTransactionDone = createAction("RECENT_TRANSACTION_DONE");
export const executeTransaction = createAction("EXECUTE_TRANSACTION");
export const attemptTransaction = createAction("ATTEMPT_TRANSACTION");

export const pocketsReducer = handleActions(
  {
    [recentTransactionDone]: (state) => {
      return {
        ...state,
        recentTransaction: false,
      };
    },
    [executeTransaction]: (state, { payload }) => {
      const { baseCcy, termsCcy, baseAmount, termsAmount } = payload;

      const newBaseAmount = state.amounts[baseCcy] + baseAmount;
      const newDealtAmount =
        (state.amounts[termsCcy] ? state.amounts[termsCcy] : 0) + termsAmount;

      return {
        ...state,
        recentTransaction: true,
        amounts: {
          ...state.amounts,
          [baseCcy]: newBaseAmount,
          [termsCcy]: newDealtAmount,
        },
      };
    },
  },
  initialState
);

export function* executeIfEnoughFunds() {
  const state = yield select();
  const { baseAmount, termsAmount, baseCcy, termsCcy } = state.currencies;
  const pocketAmounts = state.pockets.amounts;

  if (pocketAmounts[baseCcy] >= parseFloat(baseAmount)) {
    yield put(
      executeTransaction({
        baseCcy,
        termsCcy,
        baseAmount: parseFloat(baseAmount) * -1,
        termsAmount: parseFloat(termsAmount),
      })
    );
    yield delay(500);
    yield put(recentTransactionDone());
  }
}
