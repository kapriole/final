import React from "react";
import axios from "./axios"; // is this right?

/// any place to link

export default class Profile extends React.Component {
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
            <div>
               
            </div>
        );
    }
}
