// src/hoooks/useStatefulFields.js

import React, { useState } from "react";
import axios from "./axios";

export default function useAuthSubmit() {
    const [error, setError] = useState(false); // you should specify your error messages

    const submit = () => {
        axios.post(url, values).then({ data })=> {
        if (data.success) {
            location.pathname('/');
        } else {
            setError(true);
        }
        };
    };
};

return [error, submit];

// ...values copys the old state and then the next input is beinng added to this state

// make the post request dynamic ! change the "/login" to url

// use this hook only for login or registration (registration change the name the route and add two input fields!!!)

// check other 