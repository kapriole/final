import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import axios from "../axios";

// import Other Profile?

export default function FriendButton(props) {
    const [buttonText, setButtonText] = useState("");
=======
import axios from "./axios";


export default function FriendButton() {
    const [buttonText, setButtonText] = useState("Make Friend Request");
>>>>>>> 5eb1d03f501cbe344bdb6b7129136ee89b7dd5a7
    // useState is empty and checks every time in axios setButtonText

    // the the other user's id it gets from the OtherProfile component

    // the axiosget checks if the status has changed and then sets the buttonText according to the current State
<<<<<<< HEAD
    console.log("props in friendbutton", props);

    // check otherUserId //params
    const otherUserId = props.otherUserId;
    

    useEffect(() => {

        axios
            .get(`/initial-friendship-status/:otherUserId`)
            .then(({ data }) => {
                console.log("data", data);
                // check what responses you need who is receiver and who is sender?
                // get response.data // data has response object 

                setButtonText({
                    buttonText: "Make Friend Request", // in here just set it to the response from the server
                });
                // axios request to get the relationship of the two users
                // update button text // depending on the result from axios
                // set the buttonText depending on the user's id
            });
=======


    useEffect(() => {

        axios.get("/user/:otherUserId").then(({ data }) => {
            console.log("data", data);
            // check what responses you need who is receiver and who is sender?
            setButtonText({
                buttonText: "Make Friend Request",
            });
            // axios request to get the relationship of the two users
            // update button text // depending on the result from axios
            // set the buttonText depending on the user's id ( can I get it back and then handle it in here?)
        });
>>>>>>> 5eb1d03f501cbe344bdb6b7129136ee89b7dd5a7
    }, []);

    // when does friendbutton mount? 

<<<<<<< HEAD
    // handle the logic in rendering the button given the state 

=======
    // handle
>>>>>>> 5eb1d03f501cbe344bdb6b7129136ee89b7dd5a7
    // "Make Friend Request" to "Cancel Friend Request"
    // "Cancel Friend Request" -> "Make Friend Request"
    // "Accept Friend Request" -> "End Friendship"
    // "End Friendship" -> "Make Friend Request"

    // do I have to do this in both? back and front

<<<<<<< HEAD
    // on the OtherUsersProfile my Id doesnt matter
    // I have to check the Other Users Id in the backend ---> where does this happen?

=======
>>>>>>> 5eb1d03f501cbe344bdb6b7129136ee89b7dd5a7
    const handleClick = () => {
        if (buttonText == "Make Friend Request") {
            axios
                .post("/make-friend-request/:otherUserId")
                .then(({ data }) => {
                    // check if the request was sent!
                    console.log("data", data);
                    setButtonText({
                        buttonText: "Cancel Friend Request",
                    });
<<<<<<< HEAD
=======
                    // how can I check the id of the (in the backend check if the user is req.session.userId then send the CANCEL button
                    // if the user is otherUserId then send the ACCEPT) / I can only accept and then cancel?
>>>>>>> 5eb1d03f501cbe344bdb6b7129136ee89b7dd5a7
                })
                .catch((err) => {
                    console.log("err in axios post make friend request", err);
                });
        } else if (buttonText == "Accept Friend Request") {
            axios
                .post("/add-friendship/:otherUserId")
                .then(({ data }) => {
                    console.log("data", data);
                    setButtonText({
                        buttonText: "End Friendship",
                    });
                })
                .catch((err) => {
                    console.log("err in axios post make friend request", err);
                });
        } else if (buttonText == "End Friendship" || "Cancel Friend Request") { // does it work like this?
            axios
                .post("/end-friendship/:otherUserId")
                .then(({ data }) => {
                    console.log("data", data);
                    setButtonText({
                        buttonText: "Make Friend Request"
                    });
                })
                .catch((err) => {
                    console.log("err in axios post make friend request", err);
                });
        } else {
            console.log("error in handleclick friendbutton");
        }
<<<<<<< HEAD

    };

    return (<button onClick={handleClick}>{buttonText}</button>);
=======
        // if friendship is pending then render "ACCEPT" or "CANCEL"

        // runs when the friendbutton is clicked and then we have to tell the server that the relationship changed:
        // message we send to the server depends on what the button said the time it was clicked 

        // --> check with the server (if condition is "pendingFriendship" then alter the table)
        // if the friendship should end then make a different request ( if else block in the handleClick )
        // no friends before pending friendrequest
        // were friends but end the friednship
        // if user clicks end friendship then the button should change to make friends ( UPDATE BUTTONTEXT)

    };

    return <button onCLick={handleClick}>{buttonText}</button>;
>>>>>>> 5eb1d03f501cbe344bdb6b7129136ee89b7dd5a7
}

// we have to update buttonText and then change the Text and the Functionality of the button
// 1st dataflow what's on the button when the user goes to another user's page
// what should the button say we need an axios request to the server to check the relationship status of the loggedIn user and the otherUsers 

// 1. existing relationship: no "Send Friend Request"
// 2. sent request not accepted: "Unfriend"
// 3. sent request accepted: profile owner is not the recipient: "Accept Friend Request" /  profile owner is recipient: "Cancel Friend Request"

// check the State every time the component mounts (use the array) + the User clicks the button
<<<<<<< HEAD

// the button is part of the Other Profile's component
// add a button to my Profile (ehich can also be other Profile?)

// if condition is true (the user exists) then show the button:   {user && <h1>Hello person!</h1>}

// if friendship is pending then render "ACCEPT" or "CANCEL"

// runs when the friendbutton is clicked and then we have to tell the server that the relationship changed:
// message we send to the server depends on what the button said the time it was clicked 
// --> check with the server (if condition is "pendingFriendship" then alter the table)
// if the friendship should end then make a different request ( if else block in the handleClick )
// no friends before pending friendrequest
// were friends but end the friednship
// if user clicks end friendship then the button should change to make friends ( UPDATE BUTTONTEXT)
=======
>>>>>>> 5eb1d03f501cbe344bdb6b7129136ee89b7dd5a7
