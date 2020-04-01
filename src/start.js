import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
// is Register imported thru Welcome?
import Logo from "./logo";

// add all the components that should end up in the bundle

// we only call ReactDOM render once in your whole project

if (location.pathname == "/welcome") {
    var elem = <Welcome />;
} else {
    <Logo />;
}

// render the wrapper
ReactDOM.render(elem, document.querySelector("main"));

// property document.cookie (Javascript could read the cookie/ but middleware prevents that)

// is the user logged in or not?
// if the user is logged out the url is /welcome
