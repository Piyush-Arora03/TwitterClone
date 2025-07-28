const Tweet = require('../models/tweet');

const create=async (tweetData) => {
    try {
        const tweet = await Tweet.create(tweetData);
        return tweet;
    } catch (error) {
        throw new Error('Error creating tweet: ' + error.message);
    }
}

const getById = async (id) => {
    try {
        const tweet = await Tweet.findById(id).populate('user').populate({path:'comments'});
        return tweet;
    } catch (error) {
        throw new Error('Error finding tweet: ' + error.message);
    }
}

const getAll = async () => {
    try {
        const tweets = await Tweet.find().populate('user').populate({path:'comments'});
        return tweets;
    } catch (error) {
        throw new Error('Error finding tweets: ' + error.message);
    }
}

const update = async (id, tweetData) => {
    try {
        const tweet = await Tweet.findByIdAndUpdate(id,tweetData, { new: true });
        return tweet;
    } catch (error) {  
        throw new Error('Error updating tweet: ' + error.message);
    }
}

const destroy = async (id) => {
    try {
        const tweet = await Tweet.findByIdAndDelete(id);
        return tweet;
    } catch (error) {
        throw new Error('Error deleting tweet: ' + error.message);
    }
}

module.exports = {
    create,
    getById,
    getAll,
    update,
    destroy
};

