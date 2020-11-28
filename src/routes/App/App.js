import React from "react";
import styled from "styled-components";

import api from "../../lib/api";
import DataTable from "../../components/DataTable";

const App = () => {
  return (
    <StyledPage>
      <DataTable
        caption="A table of historical user updates"
        request={api.getUsersDiff}
      />
      <DataTable
        caption="A table of historical project updates"
        request={api.getProjectsDiff}
      />
    </StyledPage>
  );
};

const StyledPage = styled.main`
  display: grid;
  grid-gap: var(--spacing-three);
  padding: var(--spacing-two) var(--spacing-three);
`;

export default App;
