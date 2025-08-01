const {Like}=require('../models/index');
const CurdRepository=require('./curd-repository');
const logger = require('../config/logger');

class LikeRepository extends CurdRepository{
    constructor(){
        super(Like);
    }
    
    async findByUserAndLikable(data) {
        try {
            const response = await this.model.findOne({
                user: data.user,
                onModel: data.onModel,
                likable: data.likable
            });
            return response;
        } catch (error) {
            logger.error('Something went wrong in the Like Repository: findByUserAndLikable', { error });
            throw error;
        }
    }
}
module.exports=LikeRepository;