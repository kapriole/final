import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    receiveFriendsWannabes,
    acceptFriendRequest,
    unfriend,
} from "./actions";

export default function Friends() {
    const dispatch = useDispatch();

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

    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    }, []);

    // console.log user ...

    // change the render method of the friends list!

    return (
        <React.Fragment>
            <div id="friendsandwannabes">
                <h2>See my friends:</h2>

                {friendsWannabes == null && (
                          <div>
                              <p>sorry but you have no friends!</p>
                          </div>
                      )
               }

                {friendsWannabes &&
                    friendsWannabes.map((user, index) => {
                        return (
                            <div key={index} className="friendslist">
                                <Link to={`user/${user.id}`}>
                                    <div
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <img
                                            width="100px"
                                            src={user.img_url || user.imgUrl}
                                        ></img>
                                    </div>
                                </Link>
                                <p>
                                    {user.first} {user.last} <br></br> Element:
                                    {user.class}
                                </p>
                                <p>wants to be your friend ...</p>
                                <div className="wannabes">
                                    <button
                                        onClick={() =>
                                            dispatch(
                                                acceptFriendRequest(
                                                    user.id
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
                    trueFriends.map((user, index) => {
                        return (
                            <div key={index} className="friendslist">
                                <Link to={`user/${user.id}`}>
                                    <div
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <img
                                            width="100px"
                                            src={user.img_url || user.imgUrl}
                                        ></img>
                                    </div>
                                </Link>
                                <p>
                                    {user.first} {user.last} <br></br> Element:{" "}
                                    {user.class}
                                </p>
                                <div className="friends">
                                    <button
                                        onClick={() =>
                                            dispatch(unfriend(user.id))
                                        }
                                    >
                                        end friendship
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                <br></br>

            </div>
        </React.Fragment>
    );
}
