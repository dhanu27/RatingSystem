const express=require('express');

console.log("Routers Loaded");
const router =express.Router();


router.get('/',(req,res)=>{return res.status(200).json({
                            message:"Thanks for ride"
                            });
})
router.use('/users',require('./user'));
router.use('/ride',require('./ride'));

module.exports=router;
