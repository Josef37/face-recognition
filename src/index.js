import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { signin, register, app, profile } from "./reducers";

import 'bootstrap/dist/css/bootstrap.min.css'
import "tachyons";
import "./index.css";

const store = createStore(
  combineReducers({ signin, register, app, profile }),
  applyMiddleware(thunkMiddleware, createLogger())
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
