import React from 'react';
import axios from './axios';

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "Pete",
            last: "Anderson",
            uploaderIsVisible: !this.state.uploaderIsVisible
        };
    }
    componentDidMount() {
        console.log("uploader mounted!!");
    }
    uploadImage() {
        console.log("uploade image in uploader");
        // get the file
        // when the upload is done, it knows the url of the uploaded file and must pass it to a function that was passed to it as a prop.
        this.props.myMethod();
        // if image exists set State?
        // read about parent children react
    }
              
    // similar to vue
    render() {
        console.log("this.props: ", this.props);
        return (
            <React.Fragment>
                <h3>This is the uploader component!!</h3>
                <input type="file" name="file" accept="image/*" />
                <button onClick={() => this.uploadImage()}>click me!</button>
            </React.Fragment>
        );
    }
}
// I want the child to change the paarent !!! the uploader should change the state of app

// This Uploader component should display as a modal.
// Whether or not it is displayed should be determined by a property(called, for example, uploaderIsVisible) of the state of the App component.
// ProfilePic should be passed a function from App for setting this property to true.