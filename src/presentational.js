import React from "react";


// destrucutre the props 

export default function Presentational({first, last, ImgUrl}) {
    console.log("props in pres", first, last, ImgUrl);
    let imgUrl = ImgUrl || "public/img/default.png";
    return (
        <React.Fragment>
            <h2>I&aposm the presentaional component</h2>
            <h2>My name is: {first}</h2>
            <img src={imgUrl} alt={first} />
        </React.Fragment>
    );
}