class CurdRepository{
    constructor(mdoel){
        this.mdoel=mdoel;
    }

    async get(id){
        try {
            const response=await this.mdoel.findById(id);
            return response;
        } catch (error) {
            throw error;
        }
    }
    async getAll(){
        try {
            const response=await this.mdoel.find({});
            return response;
        }catch(error){
            throw error;
        }
    }
    async create(data){
        try {
            const response=await this.mdoel.create(data);
            return response;
        }catch(error){
            throw error;
        }
    }
    async update(id,data){
        try {
            const response=await this.mdoel.findByIdAndUpdate(id,data,{new:true});
            return response;
        }catch(error){
            throw error;
        }
    }
    async destroy(id){
        try {
            const response=await this.mdoel.findByIdAndDelete(id);
            return response;
        }catch(error){
            throw error;
        }
    }
}

module.exports=CurdRepository