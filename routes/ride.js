const express=require('express');
const router =express.Router();

const rideController=require('../controllers/ride_controller');
router.post('/create-ride',rideController.createRide);
router.post('/add-rating',rideController.addRating);
router.get('/getAggregatedRating/:id',rideController.getAggregatedtRating);
module.exports=router