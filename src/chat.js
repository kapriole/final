// chat.js

import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";

export default function Chat() {

    const elemRef = useRef();
    
    const renderMessages = useSelector((state) => state && state.messages);

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
    }, [renderMessages]);

    // console.log("chat messages")

    // how to handle the newly incoming messages only in the server?
    console.log("messages", renderMessages);


    const keyCheck = e => {
        console.log("value: ", e.target.value);
        console.log("key pressed", e.key);
        if (e.key === "Enter") {
            e.preventDefault(); // keeps the enter from jumping into the next line
            console.log("Our message: ", e.target.value);
            socket.emit("sendMessage", e.target.value);
            e.target.value = ""; // clears input field after clicking
        }
    };

    // still undefined / style container to chat with

    return (
        <div>
            <p className="chat-title">Welcome to Chat</p>

            <div className="chat-messages-container" ref={elemRef}>
                {renderMessages &&
                    renderMessages.map((message) => {
                        return (
                            <div key={message.id}>
                                <img width="50px" src={message.img_url}></img>
                                <p>
                                    {message.first} {message.last}
                                </p>
                                <p>{message.message_text}</p>
                                <p>
                                    {message.created_at}
                                </p>
                            </div>
                        );
                    })}
            </div>
            <textarea
                placeholder="Please type your message here"
                onKeyDown={keyCheck}
            ></textarea>
        </div>
    );
}