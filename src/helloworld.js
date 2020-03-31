import React from "react";
import Home from "./home";

// every component must start with a capital letter

export default function HelloWorld() {
    var tagLine = "hello you";
    return (
        <div>
            HELLO! WORLD!
            <Home slogan={tagLine} />
        </div>
    );
}

// children cannot pass props to their parents
// but parents can pass it to children
