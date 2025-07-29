const { Tweet } = require('../models');

class TweetRepository {
    async create(tweetData) {
        try {
            const tweet = await Tweet.create(tweetData);
            return tweet;
        } catch (error) {
            throw new Error('Error creating tweet: ' + error.message);
        }
    }

    async getById(id) {
        try {
            const tweet = await Tweet.findById(id).populate('user').populate({path:'comments'});
            return tweet;
        } catch (error) {
            throw new Error('Error finding tweet: ' + error.message);
        }
    }

    async getAll() {
        try {
            const tweets = await Tweet.find().populate('user').populate({path:'comments'});
            return tweets;
        } catch (error) {
            throw new Error('Error finding tweets: ' + error.message);
        }
    }

    async update(id, tweetData) {
        try {
            const tweet = await Tweet.findByIdAndUpdate(id,tweetData, { new: true });
            return tweet;
        } catch (error) {  
            throw new Error('Error updating tweet: ' + error.message);
        }
    }

    async destroy(id) {
        try {
            const tweet = await Tweet.findByIdAndDelete(id);
            return tweet;
        } catch (error) {
            throw new Error('Error deleting tweet: ' + error.message);
        }
    }
}

module.exports = TweetRepository;
