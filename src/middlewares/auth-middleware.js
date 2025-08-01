const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { ErrorResponse } = require('../utils/common');
const { verifyToken } = require('../utils/common/auth');
const { UserService } = require('../service');
const { UserRepository }=require('../repository');
async function isLoggedIn(req, res, next) {
    try {
        if (!req.headers.authorization) {
            throw new AppError('Authorization header missing', StatusCodes.BAD_REQUEST);
        }
        const token = req.headers.authorization.split(' ')[1]; // Format is "Bearer <token>"
        if (!token) {
            throw new AppError('JWT token missing', StatusCodes.BAD_REQUEST);
        }
        const decoded = verifyToken(token);
        this.userRepository = new UserRepository();
        const user = await this.userRepository.get(decoded.id);
        if (!user) {
            throw new AppError('No user found for the corresponding token', StatusCodes.UNAUTHORIZED);
        }
        // Attach the user object to the request for use in subsequent controllers
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            error = new AppError('Invalid JWT token', StatusCodes.UNAUTHORIZED);
        }
        if (error.name === 'TokenExpiredError') {
            error = new AppError('JWT token has expired', StatusCodes.UNAUTHORIZED);
        }
        if (!(error instanceof AppError)) {
            error = new AppError('Something went wrong during authentication', StatusCodes.INTERNAL_SERVER_ERROR);
        }
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    isLoggedIn
}

