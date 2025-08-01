const { TweetRepository } = require('../repository');
const HashtagService = require('./hashtag-service');
const logger = require('../config/logger');

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
            logger.error('Error in TweetService: create', { error });
            throw error;
        }
    }
    async delete(tweetId){
        try {
            const response=await this.tweetRepository.destroy(tweetId);
            return response;
        } catch (error) {
            logger.error('Error in TweetService: delete', { error });
            throw error;
        }
    }
}

module.exports =new TweetService();
