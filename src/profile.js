import React from "react";
import ProfilePic from "./profilepic";
import Bioeditor from "./bioeditor";

/// any place to link

// see it after login !

// function or class?

export default class Profile extends React.Component {

// get the props in here from the app 
    // function?
    render() {
        return (
            <React.Fragment>
                <h2>I am the profile component</h2>
               
            </React.Fragment>
        );
    }
}


/*

 <Bioeditor
                    setBio={() =>
                        this.setState({
                            bio: this.state.bio,
                            bioEditorIsVisible: false,
                        })
                    }
                />
                
*/