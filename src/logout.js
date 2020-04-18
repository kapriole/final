// logout

import React from "react";
import axios from "./axios";
import { HashRouter, Link } from "react-router-dom";

/// any place to link

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios
            .post("/logout", {
                userId: this.state.userId,
            })
            .then(({ data }) => {
                if (data.success) {
                    // redirect to a page that is not welcome
                    this.setState({
                        loggedOut: true,
                    });
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((error) => {
                console.log("error in axios login post", error);
            });
        
        if (this.state.loggedOut) {
            setTimeout(location.replace("/welcome"), 5000);
        }

    }
    
    submit() {
        console.log("made it axios logout post route");

    }
                                       
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value,
        });
    }

    render() {
        return (
            <HashRouter>
                <div>
                    {this.state.error && (
                        <div className="error">
                            SORRY SOMETHINGS WRONG! TRY AGAIN!
                            <br></br>
                        </div>
                    )}
                    {this.state.loggedOut && (
                        <div className="loggedOut">
                            <Link to="/login"></Link>
                            <br></br>
                        </div>
                    )}
                </div>
            </HashRouter>
        );
    }        
                       
}

