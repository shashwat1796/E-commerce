const Product= require("../models/product");
const formidable= require("formidable");
const _=require("lodash");
const fs=require("fs");
const { sortBy } = require("lodash");
const product = require("../models/product");

exports.getProductById=(req,res,next,id)=>{
    Product.findById(id).populate("category").exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error:"Product not found"
            });
        }
        req.product=product;
        next();
    });
};


exports.createProduct=(req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"Problem with image"
            });
        }
        //destructure the fields
        const {price,description,name,category,stock}= fields;
        
        if(
            !name||
            !description||
            !price||
            !category||
            !stock
        ){
            return res.status(400).json({
                error: "Please include all fields"
            });

        }
        
        
        let product = new Product(fields);

        //handle file here
        if(file.photo){
            if(file.photo.size>3000000){
                return res.status(400).json({
                    error: "file size too big"
                });
            }
            product.photo.data=fs.readFileSync(file.photo.path);
            product.photo.contentType= file.photo.type;
        }
        console.log(product);
        //save to DB
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error: "Saving product in DB failed"
                });
            }
            res.json(product);
        });
    });
};

exports.getProduct= (req,res)=>{
    req.product.photo= undefined;
    return res.json(req.product);
};

//middleware
exports.photo=(req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

//delete controllers
exports.deleteProduct=(req,res)=>{
let product= req.product;
product.remove((err,deletedProduct)=>{
    if(err){
        return res.status(400).json({
            error:"Failed to delete the product"
        });
    }
    res.json({
        message:"deletion successful",
        deletedProduct
    });
});
};

//udate controllers
exports.updateProduct=(req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"Problem with image"
            });
        }
        
        
        //updation code
        let product = req.product;
        product= _.extend(product, fields)

        //handle file here
        if(file.photo){
            if(file.photo.size>3000000){
                return res.status(400).json({
                    error: "file size too big"
                });
            }
            product.photo.data=fs.readFileSync(file.photo.path);
            product.photo.contentType= file.photo.type;
        }
         
        //save to DB
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error: "Updation of product in DB failed"
                });
            }
            res.json(product);
        });
    });

};

//product listing

exports.getAllProducts=(req,res)=>{
   let limit =req.query.limit ? parseInt(req.query.limit) : 8;
   let sertBy= req.query.sortBy ? req.query.sortBy : "_id";
    Product.find().select("-photo").populate("category").limit(limit).sort([[sortBy,"asc"]]).exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:"No product found!"
            });
        }
        res.json(products);
    });
};

exports.getAllUniqueCategories=(res,req)=>{
    Product.distinct("category",{},(err,category)=>{
        if(err){
            return res.status(400).json({
                error: "No category found!"
            });
        }
        res.json(category);
    });
};

exports.updateStock= (req,res,next)=>{

 let myoperations= req.body.order.products.map(prod=>{
     return{
         updateOne: {
             filter:{_id: prod._id},
             update: {$inc: {stock:-prod.count,sold: +prod.count}}
         }
     }
 });

 Product.bulkWrite(myoperation,{},(err,products)=>{
     if(err){
         return res.status(400).json({
             error:"bulk operation failed"
         });
     }
     next();
 });

};
