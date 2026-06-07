const user=require("../models/User");
const register=async (req,res)=>{
    try{
        res.json({
            message:"register endpoint working"
        });
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
module.exports={register};