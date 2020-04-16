import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

// redux

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";

// socket

import { init } from "./socket";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

if (location.pathname == "/welcome") {
    var elem = <Welcome />;
} else {
    init(store);
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}
// Provider provides access to app (and components in app)

// we only call ReactDOM render once in your whole project
ReactDOM.render(elem, document.querySelector("main"));