const mongoose= require("mongoose");
const {ObjectId}= mongoose.Schema;

const ProductCartSchema=new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"Product"
    },
   
  
});

module.exports= mongoose.model("ProductCart",ProductCartSchema);