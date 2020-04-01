/// WELCOME PAGE /////

import React from "react";
import Registration from "./register";
import Login from "./login";
import { HashRouter, Route, Link } from "react-router-dom";
import "./styles/app.css";
// import styles

// import

import { ImageBackground, StyleSheet, Text, View } from "react-native";

const image = { uri: "./public/images/clouds.png" };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold"
  }
});

export default class Welcome extends React.Component {
    redner() {
        return (
            <View style={styles.container}>
            <HashRouter>
                 <ImageBackground source={image} style={styles.image}>
                    <h1>Welcome!</h1>
                    <Text style={styles.text}>Friend</Text>
                    
                    <Route exact path="/" component={Registration}></Route>
                    <Route path="/login" component={Login}></Route>
                 </ImageBackground>
            </HashRouter>
            </View>

        );
    }
}
