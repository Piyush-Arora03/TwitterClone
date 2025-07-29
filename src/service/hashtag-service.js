const { hashtag_repo } = require('../repository');

class HashtagService {
    constructor() {
        this.hashtag_repo = new hashtag_repo();
    }

    async create(data) {
        try {
            const content = data.content;
            let tags = content.match(/#[a-zA-Z0-9_]+/g); 
            if(tags) {
                tags = tags.map((tag) => tag.substring(1).toLowerCase());
                let alreadyPresentTags = await this.hashtag_repo.findByName(tags);
                let titleOfPresenttags = alreadyPresentTags.map(tags => tags.content);
                let newTags = tags.filter(tag => !titleOfPresenttags.includes(tag));
                newTags = newTags.map(tag => {
                    return {content: tag, tweets: [data.tweetId]}
                });
                await this.hashtag_repo.bulkCreate(newTags);
                alreadyPresentTags.forEach((tag) => {
                    tag.tweets.push(data.tweetId);
                    tag.save();
                });
            }
        } catch (error) {
            console.log(error);
            throw new Error('Error creating hashtags: ' + error.message);
        }
    }
}

module.exports = HashtagService;

/**
 * 
 */