import React from "react";
import axios from "./axios"; // is this right?

/// any place to link

import { Link } from "react-router-dom"; 

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        // from here you can use this.props
        // react checks for changing states
        this.state = {};
    }
    
    submit() {
        console.log("made it axios login post route");

        axios
            .post("/login", {
                email: this.state.email,
                pass: this.state.pass,
                // what about the hashedpw?
            })
            .then(({ data }) => {
                if (data.success) {
                // redirect to a page that is not welcome
                    location.replace("/"); // user?
                // show a page for logged in users with the link to the reset password
                } else {
                    this.setState({
                        error: true,
                    });
                }
            }).catch(error => {
                console.log("error in axios login post", error);
            });
    }
                                       
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value,
        });
    }

    render() {
        return (
                <div>
                    {this.state.error && (
                        <div className="error">
                            SORRY SOMETHINGS WRONG! TRY AGAIN!
                            <br></br>
                        </div>
                    )}
                    <form>
                        Email<br></br>
                        <input
                            name="email"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <br></br>
                        Password
                        <br></br>
                        <input
                            name="pass"
                            type="password"
                            onChange={(e) => this.handleChange(e)}
                        />
                    </form>
                    <br></br>
                    <br></br>
                    <button onClick={() => this.submit()}>login</button>
                    <p>
                        If you are not yet a User<br></br>
                        <Link to="/register">Register</Link>
                        <br></br>or if u are one<br></br>
                        <Link to="/reset/password/start">Reset Password</Link>
                    </p>
                </div>
     
        );
    }        
                       
}

