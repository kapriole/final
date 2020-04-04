import React from "react";
import axios from "./axios"; // is this right?
import { HashRouter, Route } from "react-router-dom";

/// any place to link

import { Link } from "react-router-dom"; // is this right?

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        // from here you can use this.props
        // react checks for changing states
        this.state = {};
    }
    submit() {
        axios
            .post("/login", {
                email: this.state.email,
                pass: this.state.pass
                // what about the hashedpw?
            })
            .then(({ data }) => {
                if (data.success) {
                    // redirect to a page that is not welcome
                    location.replace("/login/welcome"); // user? 
                    // show a page for logged in users with the link to the reset password

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
            <HashRouter>
                <div>
                    {this.state.error && (
                        <div className="error">
                            SORRY SOMETHINGS WRONG! TRY AGAIN
                            <Link to="/login">Log in</Link>
                        </div>
                    )}
                    Email<br></br>
                    <input name="email" onChange={e => this.handleChange(e)} />
                    <br></br>
                    Password<br></br>
                    <input name="pass" onChange={e => this.handleChange(e)} />
                    <br></br>
                    <br></br>
                    <button onClick={() => this.submit()}>login</button>
                    <p>
                        If you are not yet a User<br></br>
                        <Link to="/register"> Register</Link>
                        <br></br>or if u are one<br></br>
                        <Link to="/reset/password/start">Reset Password</Link>
                    </p>
                </div>
            </HashRouter>
        );
    }
}
