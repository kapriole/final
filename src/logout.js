// logout

import React from "react";
import axios from "./axios"; // is this right?
import { HashRouter } from "react-router-dom";

/// any place to link

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    submit() {
        console.log("made it axios logout post route");

        axios
            .post("/logout", {
                userId: this.state.userId
            })
            .then(({ data }) => {
                if (data.success) {
                // redirect to a page that is not welcome
                    this.setState({
                        loggedOut: true
                    });
                    location.replace("/welcome");

                } else {
                    this.setState({
                        error: true
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
                            <alter>Thank you for joining Addventure Time! See you soon!</alter>
                            <br></br>
                        </div>
                    )}
                </div>
            </HashRouter>
        );
    }        
                       
}

