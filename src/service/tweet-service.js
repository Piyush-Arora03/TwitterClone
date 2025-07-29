const { tweet_repo } = require('../repository');
const HashtagService = require('./hashtag-service');

class TweetService {
    constructor() {
        this.tweet_repo = new tweet_repo();
        this.hashtag_service = new HashtagService();
    }

    async create(userId, content) {
        try {
            const tweet = await this.tweet_repo.create({
                user: userId,
                content: content
            });
            await this.hashtag_service.create({
                content: content,
                tweetId: tweet._id
            });
            return tweet;
        } catch (error) {
            throw new Error('Error creating tweet: ' + error.message);
        }
    }
}

module.exports = TweetService;