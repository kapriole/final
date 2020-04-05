/// WELCOME PAGE /////

import React from "react";
import "./styles/app.css";

// import

export default function ProfilePic({ first, last, ImgUrl }) {
    console.log("props in pres", first, last, ImgUrl);
    let imgUrl = imgUrl || "./images/default.png";

    return (
        <React.Fragment>
            <div>
                <h1>Hello from ProfilePic</h1>
                <img
                    onChange={(e) => this.handleChange(e)}
                    src={imgUrl}
                    width="10%"
                    style={{
                        position: "absolute",
                        left: "95%",
                        top: "5%",
                        transform: "translate(-90%, -5%)",
                        fontFamily: "Impact, Charcoal, sans-serif",
                        borderStyle: "solid 2px",
                        borderColor: "cornflowerblue",
                    }}
                />
            </div>
        </React.Fragment>
    );
}
   