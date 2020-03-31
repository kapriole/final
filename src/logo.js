/// WELCOME PAGE /////

import React from "react";
import axios from "axios";
import "./styles/app.css";

// import

export default class Logo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // nothing so far
        };
        // OR YOU can bind directly in the method
        // this.handleClick = this.handleClick.bind(this);
    }

    // its like vue mounted
    componentDidMount() {
        axios.get("/");
        // what else comes in here?
    }

    // don't forget to bind!!

    redner() {
        return (
            <div>
                <img img-src="./public/images/logo.png" />
                <background-img
                    src="./public/images/clouds.png"
                    alt="background"
                />
            </div>
        );
    }
}
