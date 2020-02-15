const jwt = require('jsonwebtoken');
const { JWT_TOKEN } = require('../constant/generalConst');

const signAuth = payload => {
    return jwt.sign(payload, JWT_TOKEN, {
        expiresIn : 15 * 60 * 1000 // 15 mins
    });
}

module.exports = {
    signAuth
}