import React from "react";
import ReactDOM from "react-dom/client";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import store from "./store";
import { Provider } from "react-redux";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <React.StrictMode>
      {/* <ErrorBoundary> */}
      <Provider store={store}>
        <App />
      </Provider>
      {/* </ErrorBoundary> */}
    </React.StrictMode>
  </>
);
