const express=require("express");
const router= express.Router();


const {getProductById,createProduct,getAllUniqueCategories,getProduct,getAllProducts,photo,deleteProduct,updateProduct}=require("../controllers/product");
const {isSignedin,isAuthenticated,isAdmin}=require("../controllers/auth");
const {getUserById}=require("../controllers/user");

//all of params
router.param("userId",getUserById);
router.param("productId",getProductById);

//actual routes
//create route
router.post("/product/create/:userId",isSignedin,
isAuthenticated,isAdmin,createProduct);

//read routes
router.get("/product/:productId",getProduct);
router.get("/product/photo/:productId",photo);

//delete routes
router.delete("/product/:productId/:userId",isSignedin,isAuthenticated,isAdmin,deleteProduct);

//update routes
router.put("/product/:productId/:userId",isSignedin,isAuthenticated,isAdmin,updateProduct);


//listing routes
router.get("/products",getAllProducts);

router.get("/products/categories",getAllUniqueCategories);

module.exports= router;