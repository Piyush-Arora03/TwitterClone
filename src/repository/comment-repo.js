const Comment = require('../models/comment');

const create = async (data) => {
    try {
        const comment = await Comment.create(data);
        return comment;
    } catch (error) {
        throw new Error('Error creating comment: ' + error.message);
    }
};

module.exports = { create };