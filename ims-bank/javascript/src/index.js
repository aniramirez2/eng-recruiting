import { StrictMode } from "react";
import ReactDOM from "react-dom";

import { Bank } from "./components/Bank";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Bank />
  </StrictMode>,
  rootElement
);
