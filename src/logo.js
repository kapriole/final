/// WELCOME PAGE /////

import React from "react";
import "./styles/app.css";

// import

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {}
   }
    render() {
        return (
            <div>
                <h1>Hello from app</h1>
                <img src="./images/logo.png" />
                <background-img
                    src="./public/images/clouds.png"
                    alt="background"
                />
            </div>
        );
    }
}
