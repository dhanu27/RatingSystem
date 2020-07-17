const mongoose=require('mongoose');

const RideSchema =new mongoose.Schema({
    driver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    passenger:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    driver_rating:{
       type:Number,
   },
   passenger_rating:{
       type:Number
   }

},{timestamps:true});


const Ride=mongoose.model('ride',RideSchema);

module.exports=Ride;