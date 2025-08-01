const mongoose=require('mongoose');

const LikeScheme=new mongoose.Schema({
    onModel:{
        type:String,
        required:true,
        enum:['Tweet','Comment']
    },
    likable:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        refPath:'onModel'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
});

const Like=mongoose.model('Like',LikeScheme);

module.exports=Like;