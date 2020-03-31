//src/home.js
import React from "react";
import axios from "axios";

// we can only have state in the class components
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: "ivana",
            last: "matijevic"
        };
        this.handleClick = this.handleClick.bind(this);
        // OR YOU can bind directly in the method
    }

    // its like vue mounted
    componentDidMount() {
        //axios.get('/home')
        // to update the state we must use setState
        console.log("clicked!");
        setTimeout(() => {
            this.setState({
                first: "vegeta",
                last: "myOtherName"
            });
        });
        // in this case "this" dosnt refer to component
    }

    // keep your methods in your components
    handleClick() {
        //axios.post / axios request
        this.setState({
            last: "vegetaaaaaaaaaa"
        });
    }

    // don't forget to bind!!

    render() {
        return (
            <div>
                <h1>HOME !!!!</h1>
                <h1 onClick={this.handleClick}>
                    {this.state.first} {this.state.last}
                </h1>
                <p>{this.props.slogan}</p>
            </div>
        );
    }
}
