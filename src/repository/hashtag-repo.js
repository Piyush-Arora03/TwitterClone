const { Hashtag } = require('../models/index');
const logger = require('../config/logger');

class HashtagRepository {
    constructor() {
        this.hashtagModel = Hashtag;
    }

    async bulkCreate(data) {
        try {
            const tags = await this.hashtagModel.insertMany(data);
            return tags;
        } catch (error) {
            logger.error('Something went wrong in the Hashtag Repository: bulkCreate', { error });
            throw error;
        }
    }

    async findByName(titleList) {
        try {
            const tags = await this.hashtagModel.find({
                content: { $in: titleList}
            }).hint({ content: 1 });
            return tags;
        } catch (error) {
            logger.error('Something went wrong in the Hashtag Repository: findByName', { error });
            throw error;
        }
    }
}

module.exports = HashtagRepository;