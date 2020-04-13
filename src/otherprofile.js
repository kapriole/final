
import React from "react";
import axios from "./axios"; 
import FriendButton from "./hooks/friendbutton";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    componentDidMount() {
        console.log("this.props in other profile!", this.props);
        // id is the userId 
        const id = this.props.match.params.id; // this object contains the paths params from the router labeled with :colon
        axios.get(`/user/${id}.json`).then(
            data => {
                console.log("data in get user id in otherprofile", data);
                if (data.redirect) {
                    this.props.history.push("/");
                } else {
                    this.setState({
                        id: data.data.userId, // check id
                        first: data.data.first,
                        last: data.data.last,
                        element: data.data.element,
                        imgUrl: data.data.imgUrl, 
                        bio: data.data.bio
                    });
                    // new data / puts the current userId of the other user in here
                }
            }
        ).catch(error => { console.log("error in axios get other user id", error);});
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <h1>
                        {this.state.first} {this.state.last}
                    </h1>
                    <img src={this.state.imgUrl}></img>
                    <p value={this.state.bio}>P Tag for your biotext</p>
                    <FriendButton
                        userId = {this.props.userId}
                        otherUserId={this.state.id} />
                </div>
            </React.Fragment>
        );
    }
            
}

// props is passed to set state?

// here you can get the otherProfileUsers Id and pass it as a prop to the FriendButton

// use conditional rendering and get data from axios concerning the state of the app

// return a component not a function