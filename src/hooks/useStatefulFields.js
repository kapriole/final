// src/hoooks/useStatefulFields.js

import React, { useState } from "react";

export default function useStatefulFields() {
    const [values, setValues] = useState();

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

<<<<<<< HEAD
    return [values, handleChange];
=======
    return [values, handleChange]
>>>>>>> 5eb1d03f501cbe344bdb6b7129136ee89b7dd5a7

}

// ...values copys the old state and then the next input is beinng added to this state