const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

// you could make a secret json file to store your creds
// here refer to petiition db


//// REGISTRATION

module.exports.addUser = (first, last, mail, element, password, bio, imgUrl) => {
    const q = `
        INSERT INTO users (first, last, email, class, pass, bio, img_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
    `;
    const params = [first, last, mail, element, password, bio, imgUrl]; // do I have to use the hashedPW?
    return db.query(q, params);
};

//// FIND USER BY MAIL

module.exports.getUser = mail => {
    const q = `
    SELECT  
    users.id
    users.first,
    users.last,
    users.email,
    users.password,
    FROM users
    RETURNING *
    `;
    const params = [mail];
    return db.query(q, params);
};

// getUserById

module.exports.getUserInfoById = userId => {
    const q = `
        SELECT * FROM users
        WHERE id = $1
    `;
    const params = [userId];
    return db.query(q, params);
};

// updateUserCode
// INSET NEW CODE

module.exports.updateUserCode = (secretCode, mail) => {
    const q = `
    INSERT code INTO passcodes 
    WHERE users.email = $2
    RETURNING *
    `;
    const params = [secretCode, mail];
    return db.query(q, params);
};

// find the Usercode in the table by Email
// And less than 10 minutes old

module.exports.getUserCode = (mail) => {
    const q = `
    SELECT code FROM passcodes 
    WHERE users.email = $1
    WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
    RETURNING *
    `;
    const params = [mail];
    return db.query(q, params);
};

/// SELECT * FROM my_table
/// WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes';


//// UPDATE hashedpassword 

module.exports.updatePassword = (mail, newHashedPW) => {
    const q = `
        INSERT into users (email, pass)
        VALUES ($1, $2)
        DO UPDATE SET pass = $2
        RETURNING *
    `;
    const params = [mail, newHashedPW]; // do I have to use the hashedPW?
    return db.query(q, params);
};




/// add the code

//// PROFILE EDIT

//// Upload Images

module.exports.addProfileImg = (url, userId) => {
    const q = `
    INSERT url INTO users
    WHERE user_id = $1
    RETURNING *
    `;
    const params = [url, userId]; // no username
    return db.query(q, params);
};

module.exports.getImageWithId = imageId => {
    const q = `
    SELECT * 
    FROM images
    WHERE  id=$1
    `;
    const params = [imageId];
    return db.query(q, params);
};



//// Update Profile

module.exports.updateProfile = (userId, first, last, element, email, imgUrl, bio) => {
    const q = `
        INSERT into user_profiles (user_id, first, last, class, email, img_url, bio)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (user_id)
        DO UPDATE SET first = $2, last = $3, email = $4, img_url = $5, bio = $6
        RETURNING *
    `;
    const params = [userId, first, last, element, email, imgUrl, bio]; // do I have to use the hashedPW?
    return db.query(q, params);
};


/// Get the users that where recently registered

module.exports.getRecentUsers = () => {
    const q = `
        SELECT * FROM users
        WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '1000 minutes'
    `;
    return db.query(q);
};

/*

Database queries

    SELECT to find a user by email (you can reuse the one you used in Login)
        we need this query to find out if the email the user entered is valid (ie the user has an account on our site)
    INSERT into new table for secret codes
    SELECT that finds the code in the new table that matches the email address and is less than 10 minutes old
    UPDATE password of user's table by email address
    not a query - but we'll also need bcrypt's hash method to hash the password we get from the user

*/