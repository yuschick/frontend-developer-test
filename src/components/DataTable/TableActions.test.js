import React from "react";
import { shallow, mount } from "enzyme";

import TableActions from "./TableActions";

describe("<TableActions />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TableActions />);
  });

  describe("render()", () => {
    it("renders the Actions", () => {
      expect(wrapper.find({ "data-test-id": "table-actions" })).toHaveLength(1);
    });
  });
});

describe("<TableActions /> loading state", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<TableActions loading={true} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders the loading spinner when loading is true", () => {
    expect(
      wrapper.find({ "data-test-id": "table-actions-spinner" }).hostNodes()
    ).toHaveLength(1);
  });

  it("does not render the action button when loading is true", () => {
    expect(
      wrapper.find({ "data-test-id": "table-actions-button-fetch" }).hostNodes()
    ).toHaveLength(0);
  });
});

describe("TableActions error state", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<TableActions error={true} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders the error text when error is true", () => {
    expect(
      wrapper.find({ "data-test-id": "table-actions-text-error" }).hostNodes()
    ).toHaveLength(1);
  });

  it("renders the the retry button when error is true", () => {
    expect(
      wrapper
        .find({ "data-test-id": "table-actions-button-fetch" })
        .hostNodes()
        .text()
    ).toEqual("Retry");
  });
});

describe("<TableActions /> complete state", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<TableActions complete={true} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders the complete text when complete is true", () => {
    expect(
      wrapper
        .find({ "data-test-id": "table-actions-text-complete" })
        .hostNodes()
    ).toHaveLength(1);
  });

  it("does not render the action button when complete is true", () => {
    expect(
      wrapper.find({ "data-test-id": "table-actions-button-fetch" }).hostNodes()
    ).toHaveLength(0);
  });
});

describe("<TableActions /> fetch state", () => {
  let wrapper;
  const action = jest.fn();

  beforeEach(() => {
    wrapper = mount(<TableActions fetch={action} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders the action button", () => {
    expect(
      wrapper.find({ "data-test-id": "table-actions-button-fetch" }).hostNodes()
    ).toHaveLength(1);
  });

  it("completes the fetch button action", () => {
    wrapper
      .find({
        "data-test-id": "table-actions-button-fetch",
      })
      .hostNodes()
      .simulate("click");

    expect(action.mock.calls.length).toEqual(1);
  });
});
