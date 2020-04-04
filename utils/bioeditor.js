// is a Child of Profile
// aka Grandkid of App

/// Profile Component // is a Child of App

import React from "react";
import axios from "./axios"; // is this right?
import { Link } from "react-router-dom";


/// any place to link

export default class Bioeditor extends React.Component {
    // I get a weird error message around here
    constructor(props) {
        super(props);
        // from here you can use this.props
        // react checks for changing states
        this.state = {
            first: this.state.first,
            last: this.state.last,
            imgUrl: this.state.imgUrl,
            bio: this.state.bio,
            bioEditorIsVisible: false
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
                        step: "updatebio"
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

    updateBio() {
        console.log(this.props);
        // if bio exists turn off the textarea!
    }

    // send the props to the profile and from the profile to the APP !!!!

    editBio() {
        this.setState({
            bioEditorIsVisible: true
        });
       
        // if bioeditor is visible render a textfield!
        // make textarea appear
    }

    render() {
        
        
        return (
            <div>
                <button onClick={() => this.editBio()}>
                                Click here to edit your Bio!
                </button>
                <textarea></textarea>
            </div>
        );
    }
    
}


