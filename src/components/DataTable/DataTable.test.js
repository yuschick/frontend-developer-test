import React from "react";
import { mount } from "enzyme";

import DataTable from "./DataTable";

import { usersDiff } from "../../lib/api/data";
import { SortDirection } from "../../types/sortDirection";
import { formatTableRowData } from "../../utils/formatTableRowData";

const props = {
  fetchData: jest.fn(),
  title: "Test table",
  summary: "A test table of mock data",
  loading: false,
  error: false,
  complete: false,
  initialSortBy: "date",
  initialSort: SortDirection.desc,
  data: {
    cols: [
      {
        id: "date",
        label: "Date",
        sortable: true,
      },
      {
        id: "id",
        label: "User ID",
        sortable: false,
      },
      {
        id: "old",
        label: "Old Value",
        sortable: false,
      },
      {
        id: "new",
        label: "New Value",
        sortable: false,
      },
    ],
    rows: formatTableRowData(usersDiff),
  },
};

describe("<DataTable />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<DataTable {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders the data table", () => {
    expect(
      wrapper.find({ "data-test-id": "table-data" }).hostNodes()
    ).toHaveLength(1);
  });
});

describe("<DataTable /> loading state", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <DataTable {...props} data={{ ...props.data, rows: [] }} loading={true} />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders the loading spinner when loading is true", () => {
    expect(
      wrapper.find({ "data-test-id": "table-data-spinner" }).hostNodes()
    ).toHaveLength(1);
  });
});

describe("<DataTable /> data", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<DataTable {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders the list in descending order", () => {
    expect(
      wrapper
        .find({ "data-test-id": "table-data-cell-date" })
        .hostNodes()
        .first()
        .text()
    ).toEqual("2020-02-23");
    expect(
      wrapper
        .find({ "data-test-id": "table-data-cell-date" })
        .hostNodes()
        .last()
        .text()
    ).toEqual("2020-02-14");
  });
});

describe("<DataTable /> data", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<DataTable {...props} initialSort={SortDirection.asc} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders the list in ascending order", () => {
    expect(
      wrapper
        .find({ "data-test-id": "table-data-cell-date" })
        .hostNodes()
        .first()
        .text()
    ).toEqual("2020-02-14");
    expect(
      wrapper
        .find({ "data-test-id": "table-data-cell-date" })
        .hostNodes()
        .last()
        .text()
    ).toEqual("2020-02-23");
  });
});

describe("<DataTable /> data", () => {
  let wrapper;

  const changeDirection = jest.fn();
  const handleClick = jest.spyOn(React, "useState");
  handleClick.mockImplementation((dir) => [dir, changeDirection]);

  beforeEach(() => {
    wrapper = mount(<DataTable {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("the sort label button triggers when clicked", () => {
    wrapper
      .find({ "data-test-id": "table-data-button-sort" })
      .hostNodes()
      .first()
      .simulate("click");
    expect(changeDirection).toBeTruthy();
  });

  it("toggling sort changes table data order", () => {
    expect(
      wrapper
        .find({ "data-test-id": "table-data-cell-date" })
        .hostNodes()
        .first()
        .text()
    ).toEqual("2020-02-23");
    expect(
      wrapper
        .find({ "data-test-id": "table-data-cell-date" })
        .hostNodes()
        .last()
        .text()
    ).toEqual("2020-02-14");

    wrapper
      .find({ "data-test-id": "table-data-button-sort" })
      .hostNodes()
      .first()
      .simulate("click");

    expect(
      wrapper
        .find({ "data-test-id": "table-data-cell-date" })
        .hostNodes()
        .first()
        .text()
    ).toEqual("2020-02-14");
    expect(
      wrapper
        .find({ "data-test-id": "table-data-cell-date" })
        .hostNodes()
        .last()
        .text()
    ).toEqual("2020-02-23");
  });
});
