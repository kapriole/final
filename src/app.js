import React from "react";
import axios from "./axios"; // this is already the copy 
import { BrowserRouter, Route } from "react-router-dom";
import "./styles/app.css";
import Logo from "./logo";
import Uploader from "./uploader";
import Profile from "./profile";
import ProfilePic from "./profilepic";
import OtherProfile from "./otherprofile";
import FindPeople from "./findpeople";


export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }
    
    componentDidMount() {
        console.log("my app component has mounted!");
        var self = this;
        axios
            .get("/user")
            .then(function (userdata) {
                console.log("data", userdata.data);
                self.setState({
                    id: userdata.data.userId,
                    first: userdata.data.first,
                    last: userdata.data.last,
                    element: userdata.data.element,
                    imgUrl: userdata.data.imgUrl, // check the name
                    bio: userdata.data.bio // get more userdata from the DB!
                });
            }).catch(function (error) {                                                   
                console.log("error in axios get user info", error);
            });
    }  

    // set the data in the componentDidMount function

    //// pass the props !!
    
    setBio(newBio) {
        console.log(" updateBio worked / works!");
        this.setState({
            // bioEditorIsVisible: !this.state.bioEditorIsVisible,
            bio: newBio // is whatever the user typed in
        });
    }

    toggleModal() {
        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });
    }

    // get the current imgUrl // pass imgUrl an argument to give it to the children
    myImgUrl(newImgUrl) {
        console.log(" imageUpload worked / works!");
        this.setState({
            imgUrl: newImgUrl,
            uploaderIsVisible: !this.state.uploaderIsVisible});
    }

    render() {
        console.log(this.state);
        console.log("props in app", this.props.first);

        // reorganize the structure

        // make a fixed header

        //check if all the right props/methods are passed to the children! in render

        return (
            <BrowserRouter>
                <div
                    style={{
                        position: "relative",
                        fontFamily: "Impact, Charcoal, sans-serif",
                        color: "cornflowerblue",
                    }}
                >
                    <Logo />
                    <ProfilePic
                        first={this.state.first}
                        last={this.state.last}
                        imgUrl={this.state.imgUrl}
                    />
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                id={this.state.id}
                                first={this.state.first}
                                last={this.state.last}
                                element={this.state.element}
                                imgUrl={this.state.imgUrl}
                                toggleModal={() => this.toggleModal()}
                                onClick={this.toggleModal}
                                bio={this.state.bio}
                                setBio={(newBio) => this.setBio(newBio)}
                            />
                        )}
                    />
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            myImgUrl={(newImgUrl) => this.myImgUrl(newImgUrl)}
                            toggleModal={() => this.toggleModal()}
                        />
                    )}
                    <Route
                        path="/user/:id"
                        render={(props) => (
                            <OtherProfile
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />
                    <Route
                        path="/users"
                        render={() => (
                            <FindPeople
                                id={this.state.id}
                                first={this.state.first}
                                last={this.state.last}
                                imgUrl={this.state.imgUrl}
                            />
                        )}
                    />
                </div>
            </BrowserRouter>
        );
    }
}


// && if left side is thruthy right side will show

// add no default image to the table

// when someone clicks on the profile pic the uploader appears
