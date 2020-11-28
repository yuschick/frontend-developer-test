import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import { func, string } from "prop-types";
import format from "date-fns/format";

import DataTableActions from "./DataTableActions";
import ScreenReaderText from "./ScreenReaderText";

import useDataFetch from "../hooks/useDataFetch";

const SortDirection = Object.freeze({ asc: "asc", desc: "desc" });
const InvertSortDirection = Object.freeze({
  [SortDirection.asc]: SortDirection.desc,
  [SortDirection.desc]: SortDirection.asc,
});

const DataTable = ({ request, caption }) => {
  const [data, setData] = useState([]);
  const { loading, error, complete, rawData, fetchData } = useDataFetch();
  const [sortDirection, setSortDirection] = useState(SortDirection.desc);

  const classes = useStyles();

  useEffect(() => {
    if (rawData.length || !request) return;
    fetchData(request);
  }, [rawData, fetchData, request]);

  useEffect(() => {
    if (!rawData.length) return;

    const sorted = [...rawData].sort((a, b) =>
      sortDirection === SortDirection.desc
        ? b.timestamp - a.timestamp
        : a.timestamp - b.timestamp
    );

    setData(sorted);
  }, [rawData, sortDirection]);

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label={caption}>
          <TableHead>
            <TableRow>
              <TableCell sortDirection={sortDirection}>
                <TableSortLabel
                  active
                  disabled={loading}
                  direction={sortDirection}
                  onClick={() =>
                    setSortDirection(InvertSortDirection[sortDirection])
                  }
                >
                  Date
                  <ScreenReaderText>
                    Table sorted
                    {sortDirection === SortDirection.asc
                      ? "ascending"
                      : "descending"}
                    .
                  </ScreenReaderText>
                </TableSortLabel>
              </TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Old Value</TableCell>
              <TableCell>New Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!data.length && loading && (
              <TableRow>
                <TableCell colSpan={4}>
                  <TableSpinnerContainer>
                    <CircularProgress />
                  </TableSpinnerContainer>
                </TableCell>
              </TableRow>
            )}
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className={classes.date}>
                  {format(item.timestamp, "yyyy-MM-d")}
                </TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.diff[0].oldValue}</TableCell>
                <TableCell>{item.diff[0].newValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {!!data.length && (
        <DataTableActions
          fetch={() => fetchData(request)}
          loading={loading}
          error={error}
          complete={complete}
        />
      )}
    </Fragment>
  );
};

const TableSpinnerContainer = styled(Box)`
  display: flex;
  justify-content: center;
  margin: var(--spacing-two) 0;
`;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  date: {
    whiteSpace: "nowrap",
  },
});

DataTable.props = {
  request: func.isRequired,
  caption: string.isRequired,
};

export default DataTable;
