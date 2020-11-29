import React from "react";
import styled from "styled-components";

import UsersTable from "./UsersTable";
import ProjectsTable from "./ProjectsTable";

const App = () => {
  return (
    <StyledPage data-test-id="app">
      <UsersTable data-test-class="app-table" />
      <ProjectsTable data-test-class="app-table" />
    </StyledPage>
  );
};

const StyledPage = styled.main`
  display: grid;
  grid-gap: var(--spacing-three);
  padding: var(--spacing-two) var(--spacing-three);
`;

export default App;
