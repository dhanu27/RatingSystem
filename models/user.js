const mongoose=require('mongoose');


const userSchema =new mongoose.Schema({
    phone:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
   type:{
       type:String,
       required:true,
       enum:['Driver','Passenger']
   }
},{timestamps:true});


const User=mongoose.model('user',userSchema);

module.exports=User;