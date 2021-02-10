const express=require("express");
const router= express.Router();


const {getAllOrders,getOrderById,createOrder,getOrderStatus,updateStatus, getOrderByUserId}= require("../controllers/order");
const {isSignedin,isAuthenticated,isAdmin}=require("../controllers/auth");
const {getUserById,pushOrderInPurchaseList}=require("../controllers/user");
const {updateStock}= require("../controllers/product");
const { model } = require("../models/user");

//params
router.param("userId",getUserById);
router.param("orderId",getOrderById);

//Actual routes
//create
router.post("/order/create/:userId",isSignedin,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder);

//read
router.get("/order/all/:userId",isSignedin,isAuthenticated,isAdmin,getAllOrders);
router.get("/order/:userId",isSignedin,isAuthenticated,getOrderByUserId);



//status of order
router.get("/order/status/:userId",isSignedin,isAuthenticated,isAdmin,getOrderStatus);
router.put("/order/:orderId/status/:userId",isSignedin,isAuthenticated,isAdmin,updateStatus);

module.exports= router;