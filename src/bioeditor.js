import React from 'react';
import axios from './axios';

export default class Bioeditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        console.log("props!", props);
    }
    componentDidMount() {
        console.log("bioeditor mounted!!");
    }
    uploadBio() {
        console.log("uploade text for bio");
        var bioText = this.state.bio;
        console.log("this file", this.state.bio);

        axios
            .post("/bio", bioText)
            .then(function(response) {
                console.log("resp from POST /bioe: ", response);
            })
            .catch(function(err) {
                console.log("err in POST /bio: ", err);
            });
        // and axios.post it and update the DB and get back the current imgURL
        // console.log ( response )
        this.props.setBio(this.response.bio);
    }

    /// is there already a bio?? chekc if the bio exists before
    
    // render conditionally

    // console.log (props!)


    toggleBioEditor() {
        this.setState({ bioEditorIsVisible: !this.state.bioEditorIsVisible });
        const step = this.state.step;
        if (step == "nobio") {
            return (
                <div>
                    <button
                        onClick={() => this.setState({ step: "changebio" })}
                    >
                    Write down my Lifestory
                    </button>
                </div>
            );
        } else if (step == "bioexists") {
            <div>
                <p>Display my current bio in here: {(this.state.bio)}</p>
                <button onClick={() => this.setState({ step: "changebio" })}>
                    Edit my Lifestory
                </button>
            </div>;
        } else if (step == "changebio") {
            <div>
                <textarea
                    onChange={(e) => this.handleChange(e)}
                    type="text"
                    name="bio"
                    accept="text"
                />
                <button onClick={() => this.uploadBio()}>
                    Upload your New Lifestory!
                </button>
            </div>;
        }
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
   
    // similar to vue
    render() {
        return (
            <React.Fragment>
              
                {this.toggleBioEditor()}
               
            </React.Fragment>
        );
    }
}   
           
// I want the child to change the paarent !!! the uploader should change the state of app

// This Uploader component should display as a modal.

// Whether or not it is displayed should be determined by a property(called, for example, uploaderIsVisible) of the state of the App component.
// ProfilePic should be passed a function from App for setting this property to true.