const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET , SALT_ROUNDS,JWT_EXPIRY} = require('../../config/server-config');


function checkPassword(plainPassword, encryptedPassword) {
    return bcrypt.compareSync(plainPassword, encryptedPassword);
}

function createToken(input) {
    return jwt.sign(input, JWT_SECRET, {expiresIn: JWT_EXPIRY});
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

function hashPassword(plainPassword) {
    try {
        return bcrypt.hashSync(plainPassword, parseInt(SALT_ROUNDS));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    checkPassword,
    createToken,
    verifyToken,
    hashPassword
}