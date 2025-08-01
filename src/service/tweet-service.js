const { TweetRepository } = require('../repository');
const HashtagService = require('./hashtag-service');

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagService = new HashtagService();
    }

    async create(userId, content) {
        try {
            const tweet = await this.tweetRepository.create({
                user: userId,
                content: content
            });
            await this.hashtagService.create({
                content: content,
                tweetId: tweet._id
            });
            return tweet;
        } catch (error) {
            throw new Error('Error creating tweet: ' + error.message);
        }
    }
}

module.exports =new TweetService();
