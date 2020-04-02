/// WELCOME PAGE /////

import React from "react";
import Registration from "./register";
import Login from "./login";
import Reset from "./reset";
  

import { HashRouter, Route } from "react-router-dom";
import "./styles/app.css";
// import styles

export default class Welcome extends React.Component {
    redner() {
        return (
            <HashRouter>
                <h1>Welcome!</h1>
                <img src="/public.logo.pgn" alt="logo" />
                <Route exact path="/" component={Registration}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/reset" component={Reset}></Route>;
            </HashRouter>
        );
    }
}

// have to update the reset part 