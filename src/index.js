import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";

import App from "./routes/App";

const GlobalStyle = createGlobalStyle`
  :root {
    --spacing-unit: 8px;
    --spacing-one: 8px;
    --spacing-two: 16px;
    --spacing-three: 24px;

    --color-light-primary: #e6e6e6;
    --color-dark-primary: #121212;

    --font-primary: 'Raleway', sans-serif;
  }

  * {
    border: 0;
    box-sizing: border-box;
    font-size: 100%;
    margin: 0;
    padding: 0;
	  vertical-align: baseline
  }

  html, body {
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: none;

    background: var(--color-light-primary);
    background-image: url("https://www.transparenttextures.com/patterns/dark-dotted-2.png");
    backface-visibility: hidden;
    color: --color-dark-primary;
    font-family: var(--font-primary);
    font-size: min(max(16px, 2vw), 18px);
    font-weight: 400;
    line-height: 1.75;

    @supports(font-size: clamp(1rem, 1vw, 1rem)) {
      font-size: clamp(16px, 2vw, 18px);
    }
  }
`;

ReactDOM.render(
  <Fragment>
    <GlobalStyle />
    <App />
  </Fragment>,
  document.getElementById("root")
);
