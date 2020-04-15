import React from "react";

// destrucutre the props / change everything to props

// this is the profile pic !!!

export default function Presentational({first, last, imgUrl}) {
    //console.log("props in pres", first, last, imgUrl);
    let ImgUrl = imgUrl || "./images/default.png";
   
    return (
        <React.Fragment>
            <img
                style={{
                    maxWidth: "300px",
                    maxHeight: "300px",
                    overflow: "hidden"
                }}
                src={ImgUrl}
                alt={first, last} 
            />
        </React.Fragment>
    );
    
}
   