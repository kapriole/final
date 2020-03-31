/// WELCOME PAGE /////

import React from "react";
import axios from "axios";
import Registration from "./register";
import "./styles/app.css";

// import

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            greeting: "Welcome to Addventure App"
        };
        // this.handleClick = this.handleClick.bind(this);
        // OR YOU can bind directly in the method
    }

    // its like vue mounted
    componentDidMount() {
        axios
            .get("/")
            .then(res => res.json(console.log("axios get / happend")))
            .then(greeting => this.setState({ greeting }));
        // what else comes in here?
    }

    windowLoad() {
        //axios.post / axios request
        this.setState({
            last: "vegetaaaaaaaaaa"
        });
    }

    // don't forget to bind!!

    redner() {
        return (
            <div className="Welcome">
                <background-img
                    src="./public/images/clouds.png"
                    alt="background"
                />
                <img className="welcome-logo" src="./public/images/logo.png" />
                <Registration />
            </div>
        );
    }
}
