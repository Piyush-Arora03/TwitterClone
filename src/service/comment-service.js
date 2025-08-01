const { CommentRepository, TweetRepository } = require('../repository');

class CommentService {
    constructor() {
        this.commentRepository = new CommentRepository();
        this.tweetRepository = new TweetRepository();
    }

    async create(userId, tweetId, content) {
        const comment = await this.commentRepository.create({
            user: userId,
            tweet: tweetId,
            content: content
        });

        const tweet = await this.tweetRepository.get(tweetId);
        tweet.comments.push(comment._id);
        await tweet.save();

        return comment;
    }
}

module.exports =new CommentService();
