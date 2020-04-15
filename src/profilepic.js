/// WELCOME PAGE /////

import React from "react";
import "./styles/app.css";

// import

export default function ProfilePic({ first, last, imgUrl }) {
    let ImgUrl = imgUrl || "./images/default.png";
    let alt = `${first} ${last}`;
    return (
        <React.Fragment>
            <div style={{}}>
                <a href="/">
                    <img
                        onChange={(e) => this.handleChange(e)}
                        src={ImgUrl}
                        alt={alt}
                        style={{
                            position: "absolute",
                            maxWidth: "100px",
                            maxHeight: "100px",
                            overflow: "hidden",
                            left: "96%",
                            top: "6%",
                            transform: "translate(-90%, -5%)",
                            fontFamily: "Impact, Charcoal, sans-serif",
                            borderStyle: "solid 2px",
                            borderColor: "cornflowerblue",
                        }}
                    />
                </a>
            </div>
        </React.Fragment>
    );
}
   