const { use } = require('passport');
const { CommentRepository, TweetRepository } = require('../repository');
const logger = require('../config/logger');

class CommentService {
    constructor() {
        this.commentRepository = new CommentRepository();
        this.tweetRepository = new TweetRepository();
    }

    async create(userId, tweetId, content) {
        try {
            const comment = await this.commentRepository.create({
                user: userId,
                tweet: tweetId,
                content: content
            });

            const tweet = await this.tweetRepository.get(tweetId);
            tweet.comments.push(comment._id);
            await tweet.save();
            return comment;
        } catch (error) {
            logger.error('Error in CommentService: create', { error });
            throw error;
        }
    }
}

module.exports =new CommentService();
