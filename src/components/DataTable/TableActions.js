import React, { Fragment, useEffect, useRef } from "react";
import styled from "styled-components";
import { Button, CircularProgress, Typography } from "@material-ui/core";
import { bool, func } from "prop-types";

const TableActions = ({ fetch, loading, error, complete }) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted) return;
    isMounted.current = true;
  }, [isMounted]);

  return (
    <ActionsContainer>
      {isMounted && loading ? (
        <CircularProgress />
      ) : (
        <Fragment>
          {error && (
            <Typography color="error" role="alert">
              We had problems fetching your data. Please try again.
            </Typography>
          )}
          {complete ? (
            <Typography>All historical data shown.</Typography>
          ) : (
            <Button variant="contained" color="primary" onClick={fetch}>
              {error ? "Retry" : "Load more"}
            </Button>
          )}
        </Fragment>
      )}
    </ActionsContainer>
  );
};

const ActionsContainer = styled.div`
  display: grid;
  grid-gap: var(--spacing-two);
  margin: var(--spacing-two) 0;
  place-items: center;
`;

TableActions.props = {
  fetch: func.isRequired,
  loading: bool.isRequired,
  error: bool.isRequired,
  complete: bool.isRequired,
};

export default TableActions;
