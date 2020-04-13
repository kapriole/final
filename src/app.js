import React from "react";
import axios from "./axios"; // this is already the copy 
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./styles/app.css";
import Logo from "./logo";
import Uploader from "./uploader";
import Profile from "./profile";
import ProfilePic from "./profilepic";
import OtherProfile from "./otherprofile";
import FindPeople from "./findpeople";


export default class App extends React.Component {
    constructor(props) {
        super(props);
        console.log("props in app", props);
        this.state = {
            uploaderIsVisible: true
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
                    id: userdata.data.userId,
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
        console.log(this.state);
        console.log("props in app", this.props.first);

        // reorganize the structure

        // make a fixed header

        //check if all the right props/methods are passed to the children! in render

        return (
            <React.Fragment>
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
                            onClick={this.toggleModal}
                        />
                        <div
                            style={{
                                position: "absolute",
                                fontFamily: "Impact, Charcoal, sans-serif",
                                color: "cornflowerblue",
                            }}
                        >
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
                                        bio={this.state.bio}
                                        setBio={this.setBio}
                                    />
                                )}
                            />
                            {this.state.uploaderIsVisible && (
                                <Uploader
                                    myImgUrl={this.myImgUrl}
                                    onClick={this.toggleModal}
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
                    </div>
                </BrowserRouter>
            </React.Fragment>

        );
    }
}


// Link to other Pages
