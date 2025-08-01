const Comment = require('../models/comment');
const CrudRepository = require('./curd-repository');

class CommentRepository extends CrudRepository {
    constructor() {
        super(Comment);
    }
}

module.exports = CommentRepository;
