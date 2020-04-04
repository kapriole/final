import React from "react";
import axios from "./axios";

/// any place to link

// link can only be in a router

// this ie the constructor called by react

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        // from here you can use this.props
        // react checks for changing states
        this.state = {
        };
    }
    submit() {
        console.log("Im in the axios submit post");
        console.log("this.state", this.state);
        axios
            .post("/register", {
                first: this.state.first,
                last: this.state.last,
                element: this.state.element,
                email: this.state.email,
                pass: this.state.pass
            })
            .then(({ data }) => {
                if (data.success) {
                    // redirect to a page that is not welcome e.g. profile edit
                    alert("Thank you for your registration!");
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    handleChange({ target }) {
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
                First Name <br></br>
                <input
                    name="first"
                    label="first name"
                    onChange={e => this.handleChange(e)}
                />
                <br></br>
                Last Name <br></br>
                <input name="last" onChange={e => this.handleChange(e)} />
                <br></br>
                Element <br></br>
                <select name="element" onChange={e => this.handleChange(e)}>
                    <option value="fire">Fire</option>
                    <option value="ice">
                        Ice
                    </option>
                    <option value="candy">
                        Candy
                    </option>
                    <option value="slime">
                        Slime
                    </option>
                </select>
                <br></br>
                Email <br></br>
                <input
                    name="email"
                    type="email"
                    onChange={e => this.handleChange(e)}
                />
                <br></br>
                Password <br></br>
                <input
                    name="pass"
                    type="password"
                    onChange={e => this.handleChange(e)}
                />
                <br></br> <br></br>
                <button onClick={() => this.submit()}>register</button>
                <p>
                    If you are a User <br></br>
                    <a to="/login">Log in</a>
                </p>
            </div>
        );
    }
}
