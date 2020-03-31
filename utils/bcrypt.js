// promisify takes one arugment which is the function that needs to be promisified
const bcrypt = require("bcryptjs");

let { genSalt, hash, compare } = bcrypt;
const { promisify } = require("util");

// promisify takes one argument which is a function that needs to get promisified :)
genSalt = promisify(genSalt);
hash = promisify(hash);
compare = promisify(compare);

module.exports.compare = compare;
module.exports.hash = plainTextPw =>
    genSalt().then(salt => hash(plainTextPw, salt));

/*

genSalt()
    .then(salt => {
        console.log("salt", salt);
        return hash("supersafepassword", salt);
    })
    .then(hashedpasswordwithsalt => {
        console.log("hashedpw", hashedpasswordwithsalt);
        return compare("supersafepassword", hashedpasswordwithsalt); // compares typed in password and the saved one
    })
    .then(matchvalueofcompare => {
        console.log("matchvalue of compare function", matchvalueofcompare);
    });

genSalt().then(salt => {
    console.log("salt 2", salt);
});

*/
