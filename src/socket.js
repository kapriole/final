import * as io from "socket.io-client";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();
    }


// chatMessages that's the same name as in the server
// in socket.js you have to listen to an event / eventhandler


// this happens as soon as the user connects to the server (http?)
// find out that it's the same user ( on the server ) and not 10 tabs open
    
    
    socket.on("latestChatMessages", (messages) =>
        store.dispatch(latestChatMessages(messages))
    );

// this happens when user types a message and clicks enter, they emit a new chat
// server listens for emit 
// then we grab the message ( value ) and do a database-insert and get info about the user
// send it right back to everybody who's connected (io.emit OR io.sockets.emit)
// dispatch
// reducers adds data to global state
// chat component is rerendered

    console.log("my new message in the front end ${newMessage}");

    socket.on("addChatMessage", (newMessage) =>
        store.dispatch(addChatMessage(newMessage))
    );    
};

// all the sockets come in here
