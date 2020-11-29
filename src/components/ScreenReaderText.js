import React from "react";
import styled from "styled-components";

const ScreenReaderText = ({ as, children }) => {
  return <Hidden as={as}>{children}</Hidden>;
};

const Hidden = styled.span`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export default ScreenReaderText;
