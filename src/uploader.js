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

    
    handleChange({ target }) {
        this.setState({
            [target.name]: target.files,
        });
    }
   
    uploadImage() {
        console.log("uploade image in uploader");
        var formData = new FormData();
        // this props! 
        console.log("file[0]", this.state.file[0]);
        var file = this.state.file[0];
        formData.append("file", file);
        console.log("formData[0]", formData);

        axios
            .post("/upload", formData )
            .then(image => {
                console.log("resp from POST /upload: ", image);
                console.log("resp in rows from POST /upload: ", image.data.rows[0].img_url);

                let newImgUrl = image.data.rows[0].img_url;
                this.props.myImgUrl(newImgUrl);
                // check the newImgUrl
            })
            .catch(err => {
                console.log("err in POST /upload: ", err);
            });
    }

    // add the close button! (set visibility to false)
    // similar to vue
    render() {
        return (
            <React.Fragment>
                <input
                    onChange={(e) => this.handleChange(e)}
                    type="file"
                    name="file"
                    accept="image/*"
                />
                <button onClick={() => this.uploadImage()}>
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