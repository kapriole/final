import React from "react";

// destrucutre the props / change everything to props

// this is the profile pic !!!

export default function Presentational({first, last, imgUrl}) {
    console.log("props in pres", first, last, imgUrl);
    let ImgUrl = imgUrl || "./images/default.png";
   
    return (
        <React.Fragment>
            <h2>I&aposm the presentaional component</h2>
            <h2>My name is: {first} {last}</h2>
            <img width="40%" src={ImgUrl} alt={first} />
        </React.Fragment>
    );
    
}
   