const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

// you could make a secret json file to store your creds
// here refer to petiition db

//// REGISTRATION

module.exports.addUser = (first, last, mail, password) => {
    const q = `
        INSERT INTO users (first, last, email, pass)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
    const params = [first, last, mail, password]; // do I have to use the hashedPW?
    return db.query(q, params);
};

//// FIND USER BY MAIL

module.exports.getUser = mail => {
    const q = `
    SELECT  
    users.id
    users.first,
    users.last,
    users.mail,
    users.password,
    FROM users
    RETURNING *
    `;
    const params = [mail];
    return db.query(q, params);
};

// updateUserCode

module.exports.updateUserCode = (secrectUserCode, mail) => {
    const q = `
    INSERT code INTO passcodes 
    WHERE user.mail = $1
    RETURNING *
    `;
    const params = [secrectUserCode, mail];
    return db.query(q, params);
};

// find the Usercode in the table

module.exports.getUserCode = (mail) => {
    const q = `
    SELECT code FROM passcodes 
    WHERE user.mail = $1
    RETURNING *
    `;
    const params = [mail];
    return db.query(q, params);
};


//// UPDATE hashedpassword 


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

module.exports.updateProfile = (userId, age, city, url) => {
    const q = `
        INSERT into user_profiles (user_id, age, city, url)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id)
        DO UPDATE SET age = $2, city = $3, url = $4
        RETURNING *
    `;
    const params = [userId, age, city, url]; // do I have to use the hashedPW?
    return db.query(q, params);
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