// src/reducer.js

export default function reducer(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS_WANNABES") {
        console.log("RECEIVE_FRIENDS_WANNABES");
        state = {
            ...state,
            friendsWannabes: action.friendsWannabes
        };
        //return state;
    } 

    // user should be friends

    if (action.type == "ACCEPT_FRIEND_REQUEST") {
        console.log("ACCEPT_FRIEND_REQUEST");
        state = {
            ...state, 
            friendsWannabes: state.friendsWannabes.map((user) => {
                if (action.otherUserId == user.id) { // why is one Id a string and the other not?
                    // id of user who accepted request and is friend --> means that accepted is true
                    return {
                        ...user,
                        accepted: true
                    };
                } else {
                    // runs for all the people who are not yet my friends
                    return user;
                }
            }),
        };
    }

    // user should be no-more-friends (but are no friends wannabes no? only when they request)

    if (action.type == "UNFRIEND") {
        console.log("END_FRIENDSHIP");
        state = {
            ...state, // clone global state // who is the user?
            friendsWannabes: state.friendsWannabes.map((user) => {
                if (action.otherUserId == user.id) {
                    // id of user who accepted request and is friend
                    return {
                        ...user,
                        accepted: false
                    };
                } else {
                    return user;
                }
            }),
        };
    }

    // chat

    // get latest messages + the new one

    if (action.type == "LATEST_CHAT_MESSAGES") {
        console.log("LATEST_CHAT_MESSAGES");
        state = {
            ...state,
            messages: action.messages.reverse()// get the messages in here / reverse here
        };
        console.log("stat in action latest chat messages", state);
    }
    
/*
    // send new message
    
    if (action.type == "SEND_MESSAGE") {
        console.log("SEND_MESSAGE");
        state = {
            ...state, // clone global state // concat doesnt work?
            messages: state.messages.concat(action.newMessage), // // add the newMessage to all messages arra / this happens in the back 
        };
    }
*/
    return state;
}