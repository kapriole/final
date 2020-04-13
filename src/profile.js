import React from "react";
import Presentational from "./presentational";
import Bioeditor from "./bioeditor";

/// get the props from app and pass it to Bioeditor
// can't use this in function / use es6 class
// change everything to props --> props.first ... / console.log(props)
// import props with the handleChange method 
// Link the Bioeditor

// either props --> props.first or {first} 
// get props


export default function Profile({ first, last, element, imgUrl, bio, setBio, toggleModal }) {
    let ImgUrl = imgUrl || "./images/default.png";
    let alt = `${first} ${last}`;

    return (
        <React.Fragment>
            <h2>
                Welcome to your userprofile {first}
                {last} ! <br></br> Element:{element}
            </h2>
            <Presentational
                alt={alt}
                imgUrl={ImgUrl}
                first={first}
                last={last}
            />
            <h2 onClick={toggleModal}>toggle the uploader</h2>

            <Bioeditor bio={bio} setBio={setBio} />
        </React.Fragment>
    );   
    
}
