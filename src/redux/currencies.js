import { createAction, handleActions } from "redux-actions";
import { eventChannel } from "redux-saga";
import { select, take, put, call } from "redux-saga/effects";
import { inputToAmount } from "../utils/formatting";
import { fetchRate, fetchCurrenciesList } from "../services/currencies";

const POLLING_TIME = 10000;

export const initialState = {
  notionalAmount: 10,
  notionalCcy: "GBP",
  currenciesList: ["GBP", "USD"],
  baseCcy: "GBP",
  termsCcy: "USD",
  rate: 1.22,
};

export const newRate = createAction("NEW_RATE");
export const swapCurrencies = createAction("SWAP_CURRENCIES");
export const changeAmount = createAction("CHANGE_AMOUNT");
export const changeBaseCcy = createAction("CHANGE_BASE_CCY");
export const changeTermsCcy = createAction("CHANGE_TERMS_CCY");
export const receiveCurrencies = createAction("RECEIVE_CURRENCIES");

export const currenciesReducer = handleActions(
  {
    [changeAmount]: (state, { payload }) => {
      const { value, notionalCcy } = payload;
      const notionalAmount = inputToAmount(value);
      return {
        ...state,
        notionalAmount,
        notionalCcy,
      };
    },
    [receiveCurrencies]: (state, { payload }) => {
      return {
        ...state,
        currenciesList: payload,
      };
    },
    [swapCurrencies]: (state, payload) => {
      return {
        ...state,
        baseCcy: state.termsCcy,
        termsCcy: state.baseCcy,
      };
    },
    [newRate]: (state, { payload }) => {
      return {
        ...state,
        rate: payload,
      };
    },
    [changeBaseCcy]: (state, { payload }) => {
      return {
        ...state,
        baseCcy: payload === state.termsCcy ? state.baseCcy : payload,
      };
    },
    [changeTermsCcy]: (state, { payload }) => {
      return {
        ...state,
        termsCcy: payload === state.baseCcy ? state.termsCcy : payload,
      };
    },
  },
  initialState
);

let subscription;

export function* startSubscription() {
  try {
    if (subscription) {
      subscription.close();
    }
    const state = yield select();
    const { baseCcy, termsCcy } = state.currencies;

    subscription = eventChannel((emit) => {
      fetchRate(baseCcy, termsCcy).then((rate) => emit(rate));

      const interval = setInterval(() => {
        fetchRate(baseCcy, termsCcy).then((rate) => emit(rate));
      }, POLLING_TIME);

      return () => {
        clearInterval(interval);
      };
    });

    while (true) {
      const message = yield take(subscription);
      yield put(newRate(message));
    }
  } catch (e) {}
}

export function* fetchCurrencies() {
  try {
    const currencies = yield call(fetchCurrenciesList);
    yield put(receiveCurrencies(currencies));
  } catch (err) {
    //TODO error action to display message to the user
  }
}
