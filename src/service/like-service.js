const { LikeRepository, TweetRepository, CommentRepository } = require('../repository');

class LikeService {
    constructor() {
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
        this.commentRepository = new CommentRepository();
    }

    async toggleLike(modelId, modelType, userId) {
        let likable;
        if (modelType === 'Tweet') {
            likable = await this.tweetRepository.get(modelId);
        } else if (modelType === 'Comment') {
            likable = await this.commentRepository.get(modelId);
        } else {
            throw new Error('Unknown model type');
        }

        const exists = await this.likeRepository.findByUserAndLikable({
            user: userId,
            onModel: modelType,
            likable: modelId
        });

        if (exists) {
            likable.likes.pull(exists.id);
            await likable.save();
            await this.likeRepository.destroy(exists.id);
            var isAdded = false;
        } else {
            const newLike = await this.likeRepository.create({
                user: userId,
                onModel: modelType,
                likable: modelId
            });
            likable.likes.push(newLike);
            await likable.save();
            var isAdded = true;
        }
        return isAdded;
    }
}

module.exports =new LikeService();
