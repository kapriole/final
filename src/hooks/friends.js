/* eslint-disable react/jsx-key */
// friends component

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriendsWannabes, acceptFriendRequest, unfriend } from "../actions";

// do I need useStore?
// user.otherUserId from actions/reducer

export default function Friends() {

    useEffect(() => {
        useDispatch(receiveFriendsWannabes());
    }, []);
    
    const friendsWannabes = useSelector(
        (state) =>
            state.friendsWannabes &&
            state.friendsWannabes.filter((user) => user.accepted == false)
    );

    const trueFriends = useSelector(
        (state) =>
            state.friendsWannabes &&
            state.friendsWannabes.filter((user) => user.accepted == true)
    );

    console.log("friendswannabes", friendsWannabes);

    trueFriends.map; // in the return
    // in here we have to filter the array from receiveFriendsWannabes with the useSelector Hook (2x)

    // no friends nor wannabes

    if (!friendsWannabes) {
        return null;
    }

    // no truefriends

    if (!trueFriends) {
        return null;
    }

    // render two lists using map !

    // for the accept friend request button... when it's clicked we'll want to dispatch our acceptFriendRequest action
    // for the end friendship button... when it's clicked we'll want to dispatch the unfriend action

    // check git make one for friends and one for wannabes in two divs and then render conditoionally and map!!! 

    // the users should all have the same name for rendering

    return (
        <React.Fragment>
            <div id="friends">
                <h2>
                    Welcome to the friends component which will show the
                    friendslist of the user your on.
                </h2>

                {friendsWannabes.length > 0 && (
                    <div>
                        <p>sorry but no friends</p>
                    </div>
                )}

                {friendsWannabes &&
                    friendsWannabes.map((user) => {
                        return (
                            <div key={user.otherUserId} className="friendslist">
                                <img width="150px" src={user.imgUrl} />
                                <div className="wannabes">
                                    <button
                                        onClick={() =>
                                            useDispatch(
                                                acceptFriendRequest(
                                                    user.otherUserId
                                                )
                                            )
                                        }
                                    >
                                        accept friend request
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                {trueFriends &&
                    trueFriends.map((user) => {
                        return (
                            <div key={user.otherUserId} className="friendslist">
                                <img src={user.imgUrl} />
                                <div className="friends">
                                    <button
                                        onClick={() =>
                                            useDispatch(
                                                unfriend(user.userId)
                                            )
                                        }
                                    >
                                        end friendship
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                <nav>
                    <Link to="/friends">See who is friends with you</Link>
                    <Link to="/wannabes">See who wants to be friends</Link>
                </nav>
            </div>
        </React.Fragment>
    );
}

// List of people who want to be your friends have the accept friendship button 
//// List of people who are your friends have the end friendship button 



// dispatch action when it mounts (Action gets the friends from the server)

// when it mounts --> in a hook?

// the array from the server displays all the friends!

// useSelector hook 2 x

// render the 2 lists on screen using map

// depending on which button was clicked another action should be dispatched. logical



    