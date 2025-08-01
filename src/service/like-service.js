const { LikeRepository, TweetRepository, CommentRepository } = require('../repository');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const logger = require('../config/logger');

class LikeService {
    constructor() {
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
        this.commentRepository = new CommentRepository();
    }

    async toggleLike(modelId, modelType, userId) {
        try {
            let likable;
            if (modelType === 'Tweet') {
                likable = await this.tweetRepository.get(modelId);
            } else if (modelType === 'Comment') {
                likable = await this.commentRepository.get(modelId);
            } else {
                throw new AppError('Unknown model type for like', StatusCodes.BAD_REQUEST);
            }

            const exists = await this.likeRepository.findByUserAndLikable({
                user: userId,
                onModel: modelType,
                likable: modelId
            });

            let isAdded;
            if (exists) {
                likable.likes.pull(exists.id);
                await likable.save();
                await this.likeRepository.destroy(exists.id);
                isAdded = false;
            } else {
                const newLike = await this.likeRepository.create({
                    user: userId,
                    onModel: modelType,
                    likable: modelId
                });
                likable.likes.push(newLike);
                await likable.save();
                isAdded = true;
            }
            return isAdded;
        } catch (error) {
            logger.error(`Error in LikeService: toggleLike for modelId: ${modelId}`, { error });
            if(error instanceof AppError) throw error;
            throw new AppError('Cannot process like request', StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports =new LikeService();
