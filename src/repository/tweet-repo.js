const { Tweet } = require('../models');
const CurdRepository = require('./curd-repository');
const logger = require('../config/logger');

class TweetRepository extends CurdRepository{
    constructor(){
        super(Tweet);
    }
    async getByIdAndComments(id) {
        try {
            const tweet = await Tweet.findById(id).populate('user').populate({path: 'comments'});
            return tweet;
        } catch (error) {
            logger.error('Something went wrong in the Tweet Repository: getByIdAndComments', { error });
            throw error;
        }
    }

    async getAllWithComments() {
        try {
            const tweets = await Tweet.find().populate('user').populate({path: 'comments'});
            return tweets;
        } catch (error) {
            logger.error('Something went wrong in the Tweet Repository: getAllWithComments', { error });
            throw error;
        }
    }
}

module.exports = TweetRepository;
