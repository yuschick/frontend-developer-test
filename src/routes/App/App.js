import React from "react";
import styled from "styled-components";

import UsersTable from "./UsersTable";
import ProjectsTable from "./ProjectsTable";

const App = () => {
  return (
    <StyledPage>
      <UsersTable />
      <ProjectsTable />
    </StyledPage>
  );
};

const StyledPage = styled.main`
  display: grid;
  grid-gap: var(--spacing-three);
  padding: var(--spacing-two) var(--spacing-three);
`;

export default App;
