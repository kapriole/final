/// WELCOME PAGE /////

import React from "react";
import "./styles/app.css";

// import

export default function ProfilePic({ first, last, imgUrl }) {
    let ImgUrl = imgUrl || "./images/default.png";
    let alt = `${first} ${last}`;
    return (
        <React.Fragment>
            <div style={{
            }}>
                <img
                    onChange={(e) => this.handleChange(e)}
                    src={ImgUrl}
                    alt = {alt}
                    width="6%"
                    style={{
                        position: "absolute",
                        maxWidth: "150px",
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
   