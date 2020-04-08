// src/hoooks/useStatefulFields.js

import React, { useState } from "react";

export default function useStatefulFields() {
    const [values, setValues] = useState();

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return [values, handleChange]

}

// ...values copys the old state and then the next input is beinng added to this state