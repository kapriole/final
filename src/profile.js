import React from "react";
import Presentational from "./presentational";
import Bioeditor from "./bioeditor";

/// get the props from app and pass it to Bioeditor

export default function Profile({ first, last, element, imgUrl, bio }) {
    let ImgUrl = imgUrl || "./images/default.png";
    let alt = `${first} ${last}`;

    return (
        <React.Fragment>
            <h2>
                Welcome to your User Profile: {first}
                {last} Element:{element}
            </h2>
            <Presentational
                alt={alt}
                imgUrl={ImgUrl}
                first={first}
                last={last}
            />
            <h2 onClick={(e) => this.toggleModal(e)}>toggle the uploader</h2>

            <Bioeditor bio={bio} setBio={(e) => this.setBio(e)} />
        </React.Fragment>
    );   

         
    
    
}


/*

 
                
*/