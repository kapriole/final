const express = require("express");
const app = express();
// const path = require("path");
const compression = require("compression");

const cryptoRandomString = require("crypto-random-string");
const secretCode = cryptoRandomString({
    length: 6
});

///////////////// MULTER

const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const config = require("./config");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
/// require the secrets.json and put the creds in it! OK! NEVER COMMIT IT

const s3 = require("./utils/s3");

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

// should I user express router?


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

// req.session.userId is the cookie from req.body.user.id

// this checks the url for a welcome

app.get("/welcome", function(req, res) {
    console.log("welcome to /welcome");
    if (!req.session.user.userId) {
        res.sendFile(__dirname + "/index.html");
    } else {
        res.redirect("/");
    }    
});



app.post("/register", function (req, res) {
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
                    console.log("req.session.user.userId", req.session.user.userId);
                    // adjust the cookies
                    // res.redirect("/profile");
                    res.json({ success: true });
                })
                .catch(error => {
                    console.log("error handling in addUser", error);
                    res.json({ success: false });
                });
        })
        .catch(error => {
            console.log("error in post welcome hash", error);
            // first general error message
            // new regsitration?
            // use connditional rendering in react
            res.sendFile(__dirname + "/index.html");

        });
});

// registration data saved in database


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
                        // res.sendFile(__dirname + "/index.html");
                        res.json({ success: true });
                        // add conditional rendering to the index file

                    })
                    .catch(error => {
                        console.log("error in get User Id", error);
                        res.json({ success: false });
                    });
            } else {
                console.log("Eror in login / matchvalue");
            }
        })
        .catch(error => {
            console.log("err in where?: ", error);
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
app.post("/reset", (req, res) => {
    // console log
    const mail = req.body.email;
    // confirm there is a user with the submitted mail adress!
    db.getUser(mail)
        .then(result => {
            console.log("result", result);
            console.log("result.rows", result.rows);
            // check if user with this email exists
            console.log("result.rows[0].user.mail", result.rows[0].user.mail);
            console.log("email exists in DB");
            // catch the error if the email doesnt exist!

            // send result / confirm the user exists and direct user to the next page
            // generate secret code and save it in the DB !!
            const secrectUserCode = req.session.user.secretCode;
            // generate before db query? or where?
            // save it to the DB
        })
        .then(secrectUserCode => {
            console.log("matche value of compare", mail);
            ses.sendEmail(
                mail, // put my slack email in here
                "This is your Reset Code!",
                req.session.csrfSecret // invalid csurf secret
            )
                .then(() => {
                    // everything worked!
                    res.json({ success: true });
                    // render two form fields for code and resetpw
                    console.log("it worked!");
                    // res.redirect("/reset/entercode"); we dont do redirect
                })
                .catch(err => {
                    res.json({ success: false });
                    console.log(
                        "something went wrong in sending the mail!",
                        err
                    );
                    // something went wrong
                });
            
            // new POST ROUTE ! 
            // check the rouutes!!!
            // get the new PW and hash it and then save it to the DB
            // check if the entered Code matches the one previously saved to the DB / use hash!
            // if so replace the old pass with the new hashed PW 
            db.getUserCode(req.session.user.resetCode, newHashedPW)
                .then(result => {
                    req.session.user.userId = result.rows[0].id;
                    // res.sendFile(__dirname + "/index.html");
                    // add conditional rendering to the index file

                    // update the DB!
                })
                .catch(error => {
                    console.log("error in get User Code", error);
                });
        })
        .catch(error => {
            console.log("err in Match : ", error);
        });
});

/// upload Profile image

app.get("/user", (req, res) => {
    console.log("req.body", req.body);
    // send the user data names id and the url!
    // console.log!!
    db.getUserInfoById(userId).then(result => {
        res.json(result);
    }
    ).catch(err => {
        console.log("something wrong in get userdata", err);
    });
});

///////////// upload Image

console.log("config.s3Url", config.s3Url);

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    // gives you access to your file
    console.log("file: ", req.file);
    // gives you access to the user input
    console.log("user input: ", req.body);
    console.log("config.s3Url", config.s3Url);

    // how do I get the url again?
    // watch out! url is the filename! and the amazon path

    // was it imageUrl .... check the notes
    // take the file console.log file.original.name, filename

    // prevent double uploads ...

    //If the PUT is successful, your file will be available for the world to see at https://s3.amazonaws.com/:yourBucketName/:filename.

    if (req.file) {
        // user input = req.body
        // add Photos takes: url, username, title, description
        let url = config.s3Url + req.file.filename; // + the adress to the amazon webspace // https://s3.amazonaws.com/spicedling/ // or my bucket name
        let username = req.body.first + req.body.last;
     
        db.addProfileImg(url, username) // like add Photos!
            .then(image => {
                res.json(image);
                console.log("image succesfully uploaded");
            })
            .catch(err => {
                console.log("error in add photos in /upload", err);
            });
        // with every upload the table is updated
        res.json({
            success: true
        });
    } else {
        res.json({
            success: false
        });
    }
});





//// STAR ROUTE has to stay the last route

app.get("*", function (req, res) {
    
    if (req.session.user.userId) {
        res.sendFile(__dirname + "/index.html");
    } else {
        res.redirect("/welcome");
    }
});


app.listen(8080, function() {
    console.log("I'm listening.");
});
