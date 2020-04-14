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
               
/// get USER DATA
 
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
                imgUrl: userdata.img_url,
                bio: userdata.bio
            });
        })
        .catch(err => {
            console.log("something wrong in get userdata", err);
            res.json({ success: false });

        });
});
        
              
/// get User by Id
 
app.get("/user/:id.json", (req, res) => {
    if (req.params.id == req.session.userId) {
        res.json({ redirect: true });
    }
    // console.log("req.session", req.body.id);
    const userId = req.params.id; // is other User Id
    db.getUserInfoById(userId)
        .then(({rows}) => {
            console.log("result from getUserInfo", {rows});
            res.json(rows[0] || { redirect: "/"});
        })
        .catch(err => {
            console.log("something wrong in get other user data by id", err);
            res.json({ success: false });
        });
});


///// get recent users

app.get("/users/recent", (req, res) => {
    // console.log("req.session", req.session);
    // FIND the users who signed up most recently
    db.getRecentUsers()
        .then((result) => {
            console.log("result from getRecentUsers", result);
            const userdata = result.rows[0];
            console.log("userdata", userdata);
            res.json({
                userId: userdata.id,
                first: userdata.first,
                last: userdata.last,
                element: userdata.class,
                imgUrl: userdata.url,
                bio: userdata.bio,
                timestamp: userdata.created_at,
            });
        })
        .catch((err) => {
            console.log("something wrong in get userdata", err);
            res.json({ success: false });
        });
});
        
////// USER SEARCH

app.get("/users/search/:userId", (req, res) => {
    console.log("req.session.userId", req.session.userId);
    // checck the data from the userinput
    // use params
    const input = req.body.userInput;
    db.findUsers(input).then((result) => {
        // this should return the list of users
        // console.log("result", result);
        res.json({ result });
    }).catch(err => {
        console.log("error in find Users", err);
    });
    
});


/* 
EXAMPLE

app.get('/users/:userId/books/:bookId', function (req, res) {
  // Access userId via: req.params.userId
  // Access bookId via: req.params.bookId
  res.send(req.params);
})
*/


///////////// UPLOAD Image

console.log("config.s3Url", config.s3Url);

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    // gives you access to your file
    console.log("in upolad POST ROUTE ");
    // gives you access to the user input
    // use req.params
    console.log("user input: ", req.file);
    console.log("config.s3Url", config.s3Url);
    //If the PUT is successful, your file will be available for the world to see at https://s3.amazonaws.com/:yourBucketName/:filename.

    if (req.file) {
        // user input = req.body
        // add Photos takes: url, username, title, description
        let imgUrl = config.s3Url + req.file.filename; // + the adress to the amazon webspace // https://s3.amazonaws.com/spicedling/ // or my bucket name
        let userId = req.session.userId;

        db.addProfileImg(userId, imgUrl) // like add Photos!
            .then(image => {
                res.json(image);
                console.log("image succesfully uploaded");
            })
            .catch((err) => {
                console.log("error in add photos in /upload", err);
            });
    } else {
        res.json({
            success: false
        });
    }
});    

//// Bio when new bio was uploaded

app.post("/bio", (req, res) => {
    console.log("BIO req.session.userId", req.session.userId);
    console.log("BIO req.bodynewBio", req.body.newBio);
    const userId = req.session.userId;
    const bio = req.body.newBio;
    db.updateBio(userId, bio).then(data => {
        let newBio = data.rows[0].bio;
        res.json({ newBio });
    }).catch(err => { console.log("error", err);});
});

///// FRIENDS BUTTON

/// initial status of the friendship has to be checked all the time

app.get("/initial-friendship-status/:otherUserId", (req, res) => {
    // I got back the other users id
    // console.log("req.session", req.session);
    // I can already check this in the front
    const userId = req.session.userId;
    const otherUserId = req.body.otherUserId; // or params? from the url
    // not necessary bc I cant be the other user
    db.checkFriendship(userId, otherUserId).then(result => {
        console.log("data", result);
        if (result.rows.length == 0) {
            console.log("no friendship exists");
            res.json({ friendship: "no friendship" });
        } else if (result.rows[0].accepted == false) {
            console.log("friendship is pending / who is who?");
            if (result.rows[0].accepted == result.rows.userId) // check it 
            {
                console.log("the friendship wasnt accepted yet");
                res.json({ friendship: "cancel friendship request" });
            }
            else { res.json({ friendship: "accept friendship" }); }
        } else {
            res.json({ friendship: "end friendship" });
        }
    }).catch(err => { console.log("error in checking the friendship status!", err);});
});

// put the logic to the front else I have to do it twice

// 1. if 2 users have no row  they have no friendship
// 2. if 2 users have a row & accepted row is true ! they have a friendship
// 3. if they have a row they have some relationship


///// the user clicks the Make Friend Request 

app.post("/make-friend-request/:otherUserId", (req, res) => {
    const userId = req.session.userId;
    const otherUserId = req.body.otherUserId; // or params? 
    db.makeFriendshipRequest(userId, otherUserId)
        .then((data) => {
            console.log("data", data);
            res.json({ data: "friendship pending" });
        })
        .catch((err) => {
            console.log("error in making the friendship request!", err);
        });
});

// this route runs when the user clicks the Accept Friend Request button

app.post("/add-friendship/:otherUserId", (req, res) => {
    // db Updates the column accepted to true
    const userId = req.session.userId;
    const otherUserId = req.body.otherUserId; // or params?
    db.acceptFriendship(userId, otherUserId)
        .then((data) => {
            console.log("data", data);
            res.json({ data: "friendship accepted" });
        })
        .catch((err) => {
            console.log("error in accepting the friendship!", err);
        });
});

// End Friendship button AND the Cancel Friend Request button

app.post("/end-friendship/:otherUserId", (req, res) => {
    // db Updates the column accepted to true
    const userId = req.session.userId;
    const otherUserId = req.body.otherUserId; // or params?
    db.deleteFriendship(userId, otherUserId)
        .then((data) => {
            console.log("data", data);
            res.json({ data: "friendship accepted" });
        })
        .catch((err) => {
            console.log("error in deleting the friendship!", err);
        });
});


//// Friends Wannabes Redux 
// use otherUserId?

app.get("/friends-wannabes", (req, res) => {
    // const userId = req.session.userId;
    // get the other users id
    db.getFriendsList(userId).then((data) => {
        console.log("data", data);
        res.json({ data });
    }).catch((err) => {
        console.log("error in retrieving the friendslist and wannabes!", err);
    });
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
