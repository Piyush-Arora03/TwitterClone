const { comment_repo, tweet_repo } = require('../repository');

class CommentService {
    async create(userId, tweetId, content) {
        const comment = await comment_repo.create({
            user: userId,
            tweet: tweetId,
            content: content
        });

        const tweet = await tweet_repo.getById(tweetId);
        tweet.comments.push(comment._id);
        await tweet.save();

        return comment;
    }
}

module.exports = CommentService;