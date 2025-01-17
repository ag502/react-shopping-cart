import React from "react";
import ReactDOM from "react-dom/client";
import type {} from "styled-components/cssprop";

import App from "./App";
import { GlobalStyle, ResetStyle } from "./styles";

if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { worker } = require("./mocks/browser");
  worker.start();
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
  <>
    <ResetStyle />
    <GlobalStyle />
    <App />
  </>
  // </React.StrictMode>
);
