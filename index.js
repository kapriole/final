const express = require("express");
const app = express();

/// bcrypt
const compression = require("compression");
// const { hash, compare } = require("./utils/bcrypt");

app.use(compression());

//// require the database file

// const db = require("./utils/db");

/// my static files / css

app.use(express.static(__dirname + "/public"));

app.use(express.json());

/// require webpack

// export webpack from another file

///////////////// add all the other required MIDDLEWARE ////////////////

/// add cookie-session

// let cookieSession = require("cookie-session");

/// error handling do I need it or handle every error specificly in the component?

/*
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
*/

/// url encoded

app.use(
    express.urlencoded({
        extended: false
    })
);

/////// DON'T TOUCH THE BUNDLE SERVER

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//////////////////////

//// the beginning

app.get("/", function(req, res) {
    if (req.session.userId) {
        res.sendFile(__dirname + "/index.html");
    } else {
        res.redirect("/welcome");
    }
});

// this checks the url for a welcome

app.get("/welcome", function(req, res) {
    console.log("welcome to /welcome");
    res.sendFile(__dirname + "/index.html");
    /*
    if (!req.session.userId) {
        res.sendFile(__dirname + "/index.html");
    } else {
        res.redirect("/");
    }
    */
});

// send login data to database

// registration
/*
app.get("/registration", function(req, res) {
    console.log("welcome to /registration");
   
});
*/

// when you clicked the register button you go the next page

//// STAR ROUTE has to stay the last route
app.get("*", function(req, res) {
    if (req.session.userId) {
        res.sendFile(__dirname + "/index.html");
    } else {
        res.redirect("/welcome");
    }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
