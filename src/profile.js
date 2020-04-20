import React from "react";
import Presentational from "./presentational";
import Bioeditor from "./bioeditor";
import styled from "styled-components";


/// get the props from app and pass it to Bioeditor
// can't use this in function / use es6 class
// change everything to props --> props.first ... / console.log(props)
// import props with the handleChange method 
// Link the Bioeditor

// either props --> props.first or {first} 
// get props


// styles

const HoverText = styled.p`
    :hover {
        color: #ed1233;
        cursor: pointer;
    }
`;


export default function Profile({ first, last, element, imgUrl, bio, setBio, toggleModal}) {
    let ImgUrl = imgUrl || "./images/default.png";
    let alt = `${first} ${last}`;

    return (
        <React.Fragment>
            <h2>
                Welcome to your user profile <br></br>
                {first} {last} ! <br></br>
            </h2>
            <Presentational
                alt={alt}
                imgUrl={ImgUrl}
                first={first}
                last={last}
            />
            <br></br> Element: {element}
            <br></br> <br></br>
            <Bioeditor bio={bio} setBio={setBio} />
            <HoverText onClick={toggleModal}>upload a new photo!</HoverText>
        </React.Fragment>
    );   
    
}
