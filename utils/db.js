const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

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


module.exports.getUserLogin = (mail) => {
    const q = `
    SELECT users.email, users.pass, users.id, users.first, users.last, users.img_url, users.class
    FROM users
    WHERE email = $1
    `;
    const params = [mail];
    return db.query(q, params);
};


//// FIND USER BY MAIL

module.exports.getUser = (mail) => {
    const q = `
    SELECT  
    id,
    first,
    last,
    class,
    email,
    pass
    FROM users
    WHERE email = $1
    `;
    const params = [mail];
    return db.query(q, params);
};

// getUserInfoById

module.exports.getUserInfoById = userId => {
    const q = `
        SELECT * FROM users
        WHERE (users.id = $1)
    `;
    const params = [userId];
    return db.query(q, params);
};

// updateUserCode
// INSERT NEW CODE

module.exports.updateUserCode = (mail, secretCode) => {
    const q = `
    INSERT INTO passcodes (email, code)
    VALUES ($1, $2)
    `;
    const params = [ mail, secretCode];
    return db.query(q, params);
};

// find the Usercode in the table by Email
// And less than 10 minutes old

module.exports.getUserCode = (mail) => {
    const q = `
    SELECT code FROM passcodes 
    WHERE email = $1 AND created_at > CURRENT_TIMESTAMP - INTERVAL '10 minutes'
    `;
    const params = [mail];
    return db.query(q, params);
};

/// SELECT * FROM my_table
/// WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes';


//// UPDATE hashedpassword 

module.exports.updatePassword = (mail, newHashedPW) => {
    const q = `
        UPDATE users
        SET pass = $2
        WHERE email = $1
        RETURNING *
    `;
    const params = [mail, newHashedPW]; // do I have to use the hashedPW?
    return db.query(q, params);
};


/// add the code

//// PROFILE EDIT

//// Upload Images

module.exports.addProfileImg = (userId, imgUrl) => {
    const q = `
    UPDATE users 
    SET img_url=$2
    WHERE id=$1
    RETURNING img_url
    `;
    const params = [userId, imgUrl]; // no username
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

module.exports.updateBio = (userId, bio) => {
    const q = `
        UPDATE users
        SET bio=$2
        WHERE id=$1
        RETURNING *
    `;
    const params = [userId, bio]; // do I have to use the hashedPW?
    return db.query(q, params);
};

/// Get the users that where recently registered

module.exports.getRecentUsers = () => {
    const q = `
        SELECT id, first, last, class, img_url FROM users
        ORDER BY created_at DESC
        LIMIT 3
    `;
    return db.query(q);
};

module.exports.findUsers = (input) => {
    return db.query(`
    SELECT id, first, last, class, img_url FROM users WHERE first ILIKE $1`, 
    [input + '%']);
};

// SELECT FIRST OR LAST NAME OR BOTH?

// FRIENDSHIPS

module.exports.checkFriendship = (userId, otherUserId) => {
    const q = `
        SELECT * FROM friendships 
        WHERE (receiver_id = $2 AND sender_id = $1)
        OR (receiver_id = $1 AND sender_id = $2)
    `;
    const params = [userId, otherUserId];
    return db.query(q, params);
};


module.exports.makeFriendshipRequest = (userId, otherUserId) => {
    const q = `
        INSERT INTO friendships (sender_id, receiver_id)
        VALUES ($1, $2)
    `;
    const params = [userId, otherUserId];
    return db.query(q, params);
};


module.exports.acceptFriendship = (userId, otherUserId) => {
    const q = `
        UPDATE friendships 
        SET accepted=true
        WHERE (receiver_id = $1 AND sender_id = $2)
    `;
    const params = [userId, otherUserId];
    return db.query(q, params);
};

// check if this works

module.exports.deleteFriendship = (userId, otherUserId) => {
    const q = `
    DELETE FROM friendships
    WHERE (receiver_id = $1 AND sender_id = $2)
    OR (receiver_id = $2 AND sender_id = $1)
    `;
    const params = [userId, otherUserId];
    return db.query(q, params);
};

// wannabes and friendslist

module.exports.getFriendsList = (userId) => {
    const q = `
    SELECT users.id, first, last, class, img_url, accepted
    FROM friendships
    JOIN users
    ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
    OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
    OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
    `;
    const params = [userId];
    return db.query(q, params);
};

/// CHAT

// DB query will need to be a JOIN 
// I need info from users (first, last, class, image and chat text, timestamp) and chats
// the most recent chat message at the bottom!

// do I need user id?

module.exports.getLastTenMessages = () => {
    const q = `
    SELECT first, last, class, img_url, chat.id, chat.sender_id, chat.message_text, chat.created_at
    FROM chat
    JOIN users
    ON (chat.sender_id = users.id)
    ORDER BY chat.created_at DESC
    LIMIT 10
    `;
    return db.query(q);
};

module.exports.addMessage = (userId, newMessage) => {
    const q = `
    INSERT INTO chat 
    (sender_id, message_text)
    VALUES ($1, $2)
    RETURNING *
    `;
    const params = [userId, newMessage];
    return db.query(q, params);
};