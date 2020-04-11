import React, { useState, useEffect } from "react";
import axios from "./axios";

// do export ?

// get the users array form ajax

export default function FindPeople() {
    const [recentUsers, displayRecentUsers] = useState([]);
    const [users, findUsers] = useState([]);

    useEffect(() => {
        console.log("useEffect of displayRecentUsers");
        let ignore = false;
        (async () => {
            const { data } = await axios.get(`"/users/recent`);
            if (!ignore) {
                displayRecentUsers(data);
            }
        })();
        return () => {
            ignore = true;
            console.log("displayRecentUsers clean up function");
        };
    }, [recentUsers]); // end useEffect

    console.log("recetnusers", recentUsers);

    // if user types alb into the input field
    // get the value from the search field! 
    // userInput

    useEffect(() => {
        console.log("useEffect of findUsers");
        let ignore = false;
        (async () => {
            const { data } = await axios.get(`/users/search/${users}`);
            if (!ignore) {
                findUsers(data);
            }
        })();
        return () => {
            // this will run on useEffect call that ran when "al" was typed in input field
            // in this function I can tell the useEffect that ran when "al" was typed in the input to stop any pending axios requests it has
            ignore = true;
            console.log("findUsers clean up function");
        };
    }, [users]); // end useEffect

    console.log("users", users);

    const handleChangeSearch = (e) => {
        findUsers(e.target.value);
    };

    // the userdata gives you back an array with the users matching the search ...
    // put them in a nice list

    /// 1. get back the three most recent (DB)
    /// 2. search users (DB)

    // map the last 3
    // map all the users form the array []

    // hooks can I get props?

    // conditional rendering and return the right stuff / get the right users 

    return (
        <React.Fragment>
            <div>
                <h1>Hello, {user}</h1>
                <p>please find a user:</p>
                <input
                    onChange={handleChangeSearch}
                    placeholder="enter a letter/letters"
                />
                {recentUsers.map((user) => {
                    return (
                        <div>
                            <p key={user}>
                                {user.first} {user.last}
                            </p>
                            <img src={user.imgUrl}></img>
                        </div>
                    );
                })}
            </div>
        </React.Fragment>
    );
}
