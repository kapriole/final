import React from 'react';
import axios from './axios';

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        console.log("uploader mounted!!");
    }
    uploadImage(e) {
        e.preventDefault();
        console.log("uploade image in uploader");
        var formData = new FormData();
        // this props! 
        console.log("this file", this.state.file);

        formData.append("file", this.state.file);
        console.log("formData", formData);

        axios
            .post("/upload", formData)
            .then(function(response) {
                console.log("resp from POST /upload: ", response);
                let newImgUrl = this.response.imgUrl;
                this.props.myImgUrl(newImgUrl);
                // set it inside (access to response)
            })
            .catch(function(err) {
                console.log("err in POST /upload: ", err);
            });
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
   
    // similar to vue
    render() {
        console.log("this.props: ", this.props);
        return (
            <React.Fragment>
                <h3>This is the uploader component!!</h3>
                <input onChange={()=>this.handleChange()} type="file" name="file" accept="image/*" />
                <button onClick={(e) => this.uploadImage(e)}>
                    Upload New Image!
                </button>
            </React.Fragment>
        );
    }
}
    
                       
           
// I want the child to change the paarent !!! the uploader should change the state of app

// This Uploader component should display as a modal.

// Whether or not it is displayed should be determined by a property(called, for example, uploaderIsVisible) of the state of the App component.
// ProfilePic should be passed a function from App for setting this property to true.