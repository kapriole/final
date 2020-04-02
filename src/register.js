import React from "react";
import axios from "./axios";

/// any place to link

import { Link } from "react-router-dom"; // is this right?

// link can only be in a router

// this ie the constructor called by react

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        // from here you can use this.props
        // react checks for changing states
        this.state = {};
    }
    submit() {
        axios
            .post("/register", {
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                pass: this.state.pass
            })
            .then(({ data }) => {
                if (data.success) {
                    // redirect to a page that is not welcome
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    handlechange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
    render() {
        return (
            <div>
                {this.state.error && (
                    <div className="error">SORRY SOMETHINGS WRONG!</div>
                )}
                <input name="first" onChange={e => this.handleChange(e)} />
                <input name="last" onChange={e => this.handleChange(e)} />
                <input name="email" onChange={e => this.handleChange(e)} />
                <input name="pass" onChange={e => this.handleChange(e)} />
                <button onClick={() => this.submit()}>register</button>
                <p>
                    If you are a User <a href="">LOGIN!</a>
                    <Link to="/login">Log in</Link>
                </p>
            </div>
        );
    }
}
