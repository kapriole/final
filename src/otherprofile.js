
import React from "react";
import axios from "./axios"; 
import Presentational from "./presentational";
import FriendButton from "./hooks/friendbutton";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    componentDidMount() {
        // id is the userId 
        console.log("OtherProfile: this.props", this.props);
        const id = Number(this.props.match.params.id); // this object contains the paths params from the router labeled with :colon
        axios.get(`/user/${id}.json`).then(
            data => {
                if (data.redirect) {
                    this.props.history.push("/");
                } else {
                    this.setState({
                        otherUserId: data.data.id, // check otherUderId
                        first: data.data.first,
                        last: data.data.last,
                        element: data.data.class,
                        imgUrl: data.data.img_url,
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
                    <h2>
                        Welcome to {this.state.first}s user profile <br></br>
                    </h2>
                    <Presentational
                        alt={(this.state.first, this.state.last)}
                        imgUrl={this.state.imgUrl}
                    />
                    <br></br> Element: {this.state.element}
                    <br></br> <br></br>
                    <p value={this.state.bio}>
                        This should show the users bio/ if no bio show nobio
                    </p>
                    <FriendButton
                        userId={this.props.userId}
                        otherUserId={this.props.match.params.id}
                    />
                </div>
            </React.Fragment>
        );
    }
            
}

// props is passed to set state?

// here you can get the otherProfileUsers Id and pass it as a prop to the FriendButton

// use conditional rendering and get data from axios concerning the state of the app

// return a component not a function
