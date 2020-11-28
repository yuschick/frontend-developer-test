import React, { Fragment, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import format from "date-fns/format";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable({ fetch, caption }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetch();
      console.log("DATA", result.data);
      setData([...data, ...result.data]);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [data, fetch]);

  useEffect(() => {
    if (data.length) return;
    fetchData();
  }, [data, fetchData]);
  const classes = useStyles();

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label={caption}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Old Value</TableCell>
              <TableCell>New Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
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

      <FooterContainer>
        {loading ? (
          <CircularProgress />
        ) : (
          <Fragment>
            {error && (
              <Typography color="error" role="alert">
                We had problems fetching your data. Please try again.
              </Typography>
            )}
            <Button variant="contained" color="primary" onClick={fetchData}>
              {error ? "Retry" : "Load more"}
            </Button>
          </Fragment>
        )}
      </FooterContainer>
    </Fragment>
  );
}

const FooterContainer = styled.div`
  display: grid;
  grid-gap: var(--spacing-two);
  margin: var(--spacing-two) 0;
  place-items: center;
`;
