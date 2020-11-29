import React from "react";
import { shallow } from "enzyme";
import App from "./App";

describe("<App />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  describe("render()", () => {
    it("renders the App", () => {
      expect(wrapper.find({ "data-test-id": "app" })).toHaveLength(1);
    });
  });

  describe("render()", () => {
    it("renders the users and projects tables", () => {
      expect(wrapper.find({ "data-test-class": "app-table" })).toHaveLength(2);
    });
  });
});
