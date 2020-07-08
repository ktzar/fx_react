import React from "react";
import { shallow, mount } from "enzyme";
import { createStore } from "redux";
import { Provider } from "react-redux";

import { App, AppComponent } from "./App";
import { CTAButton } from "./components/CTAButton";

describe("App component", () => {
  it("triggers onAppLaoded on mounting", () => {
    const spy = jest.fn();
    const wrapper = mount(
      <AppComponent onAppLoaded={spy} currenciesList={[]} pockets={[]} />
    );
    expect(spy).toHaveBeenCalled();
  });

  it("renders the basic structure", () => {
    const spy = jest.fn();
    const wrapper = mount(
      <AppComponent onAppLoaded={spy} currenciesList={[]} pockets={[]} />
    );
    expect(wrapper.find("AppHeader").length).toEqual(1);
    expect(wrapper.find("CurrencyPanel").length).toEqual(2);
    expect(wrapper.find(".central-bar").length).toEqual(2);
    expect(wrapper.find(CTAButton).length).toEqual(1);
  });
});

describe("App", () => {
  const state = {
    currencies: {
      currenciesList: ["AAA", "BBB", "CCC"],
      notionalAmount: 10,
      notionalCcy: "CCC",
      termsCcy: "AAA",
      baseCcy: "CCC",
      rate: 1.234,
    },
    pockets: {
      amounts: { GBP: 200, EUR: 400 },
    },
  };
  const store = createStore((st) => st, state);
  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(wrapper.find("AppComponent").props()).toEqual(
    expect.objectContaining({
      notionalAmount: 10,
      notionalCcy: "CCC",
      currenciesList: ["AAA", "BBB", "CCC"],
      baseCcy: "CCC",
      termsCcy: "AAA",
      isExchangeDisabled: true,
      rate: 1.234,
      pockets: { GBP: 200, EUR: 400 },
    })
  );
});
