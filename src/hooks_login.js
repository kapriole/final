import React from "react";
import axios from "./axios";
import { useStatefulFields } from "./hooks/useStatefulFields";
import { useAuthSubmit } from "./hooks/useAuthSubmit";


export default function Login() {
    const [values, handleChange] = useStatefulFields();
    console.log("values", values); // is an object that contains the values from the input fields
    useAuthSubmit('/login', values); // need the route for the request and the values from the input fields 
    return (
        <div>
            <input name="email" type="text" onChange={handleChange}></input>
            <input name="password" type="password" onChange={handleChange}></input>
        </div>
    )

}