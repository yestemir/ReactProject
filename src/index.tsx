import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "./components/contexts/ThemeProvider";
import { Provider } from "react-redux";
import {
  LanguageContext,
  LanguageProvider,
} from "./components/contexts/LanguageProvider";
import store from "./store/index";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
