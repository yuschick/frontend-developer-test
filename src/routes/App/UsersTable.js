import React, { useState, useCallback, useEffect } from "react";

import DataTable from "../../components/DataTable";
import api from "../../lib/api";

import { SortDirection } from "../../types/sortDirection";
import { formatTableRowData } from "../../utils/formatTableRowData";

const UsersTable = () => {
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const result = await api.getUsersDiff();

      result.data.length
        ? setData((data) => data.concat(result.data))
        : setComplete(true);
    } catch (err) {
      setError(!!err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (data.length) return;
    fetchData();
  }, [data, fetchData]);

  return (
    <DataTable
      fetchData={fetchData}
      data={{
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
        rows: formatTableRowData(data),
      }}
      caption="A table of historical user updates"
      loading={loading}
      error={error}
      complete={complete}
      initialSortBy="date"
      initialSort={SortDirection.desc}
    />
  );
};

export default UsersTable;
