import React from "react";
import axios from "./axios"; // is this right?
import { Link } from "react-router-dom";

/// any place to link

export default class Reset extends React.Component {
    // I get a weird error message around here
    constructor(props) {
        super(props);
        // from here you can use this.props
        // react checks for changing states
        this.state = {
            step: "resetform"
        };
    }

    /// make various posts

    submit() {
        axios
            .post("/reset/password/start", {
                email: this.state.email
            })
            .then(({ data }) => {
                if (data.success) {
                    // redirect to the page that shows the input field for the password
                    this.setState({
                        step: "codenewpw"
                    });
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }


    checkCode() {
        axios
            .post("/reset/password/code", {
                email: this.state.email,
                code: this.state.code,
                newpassword: this.state.newpass
            })
            .then(({ data }) => {
                if (data.success) {
                    // redirect to the page that shows the input field for the password
                    this.setState({
                        step: "yeah"
                    });
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
            
    }

    getCurrentDisplay() {
        const step = this.state.step;
        if (step == "resetform") {
            return (
                <div>
                    {this.state.error && (
                        <div className="error">
                            SORRY SOMETHING WENT WRONG! TRY AGAIN
                            <a to="/reset/password/start">RESET</a>
                        </div>
                    )}
                    <h2>RESET PASSWORD</h2>
                    <p>
                        Please enter the email address with which you registered
                    </p><br></br>
                    Your Email<br></br>
                    <input name="email" onChange={e => this.handleChange(e)} />
                    <br></br>
                    <br></br>
                    <button onClick={() => this.submit()}>submit</button>
                </div>
            );
        } // step two: user clicks reset button
        // step three: user clicks send reset code
        else if (step == "codenewpw") {
            return (
                <div>
                    {this.state.error && (
                        <div className="error">
                            SORRY SOMETHING WENT WRONG! TRY AGAIN
                            <a to="/reset/password/code">RESET</a>
                        </div>
                    )}
                    <h2>PLS ENTER UR CODE AND NEW PASSWORD</h2>
                    <p>
                        Please enter the code you&aposve received via email you
                        used for registration
                    </p>
                    <input name="code" onChange={e => this.handleChange(e)} />
                    <input
                        name="newpass"
                        type="pass"
                        onChange={e => this.handleChange(e)}
                    />
                    <button onClick={() => this.submit()}>submit</button>
                </div>
            );
        } else if (step =="yeah") {
            return (
                <div>
                    {this.state.error && (
                        <div className="error">
                            SORRY SOMETHING WENT WRONG! TRY AGAIN
                            <a to="/reset/password/start">RESET</a>
                        </div>
                    )}
                    <h2>YEEEEEEEEAAAAAHHHHH</h2>
                </div>
            );
        }
        else { console.log("something gone wrong somewhere");}
    }
    
    handlechange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    render() {
        return <div>{this.getCurrentDisplay()}</div>;
    }
}

