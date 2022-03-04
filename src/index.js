import React from "react";
import ReactDOM from "react-dom";

import "./styles/global-styles.css";

import { Home } from "./templates/Home";

// react renderizando dentro do elemento root através do método ReactDOM
// Um elemento descreve o que você quer ver na tela:
ReactDOM.render(
  // componentes do react (parâmetro da função "render")
  <React.StrictMode>
    <Home />
  </React.StrictMode>,

  // um elemento do DOM
  document.getElementById("root")
);
