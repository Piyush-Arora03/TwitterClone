const {Like}=require('../models/index');
const CurdRepository=require('./curd-repository');

class LikeRepository extends CurdRepository{
    constructor(){
        super(Like);
    }
    
    async findByUserAndLikable(data){
        try {
            const response=await this.mdoel.findOne({
                where:{
                    likable:data.modelType,
                    user:data.user
                }
            });
            return response;
        } catch (error) {
            throw new Error('Error getting data in like repository'+error.message);
        }
    }
}
module.exports=LikeRepository;