const express= require("express");
const router=express.Router();

const {getCategoryById,updateCategory,removeCategory,createCategory,getCategory,getAllCategory}= require("../controllers/category");
const {getUserById}= require("../controllers/user");
const {isSignedin,isAuthenticated,isAdmin}= require("../controllers/auth");

router.param("userId",getUserById);
router.param("categoryId",getCategoryById);

//create routes
router.post("/category/create/:userId",isSignedin,isAuthenticated,
isAdmin,createCategory);

//read routes
router.get("/category/:categoryId",getCategory);
router.get("/categories",getAllCategory);

//update routes
router.put("/category/:categoryId/:userId",isSignedin,isAuthenticated,
isAdmin,updateCategory);

//delete routes
router.delete("/category/:categoryId/:userId",isSignedin,isAuthenticated,
isAdmin,removeCategory);

module.exports= router;