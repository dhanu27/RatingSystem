const User = require('../models/user');
const Ride=require('../models/ride');
const mongoose=require('mongoose');

// Create ride using driver_id and passenger_id
module.exports.createRide=async function(req,res){
    try{
        
        const {d_id,p_id}=req.query;
        let ride= await Ride.create({
            driver:d_id,
            passenger:p_id
        });
        await ride.populate('driver passenger','name phone').execPopulate();
        return res.status(200).json({
            message:"Ride created successfully",
            data:{
                ride:ride
            }
        });       
    }catch(err){
        console.log("Error in Creating Ride",err);
     res.status(540).json({
         message:"Internal Server Error"
     });
    } 
}

// Adding Rating 
module.exports.addRating=async function(req,res){
    try{
        
        const {ride_id,user,type,rating}=req.body;
        // Find the ride by ride_id
        let ride= await Ride.findById(ride_id);
        if(!ride){
            console.log("Error in Creating Ride",err);
            return res.status(540).json({
                message:"Something Went Wrong"
            });
        }
        // Check authorization for driver and passenger  
         if((type=='Driver'&&ride.driver!=user)||(type=='Passenger'&&ride.passenger!=user)){
                return res.status(401).json({
                    message:"Unauthorized to rate for this ride"
                });       
        }
     // If a type is driver add the rating for  passenger 
        if(type=='Driver'){
            ride.passenger_rating=rating;
        }
       // If a type is passenger add the rating for  driver
        else{
            ride.driver_rating=rating;
        }
        ride.save();
        await ride.populate('driver passenger','name phone').execPopulate();
        return res.status(200).json({
            message:"Ride created successfully",
            data:{
                ride:ride
            }
        });       
    }catch(err){
        console.log("Error in Adding Rating of Ride",err);
     res.status(540).json({
         message:"Internal Server Error"
     });
    } 
}

// To find the aggregated Rating 
module.exports.getAggregatedtRating=async function(req,res){
    try{
    //   Find the user 
         let user=await User.findById(req.params.id);
         let rideStat=null;
        //  If user is Passenger So group by the passenger field and get no. of rides and avg rating
         if(user.type=='Passenger'){
             rideStat= await Ride.aggregate([
                {
                    $match: {
                        passenger: mongoose.Types.ObjectId(req.params.id)
                    }
                },
                {
                    $group:{
                        _id:"$passenger",
                        avg_rating: {$avg:"$passenger_rating"},
                        total_rides:{$sum:1}
                    }
                },
                {
                    $project:{
                        "id": "$passenger",
                        "total_rides": "$total_rides",
                        "avg_rating": "$avg_rating"
                    }
                }
            ]);   
       } //  If user is Driver So group by the driver field and get no. of rides and avg rating
       else{
        rideStat= await Ride.aggregate([
            {
                $match: {
                    driver: mongoose.Types.ObjectId(req.params.id)
                }
            },
            {
                $group:{
                    _id:"$driver",
                    avg_rating: {$avg:"$driver_rating"},
                    total_rides:{$sum:1}
                }
            },
            {
                $project:{
                    "id": "$driver",
                    "total_rides": "$total_rides",
                    "avg_rating": "$avg_rating"
                }
            }
        ]);   
       }
       return res.status(200).json({
        message:"Ride created successfully",
        data:{
            rideStat:rideStat,
            user:user
        }
       });       
    }catch(err){
        console.log("Error in Getting Aggregates of Ride",err);
     res.status(540).json({
         message:"Internal Server Error"
     });
    } 
}