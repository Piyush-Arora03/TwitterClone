const User = require('../models/user');
const CrudRepository = require('./curd-repository');
const logger = require('../config/logger');

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async getUserByEmail(email) {
        try {
            const user = await User.findOne({ email: email });
            return user;
        } catch (error) {
            logger.error('Something went wrong in the User Repository: getUserByEmail', { error });
            throw error;
        }
    }
}

module.exports = UserRepository;
