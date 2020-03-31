import React from "react";
import axios from "axios";

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
                email: this.state.email
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
        /*
        this[target.name]
            = target.value;
        */

        // you only should update setState
        // this is like v-model // we take the most current value

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
                </p>
            </div>
        );
    }
}
