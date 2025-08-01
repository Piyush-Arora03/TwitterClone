const passport = require('passport');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

function authenticate(req, res, next) {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if(err) {
            return next(err);
        }
        if(!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({message: info.message});
        }
        req.user = user;
        next();
    })(req, res, next);
}

module.exports = {
    authenticate
}