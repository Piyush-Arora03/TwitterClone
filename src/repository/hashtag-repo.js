const { Hashtag } = require('../models/index');

class HashtagRepository {
    constructor() {
        this.hashtagModel = Hashtag;
    }

    async bulkCreate(data) {
        try {
            const tags = await this.hashtagModel.insertMany(data);
            return tags;
        } catch (error) {
            console.log(error);
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
            console.log(error);
        }
    }
}

module.exports = HashtagRepository;