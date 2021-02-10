const mongoose= require("mongoose");
const {ObjectId}= mongoose.Schema;



const orderSchema= new mongoose.Schema({

    // products: {
    //     type:ObjectId,
    //     ref:"ProductCart"
    // },
    
    amount: {type: Number},
    user:{
        type:ObjectId,
        ref:"User"
    },
    mobno:Number,
    address:String,
    pincode:Number,
    city:String,
    status:{
        type:String,
        default: "Received",
        enum:["Cancelled","Delivered","Shipped","Processing","Received"]
    },
    updated: Date

},{timestamps: true});

module.exports= mongoose.model("Order",orderSchema);

