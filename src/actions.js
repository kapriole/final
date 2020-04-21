import axios from "./axios";

// data is an object that comes back from wannabes

export async function receiveFriendsWannabes() {
           console.log("Im in the axios receive friendwannabes");

           const { data } = await axios.get("/friends-wannabes"); // why can't I get my data from the server?
           return {
               type: "RECEIVE_FRIENDS_WANNABES",
               friendsWannabes: data, // is the array with everything // make some friends and check the array // why is data not defined? // bc I have no friends :D
           };
           // catch error
       }

export async function acceptFriendRequest(otherUserId) {
    
    console.log("otherUserId,", otherUserId);

    const { data } = await axios.post("/add-friendship/" + otherUserId);
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        otherUserId, // id of the user whose friendship was accepted
    };
}

export async function unfriend(otherUserId) {

    console.log("data from end friendship axios post");

    const { data } = await axios.post("/end-friendship/" + otherUserId);
    return {
        type: "UNFRIEND",
        otherUserId // id of the user whose friendship was ended
    };
}


export async function latestChatMessages(messages) {
    console.log("data latest messages in axios post", messages);
    // get  it from the socket.js /  the websocket with await
    return {
        type: "LATEST_CHAT_MESSAGES",
        messages // add latest message in here
    };
}


export async function sendMessage(newMessage) {
    console.log("data send message axios post", newMessage);

    // get  it from the socket.js /  the websocket  with await
    return {
        type: "SEND_MESSAGE",
        newMessage
    };
}
