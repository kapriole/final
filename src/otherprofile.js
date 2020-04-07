
import React from "react";
import axios from "./axios"; // this is already the copy // check this out (maybe solves issue with csurf)

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("this.props", this.props);

        const id = this.props.match.params.id; // this object contains the paths params from the router labeled with :colon
        axios.get(`/user/${id}.json`).then(
            data => {
                if (data.redirect) {
                    this.props.history.push("/");
                } else {
                    this.setState({ data });
                    // new data
                }
            }
        );
    }

    render() {
        return (
            <div>
                <h1>
                    {this.state.first} {this.state.last}
                </h1>
                <img src={this.state.imgUrl}></img>
                <p value={this.state.bio}>P Tag for your biotext</p>
            </div>
        );
    }
            
}

// props is passed to set state?