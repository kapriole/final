import React from "react";
import axios from "./axios"; // this is already the copy 
import { BrowserRouter, Route, Link } from "react-router-dom";
import Logo from "./logo";
import Uploader from "./uploader";
import Profile from "./profile";
import ProfilePic from "./profilepic";
import OtherProfile from "./otherprofile";
import FindPeople from "./findpeople";
import Friends from "./hooks/friends";
import Chat from "./hooks/chat";
import Logout from "./logout";

// import styled from "styled-components";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
        };
        this.myImgUrl = this.myImgUrl.bind(this);
        this.setBio = this.setBio.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }
    
    componentDidMount() {
        console.log("my app component has mounted!");
        axios
            .get("/user")
            .then(userdata => {
                console.log("data", userdata.data);
                this.setState({
                    userId: userdata.data.userId, // check the id thru the whole document
                    first: userdata.data.first,
                    last: userdata.data.last,
                    element: userdata.data.element,
                    imgUrl: userdata.data.imgUrl, // check the name
                    bio: userdata.data.bio // get more userdata from the DB!
                });
            }).catch(error => {                                                   
                console.log("error in axios get user info", error);
            });
    }  

    
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

    myImgUrl(newImgUrl) {
        console.log(" imageUpload worked / works!");
        this.setState({
            imgUrl: newImgUrl,
            uploaderIsVisible: !this.state.uploaderIsVisible});
    }

    render() {
        return (
            <React.Fragment>
                <BrowserRouter>
                    <div
                        style={{
                            position: "relative",
                            top: "10%",
                            fontFamily: "Impact, Charcoal, sans-serif",
                            color: "cornflowerblue",
                        }}
                    >
                        <Logo />
                        <div
                            style={{
                                position: "absolute",
                                left: "85%",
                                top: "30%",
                                transform: "translate(-80%, -20%)",
                                fontFamily: "Impact, Charcoal, sans-serif",
                                marginRight: "20px",
                            }}
                        >
                            <Link to="/users/search" component={FindPeople}>
                                Find Users
                            </Link>
                            <br></br>
                            <Link to="/chat" component={Chat}>
                                Chat
                            </Link>
                            <br></br>
                            <Link to="/friends" component={Friends}>
                                Friends
                            </Link>
                            <br></br>
                            <Link to="/logout" component={Logout}>
                                Logout
                            </Link>
                            <br></br>
                        </div>

                        <ProfilePic
                            first={this.state.first}
                            last={this.state.last}
                            imgUrl={this.state.imgUrl}
                            uploaderIsVisible={!this.state.uploaderIsVisible}
                        />

                        <div
                            style={{
                                position: "absolute",
                                marginLeft: "11%",
                                fontFamily: "Impact, Charcoal, sans-serif",
                                color: "cornflowerblue",
                            }}
                        >
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Profile
                                        userId={this.state.userId}
                                        first={this.state.first}
                                        last={this.state.last}
                                        element={this.state.element}
                                        imgUrl={this.state.imgUrl}
                                        bio={this.state.bio}
                                        setBio={this.setBio}
                                    />
                                )}
                            />
                            {this.state.uploaderIsVisible && (
                                <Uploader
                                    myImgUrl={this.myImgUrl}
                                    onClick={this.toggleModal}
                                    uploaderIsVisible={false}
                                />
                            )}
                            <Route
                                path="/user/:id"
                                render={(props) => (
                                    <OtherProfile
                                        {...props}
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                        userId={this.state.userId}
                                    />
                                )}
                            />
                            <Route
                                path="/users/search/:id"
                                render={() => (
                                    <FindPeople
                                        userId={this.state.userId}
                                        first={this.state.first}
                                        last={this.state.last}
                                        imgUrl={this.state.imgUrl}
                                    />
                                )}
                            />
                            <Route
                                path="/friends/:id"
                                render={(props) => (
                                    <Friends
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                        userId={this.state.userId}
                                    />
                                )}
                            />
                            <Route path="/chat" component={Chat} />
                        </div>
                    </div>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}

// check the userId and ids 