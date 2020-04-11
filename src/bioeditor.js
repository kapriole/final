import React from 'react';
import axios from './axios';

export default class Bioeditor extends React.Component {
                   constructor(props) {
                       super(props);
                       this.state = {};
                       console.log("props!", props);
                   }

                   // check if bio exists !

                   componentDidMount() {
                       console.log("bioeditor mounted!!");
                   }

                   uploadBio() {
                       console.log("uploade text for bio");
                       var bioText = this.state.bio;
                       console.log("this state bio", this.state.bio);
                       var self = this;

                       axios
                           .post("/bio", { newBio: bioText })
                           .then((response) => {
                               console.log(
                                   "resp from POST /bio ",
                                   response.data
                               );
                               // send the response to setBio
                               self.props.setBio(response.data); // check e = response
                           })
                           .catch((err) => {
                               console.log("err in POST /bio: ", err);
                           });
                   }

                   // render inside of render

                   toggleBioEditor() {
                       this.setState({
                           bioEditorIsVisible: !this.state.bioEditorIsVisible,
                       });
                   }

                   handleChange({ target }) {
                       this.setState({
                           [target.name]: target.value,
                       });
                   }

                   // similar to vue
                   render() {
                       console.log("this.state", this.state);
                       const step = this.state.step;
                       if (step == "nobio") {
                           return (
                               <div>
                                   <button
                                       onClick={() =>
                                           this.setState({ step: "changebio" })
                                       }
                                   >
                                       Write down my Lifestory*
                                   </button>
                               </div>
                           );
                       } else if (step == "bioexists") {
                           return (
                               <div>
                                   <p>
                                       Display my current bio in here:{" "}
                                       {this.state.bio}
                                   </p>
                                   <button
                                       onClick={() =>
                                           this.setState({ step: "changebio" })
                                       }
                                   >
                                       Edit my Lifestory
                                   </button>
                               </div>
                           );
                       } else if (step == "changebio") {
                           return (
                               <div>
                                   <textarea
                                       onChange={(e) => this.handleChange(e)}
                                       type="text"
                                       name="bio"
                                       accept="text"
                                   />
                                   <br></br>
                                   <button
                                       onClick={
                                           ((e) => this.uploadBio(e),
                                           () =>
                                               this.setState({
                                                   step: "bioexists",
                                               }))
                                       }
                                   >
                                       Upload your New Lifestory!
                                   </button>
                               </div>
                           );
                       }
                   }
               }   
           


// I want the child to change the paarent !!! the uploader should change the state of app

// This Uploader component should display as a modal.

// Whether or not it is displayed should be determined by a property(called, for example, uploaderIsVisible) of the state of the App component.
// ProfilePic should be passed a function from App for setting this property to true.

// *for testing it's Add and Edit