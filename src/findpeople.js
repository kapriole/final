import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

// get the users array form ajax
 
export default function FindPeople() {
    
    console.log("im in the find/people route");
    const [recentUsers, displayRecentUsers] = useState([]);

    useEffect(() => {
        console.log("useEffect of displayRecentUsers");
        axios
            .get("/users/recent")
            .then(({ data }) => {
                console.log("data in recent users", data);
                displayRecentUsers(data);
            })
            .catch((error) => {
                console.log("error in useEffect get redent users", error);
            });
    }, []);

    // error handling??

    console.log("recentUsers", recentUsers);

    // if user types alb into the input field
    // get the value from the search field! 
    // userInput

    // I dont need to filter here because it's filtered in the back?
    const [usersearch, searchForUsers] = useState();
    const [users, findUsers] = useState([]);

    useEffect(() => {
        if (usersearch == null) {
            return;
        }
        console.log("useEffect of findUsers");
        axios.get(`/users/search/?q=${usersearch}`)
            .then(({ data }) => {
                console.log("data in recent users", data);
                // displayRecentUsers(data);
                findUsers(data);
            })
            .catch((error) => {
                console.log("error in useEffect get search users", error);
            });
    }, [usersearch]); // end useEffect

    console.log("data in users", users);


    const handleChangeSearch = (e) => {
        searchForUsers(e.target.value);
    };

    // recently joined

    // recentUsers.map is not a function!

    // add error handling!



    // open the search field 

    return (
        <React.Fragment>
            {usersearch == null && (
                <div>
                    <h1>Recently joined ...</h1>

                    {recentUsers.map((recent) => {
                        return (
                            <div key={recent.id}>
                                <p>
                                    {recent.first} {recent.last} 
                                </p>
                                <Link to={`user/${recent.id}`}>
                                    <img
                                        width="100px"
                                        style={{}}
                                        src={recent.img_url}
                                    ></img>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            )}

            <h1>Search for someone ...</h1>

            <input
                onChange={handleChangeSearch}
                placeholder="enter a username"
                type="text"
            />

            {usersearch !== null && (
                <div>
                    {users.map((recent) => {
                        return (
                            <div key={recent.id}>
                                <p>
                                    {recent.first} {recent.last}
                                </p>
                                <Link to={`user/${recent.id}`}>
                                    <img
                                        width="100px"
                                        style={{}}
                                        src={recent.img_url}
                                    ></img>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            )}

            {usersearch !== null && users.length == 0 && (
                <p>Apparently no results for {`${usersearch}`}</p>
            )}
        </React.Fragment>
    );
}




/*
                {users && (
                    users.map((user) => {
                    
                        <div key={user.id}>
                            <Link to={`user/${user.id}`}>
                                <img src={user.imgUrl}></img>
                            </Link>
                            <p>
                                {user.first} {user.last}
                            </p>
                        </div>
                
                    }))}

                    
                    */
//                    <h2>say hello to ...</h2>
