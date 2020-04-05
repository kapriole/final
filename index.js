const express = require("express");
const app = express();
const compression = require("compression");
const cryptoRandomString = require("crypto-random-string");
const secretCode = cryptoRandomString({
    length: 6
});
const cookieSession = require("cookie-session");

const s3 = require("./s3");

//// require the database file
const db = require("./utils/db");

/// bcrypt
const { hash, compare } = require("./utils/bcrypt");

/// require csurf
const csurf = require("csurf");

const ses = require("./ses");

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

app.use(compression());

app.use(express.static(__dirname + "/public"));

app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.json());

app.use(
    cookieSession({
        secret: "very secret",
        maxAge: 1000 * 60 * 60 * 24 * 10
    })
);

/// csurf after cookie !!! 
app.use(csurf());

app.use(function(req, res, next) {
    const token = req.csrfToken();
    res.cookie("OHMYGLOB", token);
    // res.locals.csrfToken = token;
    next();
});

/// error handling do I need it or handle every error specificly in the component?

/*
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
*/

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
    if (req.session.userId) {
        res.sendFile(__dirname + "/index.html");
    } else {
        res.redirect("/welcome");
    }
});

// req.session.userId is the cookie from req.body.user.id

// this checks the url for a welcome

app.get("/welcome", function(req, res) {
    console.log("welcome to /welcome");
    if (!req.session.userId) {
        res.sendFile(__dirname + "/index.html");
    } else {
        res.redirect("/");
    }    
});

app.post("/register", function (req, res) {
    console.log("POST ROUTE REGISTER");
    // how can I get the req.body?
    const first = req.body.first;
    const last = req.body.last;
    const mail = req.body.email;
    const element = req.body.element;
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
            db.addUser(first, last, mail, element, hashedPW)
                .then(result => {
                    // add new user with the cred in the user database
                    console.log("result.rows[0].id", result.rows[0]);
                    req.session = {
                        userId: result.rows[0].id,
                        first: result.rows[0].first,
                        last: result.rows[0].last,
                        element: result.rows[0].class, // or class?
                        mail: result.rows[0].email, // stick to one?
                        bio: result.rows[0].bio,
                        imgUrl: result.rows[0].img_url
                    };
                    //(node:3262) UnhandledPromiseRejectionWarning: error: column "mail" of relation "users" does not exist
                    console.log("req.session.user", req.session.user);
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
            if (result.rows[0]) {
                req.session.userId = true;
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
                req.session = {
                    userId: matchValue.rows[0].id,
                    first: matchValue.rows[0].first,
                    last: matchValue.rows[0].last,
                    element: matchValue.rows[0].class, // or class?
                    mail: matchValue.rows[0].email, // stick to one?
                    bio: matchValue.rows[0].bio,
                    imgUrl: matchValue.rows[0].img_url
                };
                // check if the user has a userId 
                db.getUserId(req.session.userId)
                    .then(result => {
                        req.session.userId = result.rows[0].id;
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
        "csurftoken"
    )
        .then(() => {
            // everything worked!
            res.json();
            console.log("it worked!");
        })

        .catch(err => {
            console.log("something went wrong!", err);
            // something went wrong
        });
});

/// I forgot my password --> send email to my mailaddress 
app.post("/reset/password/start", (req, res) => {
    // console log
    const mail = req.body.email;
    // confirm there is a user with the submitted mail adress!
    db.getUser(mail)
        .then(result => {
            console.log("result", result);
            console.log("result.rows", result.rows);
            // check if user with this email exists
            console.log("result.rows[0].email", result.rows[0].email);
            console.log("email exists in DB");
            // catch the error if the email doesnt exist!
            // send result / confirm the user exists and direct user to the next page
            // generate secret code and save it in the DB !!
            // if user mail exists ( create the secretuserCode and Update the db)
            // generate before db query? or where?
            db.updateUserCode(secretCode, mail);
            // save it to the DB
            // and send the mail directly from here (bc I already have the right mail + code)
            ses.sendEmail(
                "hologramm@posteo.de", // mail // put my slack email in here
                "This is your Reset Code!",
                "Please reset you password during the next 10 min with this Code: " +
                    secretCode // invalid csurf secret
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
                })

                .catch(error => {
                    console.log("err in Match : ", error);
                });
        });
});

app.post("/reset/password/code", (req, res) => {
    const code = req.body.code;
    const newpass = req.body.newpass;
    const mail = req.body.email;

    // confirm there is a user with the submitted mail adress!
    // check if the entered code exists
    db.getUserCode(mail)
        .then(result => {
            console.log("whats the code the user code ", result);
            if (code) {
                hash(newpass) //
                    .then(newHashedPW => {
                        console.log("hashedPW", newHashedPW); // put the PW in the database!! where email is ...
                        db.updatePassword(mail, newHashedPW)
                            .then(result => {
                                req.session.userId = result.rows[0].id;
                                // res.sendFile(__dirname + "/index.html");
                                // add conditional rendering to the index file
                                res.json({ success: true });
                            })
                            .catch(error => {
                                console.log("error in update PW", error);
                                res.json({ success: false });
                            });
                    })
                    .catch(err => {
                        console.log("err in code doenst exist", err);
                        res.json({ success: false });
                    });
            }
        })
        .catch(err => {
            console.log("something wrong in get UserCode: ", err);
            res.json({ success: false });
        });
});

// if so replace the old pass with the new hashed PW
               
/// upload Profile image

 
app.get("/user", (req, res) => {
    // console.log("req.session", req.session);
    // send the user data names id and the url!
    // console.log!!
    const userId = req.session.userId;
    db.getUserInfoById(userId)
        .then(result => {
            console.log("result from getUserInfo", result);
            const userdata = result.rows[0];
            console.log("userdata", userdata);
            res.json({
                userId: userdata.id,
                first: userdata.first, 
                last: userdata.last,
                element: userdata.class,
                imgUrl: userdata.url
            });
        })
        .catch(err => {
            console.log("something wrong in get userdata", err);
            res.json({ success: false });

        });
});
        

///////////// upload Image

console.log("config.s3Url", config.s3Url);

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    // gives you access to your file
    console.log("in upolad POST ROUTE ");
    // gives you access to the user input
    console.log("user input: ", req.body);
    console.log("config.s3Url", config.s3Url);
    //If the PUT is successful, your file will be available for the world to see at https://s3.amazonaws.com/:yourBucketName/:filename.

    if (req.file) {
        // user input = req.body
        // add Photos takes: url, username, title, description
        let imgUrl = config.s3Url + req.file.filename; // + the adress to the amazon webspace // https://s3.amazonaws.com/spicedling/ // or my bucket name
        let userId = req.body.id;

        db.addProfileImg(imgUrl, userId) // like add Photos!
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
        
    


//// Bio

app.post("/bio", (req, res) => {
    console.log(req.body);
    // get everything from the Db andd post it back to the front
    res.json("send something");
});



//// STAR ROUTE has to stay the last route

app.get("*", function (req, res) {
    
    if (req.session.userId) {
        res.sendFile(__dirname + "/index.html");
    } else {
        res.redirect("/welcome");
    }
});


app.listen(8080, function() {
    console.log("I'm listening.");
});
