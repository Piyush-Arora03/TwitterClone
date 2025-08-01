const { UserRepository } = require('../repository');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { checkPassword, createToken, hashPassword } = require('../utils/common/auth');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(data) {
        try {
            console.log('in service');
            // Create a new object for the repository, ensuring the password is hashed
            const userToCreate = {
                ...data,
                password: hashPassword(data.password)
            };
            const user = await this.userRepository.create(userToCreate);
            return user;
        } catch(error) {
            // Check for Mongoose's duplicate key error (code 11000)
            console.log(error);
            if (error.code === 11000) {
                const field = Object.keys(error.keyValue)[0];
                const value = Object.values(error.keyValue)[0];
                const errorMessage = `The ${field} '${value}' is already registered. Please use a different ${field}.`;
                throw new AppError(errorMessage, StatusCodes.CONFLICT); // 409 Conflict is more specific
            }
            // For other errors, throw a generic server error
            throw new AppError('Cannot create a new user object', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async signin(data) {
        try {
            const user = await this.userRepository.getUserByEmail(data.email);
            if(!user) {
                throw new AppError('No user found for the given email', StatusCodes.NOT_FOUND);
            }
            const passwordMatch = checkPassword(data.password, user.password);
            if(!passwordMatch) {
                throw new AppError('Invalid password', StatusCodes.BAD_REQUEST);
            }
            const jwt = createToken({id: user.id, email: user.email});
            return jwt;
        } catch(error) {
            if(error instanceof AppError) throw error;
            throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports = new UserService();