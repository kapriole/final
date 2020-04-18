import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { receiveFriendsWannabes, acceptFriendRequest, unfriend } from "./actions";

export default function Friends() {

    const dispatch = useDispatch();


    const friendsWannabes = useSelector((state) =>
            state.friendsWannabes &&
            state.friendsWannabes.filter((user) => user.accepted == false)
        );
    

    const trueFriends = useSelector(
        (state) =>
            state.friendsWannabes &&
            state.friendsWannabes.filter(
                (user) => user.accepted == true
            )
                      
    );

    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    }, []);

    // console.log user ...

    // change the render method of the friends list!

    return (
        <React.Fragment>
            <div id="friendsandwannabes">
                <h2>See my friends:</h2>

                {!friendsWannabes && (
                    <div>
                        <p>
                            sorry but you have no friends / Link to finding
                            users!
                        </p>
                    </div>
                )}

                {friendsWannabes &&
                    friendsWannabes.map((user) => {
                        return (
                            <div key={user.otherUserId} className="friendslist">
                                <img width="150" src={user.img_url} />
                                <p>
                                    {user.first} {user.last}
                                </p>
                                <div className="wannabes">
                                    <button
                                        onClick={() =>
                                            dispatch(
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
                <br></br>

                {trueFriends &&
                    trueFriends.map((user) => {
                        return (
                            <div key={user.otherUserId} className="friendslist">
                                <img src={user.img_url} />
                                <p>
                                    {user.first} {user.last}
                                </p>
                                <div className="friends">
                                    <button
                                        onClick={() =>
                                            dispatch(unfriend(user.otherUserId))
                                        }
                                    >
                                        end friendship
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                <br></br>

                <nav>
                    <Link to="/friends">See who is friends with you</Link>
                    <br></br>
                    <br></br>
                    <Link to="/wannabes">See who wants to be friends</Link>
                </nav>
            </div>
        </React.Fragment>
    );
}



    