// chat.js

import React, { useEffect, useRef } from "react";
import { socket } from "../socket";
import { useSelector } from "react-redux";

export default function Chat() {

    // useRef helps to manipulate DOM Element
    const elemRef = useRef();

    useEffect(() => {
        console.log("chat hooks has mounted");
        console.log("elemRef", elemRef);
        console.log("scrollTop", elemRef.current.scrollTop);
        console.log("scrollHeight", elemRef.current.scrollHeight);
        console.log("clientHeight", elemRef.current.clientHeight);
        // scrollTop 356-300
        // you need to add something to array that listens for the event (chatMessages)
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    // check the names of everything (like chatMessages) and change it everywhere 
    // 

    const chatMessages = useSelector(
        state => state && state.chatMessages
    );

    const keyCheck = e => {
        console.log("value: ", e.target.value);
        console.log("key pressed", e.key);
        if (e.key === "Enter") {
            e.preventDefault(); // keeps the enter from jumping into the next line
            console.log("Our message: ", e.target.value);
            socket.emit("sendChatMessage", e.target.value);
            e.target.value = ""; // clears input field after clicking
        }
    };

    // still undefined

    return (
        <div>
            <p className="chat-title">Welcome to Chat</p>

            <div className="chat-messages-container" ref={elemRef}>
                <p>Chat will go in here</p>
                <p>Chat will go in here</p>
                <p>Chat will go in here</p>
                <p>Chat will go in here</p>
            </div>
            <textarea
                placeholder="Please type your message here"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}