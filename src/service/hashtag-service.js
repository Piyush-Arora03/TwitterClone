const { HashtagRepository } = require('../repository');
const logger = require('../config/logger');

class HashtagService {
    constructor() {
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data) {
        try {
            const content = data.content;
            let tags = content.match(/#[a-zA-Z0-9_]+/g);
            if(tags) {
                tags = tags.map((tag) => tag.substring(1).toLowerCase());
                let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
                let titleOfPresenttags = alreadyPresentTags.map(tags => tags.content);
                let newTags = tags.filter(tag => !titleOfPresenttags.includes(tag));
                newTags = newTags.map(tag => {
                    return {content: tag, tweets: [data.tweetId]}
                });
                await this.hashtagRepository.bulkCreate(newTags);
                alreadyPresentTags.forEach((tag) => {
                    tag.tweets.push(data.tweetId);
                    tag.save();
                });
            }
        } catch (error) {
            logger.error('Error in HashtagService: create', { error });
            throw error;
        }
    }
}

module.exports =HashtagService;
