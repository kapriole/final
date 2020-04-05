/// WELCOME PAGE /////

import React from "react";
import axios from "./axios"; // this is already the copy // check this out (maybe solves issue with csurf)
import "./styles/app.css";
import Logo from "./logo";
import Presentational from "./presentational";
import Uploader from "./uploader";
import Profile from "./profile";
import ProfilePic from "./profilepic";



// the state only changes thru the passed props! 

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }
    
    // like mount in vue! console.log(this/self)
    componentDidMount() {
        console.log("my app component has mounted!");
        var self = this;
        axios
            .get("/user")
            .then(function (userdata) {
                console.log("data", userdata.data);
                self.setState(userdata.data, console.log("userdata received", userdata));
            }).catch(function (error) {                                                   
                console.log("error in axios get user info", error);
            });
    }  //console.log("data from user", userdata.data);
    // result has user data in it set the state of the user!

    //// pass the props !! to the children 
    
    setBio(e) {
        console.log("myMeth / imageUpload worked / works!");
        this.setState({
            bioEditorIsVisible: !this.state.bioEditorIsVisible,
            bio: e
        });
    }
    toggleModal() {
        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });
    }
    // get the current imgUrl // pass imgUrl an argument to give it to the children
    myImgUrl() {
        console.log("myMeth / imageUpload worked / works!");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible});
    }
    render() {
        return (
            <React.Fragment>
                <div
                    style={{
                        position: "realtive",
                        fontFamily: "Impact, Charcoal, sans-serif",
                        color: "cornflowerblue",
                    }}
                >
                    <Logo />
                    <h2>Welcome to your Userprofile</h2>
                    <Presentational
                        first={this.state.first}
                        last={this.state.last}
                        imgUrl={this.state.imgUrl}
                    />
                    <h2 onClick={() => this.toggleModal()}>
                        toggle the uploader
                    </h2>
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            myImgUrl={() =>
                                this.setState({
                                    imgUrl: this.state.imgUrl,
                                    uploaderVisibility: false
                                })
                            }
                        />
                    )}
                    <Profile
                        id={this.state.id}
                        first={this.state.first}
                        last={this.state.last}
                        imgUrl={this.state.imgUrl}
                        onClick={this.toggleModal}
                        bio={this.state.bio}
                        setBio={(e)=>this.setBio(e)}
                    />
                    <ProfilePic
                        first={this.state.first}
                        last={this.state.last}
                        imgUrl={this.state.imgUrl}
                    />
                </div>
            </React.Fragment>
        );
    }
}


// && if left side is thruthy right side will show

// add no default image to the table

// when someone clicks on the profile pic the uploader appears

// ()=>this.toggleModal() OR do the bind in the props