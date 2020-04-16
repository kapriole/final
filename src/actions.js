// src/actions.js

import axios from "./axios";

// get the other

// data is an object that comes back from wannabes

export function receiveFriendsWannabes() {
    axios
        .get("/friends-wannabes")
        .then(({ data } ) => {
            console.log("data from wannabes axios get", data);
            // const friends = data.friendsWannabes;
            // the data will contain a list with all the wannabes and friends
            // here we get the object with (object.type and object.friendsWannabes = [array of friends and wannabes from the server]
            // get the array and add it to the object
            // how can I check if the array is empty?
        })
        .catch((error) => {
            console.log("error from wannabes axios", error);
        });
    return {
        type: "RECEIVE_FRIENDS_WANNABES",
        friendsWannabes: data // is the array with everything // make some friends and check the array // why is data not defined?
    };
}

export function acceptFriendRequest(otherUserId) {
    axios
        .post("/add-friendship/" + otherUserId)
        .then((data) => {
            console.log("data from accept friendship axios post", data);
            // here we get the object with (object.type and object.otherUserId = id of the user whose friendship was ACCEPTED)
        })
        .catch((error) => {
            console.log("error from acceptFriendship axios post", error);
        });
    return {
        type: "ACCEPT-FRIENDSHIP",
        otherUserId // id of the user whose friendship was accepted
    };
}

export function unfriend(otherUserId) {
    axios
        .post("/end-friendship/" + otherUserId)
        .then((data) => {
            console.log("data from end friendship axios post", data);
        })
        .catch((error) => {
            console.log("error from end Friendship axios post", error);
        });
    return {
        type: "UNFRIEND",
        otherUserId // id of the user whose friendship was ended
    };
}

// The object it returns is the action

// in here comes the ten last chat messages

// the the latest chat message


export function latestChatMessages(socketUserId) {
    // get  it from the socket.js /  the websocket
    return {
        type: "GET_LATEST_MESSAGES",
        socketUserId // id of the user whose friendship was ended
    };
}


export function addChatMessage(userId) {
    // get  it from the socket.js /  the websocket
    return {
        type: "ADD_MESSAGE",
        userId // id of the user whose friendship was ended
    };
}
