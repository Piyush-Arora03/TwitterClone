const User = require('../models/user');

const create = async (userData) => {
    try {
        const user = await User.create(userData);
        return user;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
}

const getById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw new Error('Error finding user: ' + error.message);
    }
}

const getAll = async () => {
    try {
        const users = await User.find({});
        return users;
    } catch (error) {
        throw new Error('Error finding users: ' + error.message);
    }
}

const update = async (id, userData) => {
    try {
        const user = await User.findByIdAndUpdate(id, userData, { new: true });
        return user;
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
}

const destroy = async (id) => {
    try {
        const user = await User.findByIdAndDelete(id);
        return user;
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
}

module.exports = {
    create,
    getById,
    getAll,
    update,
    destroy
};