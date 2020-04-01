import React from "react";
import instance from "./axios"; // is this right?

/// any place to link

import { Link } from "react-router-dom"; // is this right?

class Reset extends React.Component {
    constructor(props) {
        super(props);
        // from here you can use this.props
        // react checks for changing states
        this.state = {};
    }

    /// make various posts

    submit() {
        instance
            .post("/reset", {
                email: this.state.email   
            })
            .then(({ data }) => {
                if (data.success) {
                    // redirect to the page that shows the input field for the password
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

    // use the class to to call the method on each new screen 
    // split it  into 3 methods and then var result = new Result 
    // result.firstScreen, result.secondScreen, ...

    getCurrentDisplay() {
        const step = this.state.step;
        // how to get the step ( with the right name )
        // step one: user is on page
        // is the responnse from the server if the mailadress exists
        if (step == "something") {
            return (
                <div>
                    {this.state.error && (
                        <div className="error">
                            SORRY SOMETHING WENT WRONG! TRY AGAIN
                            <Link to="/reset">RESET</Link>
                        </div>
                    )}
                    <h1>RESET PASSWORD</h1>
                    <p>
                        Please enter the email address with which you registered
                    </p>
                    <input name="email" onChange={e => this.handleChange(e)} />
                    <button onClick={() => this.submit()}>submit</button>
                </div>
            );
        } // step two: user clicks reset button
        // step three: user clicks send reset code
        else if (step == "something else") {
return (
    <div>
        {this.state.error && (
            <div className="error">
                SORRY SOMETHING WENT WRONG! TRY AGAIN
                <Link to="/reset">RESET</Link>
            </div>
        )}
        <h1>PLS ENTER UR CODE AND NEW PASSWORD</h1>
        <p>
            Please enter the code you've received via email you used for
            registration{" "}
        </p>
        <input name="code" onChange={e => this.handleChange(e)} />
        <input name="new_pass" onChange={e => this.handleChange(e)} />
        <button onClick={() => this.submit()}>submit</button>
    </div>
);        } else {
return (
    <div>
        {this.state.error && (
            <div className="error">
                SORRY SOMETHING WENT WRONG! TRY AGAIN
                <Link to="/reset">RESET</Link>
            </div>
        )}
        <h1>YEEEEEEEEAAAAAHHHHH</h1>
    </div>
);        }
    }
    render() {
        return <div>{this.getCurrentDisplay()}</div>;
    }
}

