var express= require("express");
var router= express.Router();
const {check,validationResult}= require('express-validator');
const {signout,signup,signin,isSignedin}= require("../controllers/auth.js");

router.post("/signup",[
    check("name","name should be atleast 3 characters").isLength({min: 3}),
    check("email","email is required").isEmail(),
    check("password","password should be atleast 3 characters").isLength({min: 3})    
],signup);

router.post("/signin",[
    check("email","email is required").isEmail(),
    check("password","password field is required").isLength({min: 1})    
],signin);
router.get("/signout",signout);

router.get("/testroute",isSignedin,(req,res)=>{
    res.send("A protected route");
});


module.exports=router;
