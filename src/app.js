/// WELCOME PAGE /////

import React from "react";
import axios from "./axios"; // this is already the copy // check this out (maybe solves issue with csurf)
import "./styles/app.css";
import Presentational from "presentational";
import Uploader from "./uploader";

// import

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "Pete",
            last: "Anderson",
            uploaderIsVisible: !this.state.uploaderIsVisible
        };
    }
    myMethod() {
        console.log("myMeth works!");
        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });
    }
    componentDidMount() {
        console.log("my component has mounted!");
        axios. get("/user")
            .then(({ data }) => {
                if (data.success) {
                    // result has user data in it set the state of the user!
                    // redirect to a page that is not welcome
                    this.setState({
                        first: data.body.user.first, // console.log the response!
                        last: data.body.user.first,
                        imgUrl: data.body.user.url,
                        uploaderIsVisible: true // or false?
                    }, () => console.log("data received", data)
                    );
                    location.replace("/user/image_upload");
                    // show a page for logged in users with the link to the reset password

                } else {
                    this.setState({
                        error: true
                    });
                }
            }); // or another then and then setState
        // we need a new route (GET)
        // res.json it back to here
        // we have the info back and set the state!
    }
    toggleModal() {
        this.setState({ uploaderVisible: true });
    }
    redner() {

        return (
            <React.Fragment>
                {" "}
                <h2>Im the presentaional component</h2>
                <Presentational
                    firstname={this.state.first}
                    lastname={this.state.last}
                    imgUrl={this.state.imgUrl}
                />
                <h2 onClick={() => this.toggleModal()}>toggle the uploader</h2>
                {this.state.uploaderIsVisible && <Uploader />}
            </React.Fragment>
        );
    }
}

// && if left side is thruthy right side will show

// add no default image to the table

// when someone clicks on the profile pic the uploader appears

// ()=>this.toggleModal() OR do the bind in the props