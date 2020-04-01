const express = require("express");
const app = express();
// const path = require("path");
const compression = require("compression");

const cryptoRandomString = require("crypto-random-string");
const secretCode = cryptoRandomString({
    length: 6
});


//// require the database file
const db = require("./utils/db");
/// bcrypt
const { hash, compare } = require("./utils/bcrypt");
/// require csurf
const csurf = require("csurf");
const ses = require("./ses");

app.use(compression());

app.use(express.static(__dirname + "/public"));

app.use(express.json());


// try the cookie session after login


/// add cookie-session

let cookieSession = require("cookie-session");

app.use(
    cookieSession({
        keys: ["secrets.json"],
        secret: process.env.SESSION_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 10
    })
);

/// csurf after cookie !!!
app.use(csurf());

app.use(function(req, res, next) {
    const token = req.csrfToken();
    res.cookie("OHMYGLOB", token);
    res.locals.csrfToken = token;
    next();
});


/// error handling do I need it or handle every error specificly in the component?

/*
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
*/

/// url encoded / do I need this?

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

app.get("/", function (req, res) {
    console.log("req.body", req.body);
    console.log("req.session", req.session);
   
    console.log("req.session", req.session);
    if (req.session.user.userId) {
        res.sendFile(__dirname + "/index.html");
    } else {
        res.redirect("/welcome");
    }
});

// this checks the url for a welcome

app.get("/welcome", function(req, res) {
    console.log("welcome to /welcome");
        req.session.user.userId = 1;

    if (!req.session.user.userId) {
        res.sendFile(__dirname + "/index.html");
    } else {
        res.redirect("/");
    }    
});

app.post("/welcome", function (req, res) {
    console.log("POST ROUTE WELCOME");
      const first = req.body.first;
      const last = req.body.last;
      const mail = req.body.email;
      const password = req.body.pass;
      console.log("req.body", req.body);
      console.log("req.body.first", req.body.first);
      console.log("req.body.mail", req.body.mail);

      /////////// catch if user already exists!!!
      hash(password) //
          .then(hashedPW => {
              console.log("hashedPW", hashedPW); // put the PW in the database!!
              // here we add the user to the database

              /// err in addUser:  error: syntax error at or near "."
              db.addUser(first, last, mail, hashedPW)
                  .then(result => {
                      // add new user with the cred in the user database
                      req.session.user = {
                          userId: result.rows[0].id, // same as signature ID
                          first: result.rows[0].first,
                          last: result.rows[0].last,
                          mail: req.body.mail
                      };
                      //(node:3262) UnhandledPromiseRejectionWarning: error: column "mail" of relation "users" does not exist
                      console.log("req.session.user.id", req.session.user.userId);
                      // adjust the cookies
                      res.redirect("/profile");
                  })
                  .catch(error => {
                      console.log("error handling in addUser", error);
                  });
          })
          .catch(error => {
              console.log("error in post welcome hash", error);
              // first general error message
              // new regsitration?
              // use connditional rendering in react
             res.sendFile(__dirname + "/index.html");

          });
})

// registration data saved in database

// login

//////////////// LOGIN

app.get("/login", (req, res) => {
    // user must be logged out and exist
    // then render the index.html
    res.sendFile(__dirname + "/index.html");

});

/// req.session.csrfToken is not a function

app.post("/login", (req, res) => {
    // check first if the user exists
    // and if user is logged out
    const password = req.body.pass;
    const mail = req.body.email;
    // do I have to do const for each route??

    // get user by email
    db.getUser(mail)
        .then(result => {
            console.log("result", result);
            console.log("result.rows", result.rows);
            // check if already logged in
            if (result.rows[0].user) {
                req.session.user.userId = true;
            }
            // set cookie to remember
            // check if user exxists 
            const hashfromDB = result.rows[0].password;
            compare(password, hashfromDB);
        })
        .then(matchValue => {
            console.log("matche value of compare", matchValue);
            // if the password matches ... set the user_id
            if (matchValue) {
                // here set the user session
                req.session.user = {
                    userId: matchValue.rows[0].id,
                    first: matchValue.rows[0].first,
                    last: matchValue.rows[0].last,
                    mail: matchValue.rows[0].mail
                };
                // check if the user has a userId 
                db.getUserId(req.session.user.userId)
                    .then(result => {
                        req.session.user.userId = result.rows[0].id;
                        // congrats user exists
                        res.sendFile(__dirname + "/index.html");
                        // add conditional rendering to the index file

                    })
                    .catch(error => {
                        console.log("error in get User Id", error);
                    });
            } else {
                console.log("Eror in login / matchvalue");
            }
        })
        .catch(error => {
            console.log("err in addUser: ", error);
        });
});

// reset password
app.post("/test-email", (req, res) => {
    ses.sendEmail(
        "hologramm@posteo.de", // put my slack email in here
        "Im the subject of an email!",
        req.session.csrfSecret // invalid csurf secret
    )
        .then(() => {
            // everything worked!
            // res.json();
            console.log("it worked!");
        })

        .catch(err => {
            console.log("something went wrong!", err);
            // something went wrong
        });
});

/// I forgot my password --> send email to my mailaddress 
app.post("/reset", (req, res) =>{
    // console log
    const mail = req.body.email;
    // confirm there is a user with the submitted mail adress!
    db.getUser(mail)
        .then(result => {
            console.log("result", result);
            console.log("result.rows", result.rows);
            // check if user with this email exists 
            if (result.rows[0].user.mail) {
                //generate a secret code
            }
            console.log("email exists in DB");
            // then send the code via mail 
        })
        .then(matchValue => {
            console.log("matche value of compare", matchValue);
            // if the password matches ... set the user_id
            if (matchValue) {
                // here set the user session
                req.session.user = {
                    userId: matchValue.rows[0].id,
                    first: matchValue.rows[0].first,
                    last: matchValue.rows[0].last,
                    mail: matchValue.rows[0].mail
                };
                // check if the user has a userId 
                db.getUserId(req.session.user.userId)
                    .then(result => {
                        req.session.user.userId = result.rows[0].id;
                        // congrats user exists
                        res.sendFile(__dirname + "/index.html");
                        // add conditional rendering to the index file

                    })
                    .catch(error => {
                        console.log("error in get User Id", error);
                    });
            } else {
                console.log("Eror in login / matchvalue");
            }
        })
        .catch(error => {
            console.log("err in addUser: ", error);
        });
})

//// POST /password/reset/verify





//// STAR ROUTE has to stay the last route

const test = true;

app.get("*", function (req, res) {
    
    if (test) {
        res.sendFile(__dirname + "/index.html");
    } else {
        res.redirect("/welcome");
    }
});


app.listen(8080, function() {
    console.log("I'm listening.");
});
