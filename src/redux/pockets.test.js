import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";

import {
  initialState,
  pocketsReducer,
  executeTransaction,
  executeIfEnoughFunds,
} from "./pockets";

describe("pocketsReducer", () => {
  it("can execute a transaction to a currency with no funds", () => {
    const newState = pocketsReducer(
      initialState,
      executeTransaction({
        baseCcy: "GBP",
        termsCcy: "AUD",
        dealtAmount: 10.25,
        notionalAmount: -10,
      })
    );

    expect(newState.amounts.AUD).toBe(10.25);
    expect(newState.amounts.GBP).toBe(90);
  });

  it("can execute a transaction to a currency with no funds", () => {
    const newState = pocketsReducer(
      initialState,
      executeTransaction({
        baseCcy: "GBP",
        termsCcy: "EUR",
        dealtAmount: 10.25,
        notionalAmount: 10,
      })
    );

    expect(newState.amounts.EUR).toBe(510.25);
  });
});

describe("executeIfEnoughFunds", () => {
  it("executes a transaction if enough funds", () => {
    expectSaga(executeIfEnoughFunds)
      .withState({
        pockets: { amounts: { GBP: 1000 } },
        currencies: { notionalAmount: 500, baseCcy: "GBP" },
      })
      .not.put(executeTransaction())
      .run();
  });

  it("does not execute a transaction if not enough funds", () => {
    expectSaga(executeIfEnoughFunds)
      .withState({
        pockets: { amounts: { GBP: 1000 } },
        currencies: { notionalAmount: 2000, baseCcy: "GBP" },
      })
      .not.put(executeTransaction())
      .run();
  });
});
