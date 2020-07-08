import React from "react";
import { shallow, mount } from "enzyme";
import { FlipButton } from "./FlipButton";

describe("FlipButton component", () => {
  it("renders an icon", () => {
    const wrapper = shallow(<FlipButton />);
    expect(wrapper.text()).toEqual("⇵");
  });

  it("triggers onClick when clicking it", () => {
    const spy = jest.fn();
    const wrapper = mount(<FlipButton onClick={spy} />);
    wrapper.find("button").simulate("click");

    expect(spy).toHaveBeenCalled();
  });
});
