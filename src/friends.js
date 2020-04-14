// friends component

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveFriendsWannabes, acceptFriendRequest, unfriend } from "./actions";
import { deleteFriendship } from "../utils/db";

export default function Friends(props) {

    //  let ImgUrl = props.imgUrl || "./images/default.png";
    //  let alt = `${props.first} ${props.last}`;
    
    // dipatch an action when it mounts

    /*
    useEffect(() => {
        useDispatch(receiveFriendsWannabes());
    }, []);
    */

    const friendsWannabes = useSelector(
        (state) =>
            state.friendsWannabes &&
            state.friendsWannabes.filter(
                (friendsWannabe) => friendsWannabe.accepted == false
            )
    );

    const trueFriends = useSelector(
        (state) =>
            state.friendsWannabes &&
            state.friendsWannabes.filter(
                (trueFriend) => trueFriend.accepted == true
            )
    );

    trueFriends.map; // in the return
    // in here we have to filter the array from receiveFriendsWannabes with the useSelector Hook (2x)

    if (!friendsWannabes) {
        return null;
    }



    // render two lists using map !
    // for the accept friend request button... when it's clicked we'll want to dispatch our acceptFriendRequest action
    // for the end friendship button... when it's clicked we'll want to dispatch the unfriend action

    return (
        <React.Fragment>
            <div id="friends">
                <h2>
                    Welcome to the friends component which will show the
                    friendslist of the user your on.
                </h2>
                <div className="friendslist">
                    <img src={friendsWannabes[0].imgUrl} />
                    <div className="wannabes">
                        <button
                            onClick={() =>
                                useDispatch(
                                    acceptFriendRequest(
                                        friendsWannabes[0].id
                                    )
                                )
                            }
                        >
                            accept friend request
                        </button>
                    </div>
                </div>

                <div className="friendslist">
                    <img src={friendsWannabes[1].imgUrl} />
                    <div className="friends">
                        <button
                            onClick={() =>
                                useDispatch(
                                    deleteFriendship(
                                        friendsWannabes[0].id
                                    )
                                )
                            }
                        >
                        end friendship </button>
                    </div>
                </div>

                <nav>
                    <Link to="/friends">See who&apos;s friends</Link>
                    <Link to="/wannabes">
                        See who&apos;s wants to be friends
                    </Link>
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



    