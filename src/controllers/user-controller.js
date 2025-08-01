const { UserService } = require('../service');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
 
async function createUser(req, res) {
    try {
        const user = await UserService.createUser({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        });
        console.log('made req');
        const successResponse = { ...SuccessResponse, data: user };
        return res
                .status(StatusCodes.CREATED)
                .json(successResponse);
    } catch(error) {
        const errorResponse = { ...ErrorResponse, error: error };
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(errorResponse);
    }
}

async function signin(req, res) {
    try {
        const user = await UserService.signin({
            email: req.body.email,
            password: req.body.password
        });
        const successResponse = { ...SuccessResponse, data: user };
        return res
                .status(StatusCodes.OK)
                .json(successResponse);
    } catch(error) {
        const errorResponse = { ...ErrorResponse, error: error };
        return res
                .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(errorResponse);
    }
}

module.exports = {
    createUser,
    signin
}
