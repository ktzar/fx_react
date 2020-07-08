import React from "react";
import { shallow, mount } from "enzyme";
import { CurrencyPanel } from "./CurrencyPanel";

describe("CurrencyPanel component", () => {
  let ccySpy, amountSpy, wrapper;

  const renderComponent = (extraProps) => {
    wrapper = mount(
      <CurrencyPanel
        editable
        currencies={["AAA", "BBB"]}
        ccy="AAA"
        funds={2000}
        amount={1234.23}
        onChangeCcy={ccySpy}
        onChangeAmount={amountSpy}
        {...extraProps}
      />
    );
  };

  beforeEach(() => {
    ccySpy = jest.fn();
    amountSpy = jest.fn();
  });

  it("renders the formatted funds amount with currency", () => {
    renderComponent();
    expect(wrapper.find(".balance").first().text()).toEqual(
      "Balance: AAA 2,000.00"
    );
  });

  it("renders the formatted amount in an input when editable", () => {
    renderComponent();
    expect(wrapper.find("input").props().value).toEqual(1234.23);
  });

  it("renders the formatted amount in a label when not editable", () => {
    renderComponent({ editable: false });
    expect(wrapper.find("label").text()).toEqual("1,234.23");
  });

  it("triggers onChangeCcy when changing the currecy", () => {
    renderComponent();
    wrapper.find("select").simulate("change", { target: { value: "BBB" } });
    expect(ccySpy).toHaveBeenCalled();
  });

  it("triggers onChangeAmount when changing the value", () => {
    renderComponent();
    wrapper.find("input").simulate("change", { target: { value: "333" } });
    expect(amountSpy).toHaveBeenCalled();
  });
});
