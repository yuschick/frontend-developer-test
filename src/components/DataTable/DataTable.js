import React, { Fragment, useState, useEffect } from "react";
import {
  shape,
  arrayOf,
  string,
  bool,
  func,
  number,
  oneOfType,
  oneOf,
} from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableSortLabel,
  TableBody,
  CircularProgress,
} from "@material-ui/core";

import TableActions from "./TableActions";
import ScreenReaderText from "../ScreenReaderText";
import { SortDirection, InvertSortDirection } from "../../types/sortDirection";

const DataTable = ({
  fetchData,
  loading,
  error,
  complete,
  summary,
  initialSortBy,
  initialSort,
  title,
  data,
}) => {
  const [tableData, setTableData] = useState([]);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortDirection, setSortDirection] = useState(initialSort);
  const classes = useStyles();

  useEffect(() => {
    if (!data.rows.length || !sortBy) return;

    const sorted = [...data.rows].sort((a, b) => {
      const itemA = a[sortBy].value.toString();
      const itemB = b[sortBy].value.toString();

      return sortDirection === SortDirection.desc
        ? itemB.localeCompare(itemA)
        : itemA.localeCompare(itemB);
    });

    setTableData(sorted);
  }, [data, sortDirection, sortBy]);

  return (
    <Fragment>
      <TableContainer
        component={Paper}
        summary={summary}
        data-test-id="table-data"
      >
        <Table className={classes.table}>
          <ScreenReaderText as="caption">{title}</ScreenReaderText>
          <TableHead>
            <TableRow>
              {data.cols.map((col) => (
                <TableCell key={uuidv4()}>
                  {col.sortable ? (
                    <TableSortLabel
                      active={sortBy === col.id}
                      disabled={loading}
                      direction={sortDirection}
                      onClick={() => {
                        sortBy !== col.id && setSortBy(col.id);
                        setSortDirection(InvertSortDirection[sortDirection]);
                      }}
                      data-test-id={`table-data-button-sort`}
                    >
                      {col.label}
                      <ScreenReaderText>
                        Table sorted
                        {true ? "ascending" : "descending"}.
                      </ScreenReaderText>
                    </TableSortLabel>
                  ) : (
                    col.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!tableData.length && loading && (
              <TableRow>
                <TableCell colSpan={data.cols.length}>
                  <Box display="flex" justifyContent="center" py={2}>
                    <CircularProgress data-test-id="table-data-spinner" />
                  </Box>
                </TableCell>
              </TableRow>
            )}
            {tableData.map((row) => (
              <TableRow key={uuidv4()}>
                {Object.keys(row).map((k, i) => (
                  <TableCell
                    key={uuidv4()}
                    data-test-id={`table-data-cell-${data.cols[i].id}`}
                  >
                    {row[k].label}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {!!data.rows.length && (
        <TableActions
          fetch={fetchData}
          loading={loading}
          error={error}
          complete={complete}
        />
      )}
    </Fragment>
  );
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

DataTable.propTypes = {
  fetchData: func.isRequired,
  loading: bool.isRequired,
  error: bool.isRequired,
  complete: bool.isRequired,
  summary: string.isRequired,
  initialSortBy: string.isRequired,
  initialSort: oneOf(Object.keys(SortDirection)).isRequired,
  title: string.isRequired,
  data: shape({
    cols: arrayOf(
      shape({
        label: string.isRequired,
        sortable: bool.isRequired,
      })
    ).isRequired,
    rows: arrayOf(
      shape({
        date: shape({
          value: oneOfType([string, number]).isRequired,
          label: string.isRequired,
        }),
        id: shape({
          value: oneOfType([string, number]).isRequired,
          label: string.isRequired,
        }),
        old: shape({
          value: oneOfType([string, number]).isRequired,
          label: string.isRequired,
        }),
        new: shape({
          value: oneOfType([string, number]).isRequired,
          label: string.isRequired,
        }),
      })
    ),
  }).isRequired,
};

export default DataTable;
