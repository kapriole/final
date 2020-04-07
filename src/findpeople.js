import React, { useState, useEffect } from "react";
import axios from "./axios";

// do export ?

// get the users array form ajax

function FindPeople() {
    const [user, findUser] = useState(''); // in here comes the single user that matches the search / where use findUser?  
    const [users, findUsers] = useState([]);

    // define {eachUser} is just the user that matches search

    useEffect(() => {
        // useEffect for all the greetee stuff
        // console.log(`greetee is ${greetee} :)`);
    }, []);

    // if user types alb into the input field
    useEffect(() => {
        console.log("useEffect of country");
        let ignore = false;
        (async () => {
            const { data } = await axios.get(`/users/${user}`); 
            if (!ignore) {
                findUsers(data);
            }
        })();
        return () => {
            // this will run on useEffect call that ran when "al" was typed in input field
            // in this function I can tell the useEffect that ran when "al" was typed in the input to stop any pending axios requests it has
            ignore = true;
            console.log("country clean up function");
        };
    }, [user]); // end useEffect

    const handleChangeSearch = (e) => {
        findUsers(e.target.value);
    };

    return (
        <div>
            <h1>Hello, {user}</h1>
            <p>please find a user:</p>
            <input
                onChange={handleChangeSearch}
                placeholder="enter a letter/letters"
            />
            {users.map((eachUser) => {
                return (
                    <div>
                        <p key={eachUser}>
                            {eachUser.first} {eachUser.last}
                        </p>
                        <img src={eachUser.imgUrl}></img>
                    </div>
                );
            })}
        </div>
    );
}

export default FindPeople;