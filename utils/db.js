const spicedPg = require("spiced-pg");

/*
var db =
    process.env.DATABASE_URL ||
    "postgres://spicedling:password@localhost:5432/petition";

*/

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/petition"
);

// you could make a secret json file to store your creds
// here refer to petiition db

module.exports.deleteData = () => {
    const q = `
        DELETE FROM signatures
        DELETE FROM users
        DELETE FROM user_profiles
        RETURNING *
    `;
    return db.query(q);
};

/////// save the signature to the user

module.exports.addSignature = (signature, userId) => {
    const q = `
        INSERT INTO signatures (signature, user_id)
        VALUES ($1, $2)
        RETURNING *
    `;
    const params = [signature, userId];
    return db.query(q, params);
};

module.exports.getSigId = userId => {
    const q = `
    SELECT id
    FROM signatures
    WHERE user_id = $2
    `;
    const params = [userId];
    return db.query(q, params);
};

module.exports.getSignatures = () => {
    const q = `SELECT * FROM signatures`;
    return db.query(q);
};

module.exports.getSigners = () => {
    const q = `SELECT  
    users.first,
    users.last,
    signatures.signature
    FROM users, signatures
    LEFT JOIN user_profiles ON user_profiles.user_id = users.id 
    JOIN signatures
    ON signatures.user_id = users.id 
    `;
    return db.query(q);
};

module.exports.getlastSig = () => {
    const q = `SELECT MAX(id)
  FROM signatures`;
    return db.query(q);
};

//////// add delete signature

module.exports.deleteSig = () => {
    const q = `DELETE FROM signatures WHERE user_id=$2`;
    return db.query(q);
};

/// getSignees

module.exports.getSignees = () => {
    const q = `
    SELECT users.first, users.last, user_profiles.age, user_profiles.city, user_profiles.url FROM users
    LEFT JOIN user_profiles ON user_profiles.user_id = users.id
    JOIN signatures
    ON signatures.user_id = users.id 
    `;
    return db.query(q);
};

//// add users to the right table which is users.sql

module.exports.addUser = (first, last, mail, password) => {
    const q = `
        INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
    const params = [first, last, mail, password]; // do I have to use the hashedPW?
    return db.query(q, params);
};

/// identify a user per mail

module.exports.getUser = mail => {
    const q = `
    SELECT  
    users.id
    users.first,
    users.last,
    users.mail,
    users.password,
    user_profiles.age,
    user_profiles.city,
    user_profiles.url,
    user_profiles.user_id  
    FROM users
    LEFT JOIN user_profiles ON user_profiles.user_id = users.id 
    RETURNING *
    `;
    const params = [mail];
    return db.query(q, params);
};

// get all users

module.exports.getUsers = () => {
    const q = `
        SELECT * FROM users
    `;
    return db.query(q);
};

//// add profile to user_profiles

module.exports.addProfile = (age, city, url, userId) => {
    const q = `
        INSERT into user_profiles (age, city, url, user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
    const params = [age, city, url, userId];
    return db.query(q, params);
};

///////// update the profile

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

//// i dunno if this makes any sense

module.exports.getSignersByCity = city => {
    const q = `
    SELECT * FROM users
    JOIN signatures ON users.id = signatures.user_id
    LEFT JOIN user_profiles ON users.id = user_profiles.user_id
    WHERE user_profiles.city = $1
    `;
    const params = [city];
    return db.query(q, params);
};

// how to make a triple JOIN ??

module.exports.getSignersByName = () => {
    const q = `
    SELECT users.first, users.last FROM users
    JOIN signatures ON users.id = signatures.user_id
    LEFT JOIN user_profiles ON users.id = user_profiles.user_id
    WHERE user_profiles.city = $1
    `;
    return db.query(q);
};

// SELECT user_id AS "userId" !!!!!!!!! USE THIS !!

// what else delete

/*

    Queries

    INSERT in users table (in post /registration)
    SELECT to get user info by email address (in post /login)
    INSERT for signatures table needs to be changed to include the user_id (in post /petition)
    SELECT from signature to find out if they've signed (post /login)

    */

//////////// PART 4 ///////////

/*
    

    Change the signatures table so that it no longer includes columns for first and last name. 
    When showing the list of people who have signed the petition, get their names by joining the users table.

    Change the query that retrieves information from the users table by email address so that it also gets data from the signatures table. 
    Thus you will be able to know whether the user has signed the petition or not as soon as they log in.


    update the signers page to show signees names, ages, cities, and urls

    Update signatures table to no longer include first and last name columns
    signatures should also be updated to have a user_id column
    this means when a user signs the petition, we will only INSERT their signature AND user_id
        might have to modify some of POST /signatures
        you might have already done this in part 3 :)
    we will have to JOIN all 3 of our tables :D
        we need signatures because that table tells us whether or not a user signed the petition
        we need users to get the signers first and last names
        we need user_profiles to get the signers age, city, url (if they provided any)
        be careful: we only want to show users who have signed the petition! if you do the wrong type of join here, you'll start seeing people on the /signers page who haven't signed the petition!



    */
