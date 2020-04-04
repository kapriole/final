/// Profile Component // is a Child of App

import React from "react";
import axios from "./axios"; // is this right?
import { Link } from "react-router-dom";
import Presentational from "./presentational";
import Bioeditor from "./bioeditor";


/// any place to link

export default class Profile extends React.Component {
    // I get a weird error message around here
    constructor(props) {
        super(props);
        // from here you can use this.props
        // react checks for changing states
        this.state = {
            first: this.state.first,
            last: this.state.last,
            imgUrl: this.state.imgUrl,
            bio: this.state.bio
        };
    }

    /// make various posts

    submit() {
        axios
            .post("/profile", {
                email: this.state.email
            })
            .then(({ data }) => {
                if (data.success) {
                    // redirect to the page that shows the input field for the password
                    this.setState({
                        step: "code_newpw"
                    });
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
        return <div>
            <Presentational></Presentational>
            <Bioeditor></Bioeditor>
        </div>;
    }
}


