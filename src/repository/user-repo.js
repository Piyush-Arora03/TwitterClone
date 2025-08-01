const User = require('../models/user');
const CrudRepository = require('./curd-repository');

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async getUserByEmail(email) {
        try {
            const user = await User.findOne({email: email});
            return user;
        } catch (error) {
            throw new Error('Error finding user: ' + error.message);
        }
    }
}

module.exports = UserRepository;
