/// WELCOME PAGE /////

import React from "react";
import "./styles/app.css";

// import

export default class Logo extends React.Component {
   
    redner() {
        return (
            <div>
                <img img-src="./public/images/logo.png" />
                <background-img
                    src="./public/images/clouds.png"
                    alt="background"
                />
            </div>
        );
    }
}
