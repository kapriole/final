/// WELCOME PAGE /////

import React from "react";
import "./styles/app.css";

// import

export default class Logo extends React.Component {
    render() {
        return (
            <div>
                <img
                    src="./images/logo.png"
                    width="20%"
                    style={{
                        position: "absolute",
                        left: "5%",
                        transform: "translate(-5%, -5%)",
                        fontFamily: "Impact, Charcoal, sans-serif",
                        borderStyle: "solid 2px",
                        borderColor: "cornflowerblue",
                    }}
                />
            </div>
        );
    }
}

