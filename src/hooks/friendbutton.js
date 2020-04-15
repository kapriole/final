import React, { useState, useEffect } from "react";
import axios from "../axios";

// import Other Profile?

export default function FriendButton(props) {
    const [buttonText, setButtonText] = useState("Make Friend Request");
    // useState is empty and checks every time in axios setButtonText
    console.log("props in friendsbutton", props);
    // check otherUserId //params
    const otherUserId = Number(props.otherUserId); // result is a string not a number why??

    // userId is sender id // otherUserId is receiver id // accepted is friendship or pending
    // how can I get the user id? // it's undefined changed user.id  to userId / props.userId 

    useEffect(() => {
        console.log(
            "useEffect started and axios gets freindsprops in friendbutton",
            props
        );
        axios
            .get("/initial-friendship-status/" + otherUserId)
            .then(({ data }) => {
                console.log("data from the db", data);
                if (data.length == 0) {
                    setButtonText(
                        "Make Friend Request" // in here just set it to the response from the server
                    );
                } else if (data[0].accepted == false) {
                    console.log("friendship is pending");
                    if (data[0].receiver_id == props.otherUserId) {
                        console.log("the friendship wasnt accepted yet");
                        setButtonText("Cancel Friend Request");
                    } else {
                        setButtonText("Accept Friend Request");
                    }
                } else {
                    setButtonText("End Friend Request");
                }
                // update button text // depending on the result from axios
                // set the buttonText depending on the user's id
            })
            .catch((error) => {
                console.log(
                    "error in get friendship status/ maybe no fs yet",
                    error
                );
            });
    }, [buttonText]);

    // yeah it works?

    const handleClick = () => {
        console.log("buttonText", buttonText);
        if (buttonText == "Make Friend Request") {
            axios
                .post("/make-friend-request/" + otherUserId)
                .then((data) => {
                    // check if the request was sent!
                    console.log("data in handleClick make friend request", data);
                    setButtonText(buttonText == "Cancel Friend Request");
                })
                .catch((err) => {
                    console.log("err in axios post make friend request", err);
                });
        } else if (buttonText == "Accept Friend Request") {
            axios
                .post("/add-friendship/" + otherUserId)
                .then((data) => {
                    console.log("data", data);
                    setButtonText(
                        buttonText == "End Friendship"
                    );
                })
                .catch((err) => {
                    console.log("err in axios post make friend request", err);
                });
        } else if (buttonText == "End Friendship" || "Cancel Friend Request") { // does it work like this?
            axios
                .post("/end-friendship/" + otherUserId)
                .then((data) => {
                    console.log("data", data);
                    setButtonText(buttonText == "Make Friend Request");
                })
                .catch((err) => {
                    console.log("err in axios post make friend request", err);
                });
        } else {
            console.log("error in handleclick friendbutton");
        }
    };
    return <button onClick={handleClick}> {buttonText}</button>;
}

// objects are not valid as react child! {props.buttonText} remove the curly bracket from the logic in axios

// we have to update buttonText and then change the Text and the Functionality of the button
// 1st dataflow what's on the button when the user goes to another user's page
// what should the button say we need an axios request to the server to check the relationship status of the loggedIn user and the otherUsers 

// 1. existing relationship: no "Send Friend Request"
// 2. sent request not accepted: "Unfriend"
// 3. sent request accepted: profile owner is not the recipient: "Accept Friend Request" /  profile owner is recipient: "Cancel Friend Request"

// check the State every time the component mounts (use the array) + the User clicks the button

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
