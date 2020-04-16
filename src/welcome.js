/// WELCOME PAGE /////

import React from "react";
import Registration from "./register";
import Login from "./login";
import Reset from "./reset";  

import { HashRouter, Route } from "react-router-dom";
import "./styles/app.css";
// import styles


export default class Welcome extends React.Component {
    render() {
        return (
            <HashRouter>
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "40%",
                        transform: "translate(-50%, -50%)",
                        fontFamily: "Impact, Charcoal, sans-serif",
                        color: "cornflowerblue",
                    }}
                >
                    <h1>Welcome to ...</h1>
                    <img src="./images/logo.png" width="40%" />
                    <Route exact path="/" component={Registration}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route
                        path="/reset/password/start"
                        component={Reset}
                    ></Route>
                </div>
            </HashRouter>
        );
    }
}

// have to update the reset part 

// link doesnt work to "/welcome#/login"