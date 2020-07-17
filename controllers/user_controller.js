const User = require('../models/user');
// get the sign up data
module.exports.create =async function(req, res){
   try{
        // check if user already exist using phone number as a primary key
        let user=await User.findOne({phone: req.body.phone}); 
        //    If User found create the new user
            if (!user){
                   let user= await User.create(req.body);
                    return res.status(200).json({
                        message:"User created successfully",
                        data:{
                            user:user
                        }
                    });
            }else{
                res.status(200).json({
                    message:"User already exist"
                });
            }
   }catch(err){
    res.status(540).json({
        message:"Internal Server Error"
    });
   } 
}
