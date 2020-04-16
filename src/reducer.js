// src/reducer.js

// what do I need to import is it action file or type?

export default function reducer(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS_WANNABES") {
        console.log("RECEIVE_FRIENDS_WANNABES");
        state = {
            ...state,
            friendsWannabes: action.friendsWannabes,
        };
        return state;
    } 

    // user should be friends

    if (action.type == "ACCEPT_FRIEND_REQUEST") {
        console.log("ACCEPT_FRIEND_REQUEST");
        state = {
            ...state, // clone global state // who is the user?
            friendsWannabes: state.friendsWannabes.map((user) => {
                if (action.otherUserId === user.otherUserId) {
                    // id of user who accepted request and is friend
                    return {
                        ...user,
                        // set one object in the friendwannabes to true (the one with the otherUserid)
                        // ...user.otherUserId.accepted: true ??
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
                if (action.otherUserId === user.otherUserId) {
                    // id of user who accepted request and is friend
                    return {
                        ...user,
                        // remove the user with the otherUserId 
                        // from the array/ alter accepted ?
                    };
                } else {
                    // runs for all the people who are not yet my friends
                    return user;
                }
            }),
        };
    }
}

// check the IDs

// useSelector?


/// reducer sends the new copy of the state to redux

