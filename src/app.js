/// WELCOME PAGE /////

import React from "react";
import axios from "./axios"; // this is already the copy // check this out (maybe solves issue with csurf)
import "./styles/app.css";
import Presentational from "./presentational";
import Uploader from "./uploader";
import Profile from "./profile";


// the state only changes thru the passed props! 

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }
    myMethod() {
        console.log("myMeth / imageUpload worked / works!");
        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });
    }
    // like mount in vue! console.log(this/self)
    componentDidMount() {
        console.log("my component has mounted!");
        var self = this;
        axios
            .get("/user")
            .then(function (userdata) {
                //console.log("data from user", userdata.data);
                // result has user data in it set the state of the user!
                 // redirect to a page that is not welcome
                                          console.log(
                                              "data.userdata",
                                              userdata.data
                                          );
                                          self.setState(
                                              userdata.data,
                                              console.log(
                                                  "userdata received",
                                                  userdata
                                              )
                                          );
                                          // show a page for logged in users with the link to the reset password                location.replace("/user/image_upload");
                                      }).catch(function (error) {
                                         
                console.log("error in axios get user info", error);
            });
}

    render() {
        return (
            <React.Fragment>
                <h2>Welcome to your Userprofile</h2>
                <Presentational
                    first={this.state.first}
                    last={this.state.last}
                    imgUrl={this.state.imgUrl}
                />
                <h2 onClick={() => this.toggleModal()}>toggle the uploader</h2>
                {this.state.uploaderIsVisible && <Uploader myMethod={() => this.setState({ imgUrl: this.state.imgUrl, uploaderVisibility: false })} />}
                <Profile />
            </React.Fragment>
        );
    }
}


// && if left side is thruthy right side will show

// add no default image to the table

// when someone clicks on the profile pic the uploader appears

// ()=>this.toggleModal() OR do the bind in the props