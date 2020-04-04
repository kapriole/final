import React from "react";

// destrucutre the props 

// this is the profile pic !!!

export default function Presentational({first, last, ImgUrl}) {
    console.log("props in pres", first, last, ImgUrl);
    let imgUrl = imgUrl || "./images/default.png";
   
    return (
        <React.Fragment>
            <h2>I&aposm the presentaional component</h2>
            <h2>My name is: {first} {last}</h2>
            <img width="50%" src={imgUrl} alt={first} />
        </React.Fragment>
    );
    
}
   