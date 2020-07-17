# Rating System in this both the driver and passenger rate each other after the ride.

### Assumptions
  #### Uniquely indentify the user by phone no.
  #### Ride only when their is both user and passenger .
  #### After riding both passenger and driver rate or it would consider as zero.
  #### Not make login or signup system or use session thats why user_id have to input every time 
  
### Approach
  #### Firstly create the user and use field type which classify the driver and passenger 
  #### Now everytime a passenger ride a new ride entry created with passenger_id ,driver_id 
  #### After the compeletion of ride both rated the each other when driver rate passenger it goes to passenger filed and  vice-versa
  #### By this user can get the rating for every ride (s)he took just by search in the ride table for getting aggregated rating apply group-By clause on driver if user is driver or on passenger if user is passenger
  
### DB  Schema
### Database -MongoDB , ODM : Mongoose
 #### User schema contains the following field :-
   ##### name , phone , type :enum ['Driver','Passenger'] 
 #### Ride schema contains the following field
   ##### driver :ref(user) , passenger:ref(user), driver_rating ,passenger_rating
   
### Scripts
  #### npm install node-modules
  #### npm install express 
  #### set up mongoDB
  #### npm install mongoose
  #### also install Robo-3T or compass
  
### Api's as follow:
 #### POST:- localhost:8000/users/create-user To Create the user with form -data keys phone,name,type
 #### POST:- localhost:8000/ride/create-ride?d_id='Driver_id'&p_id='Passenger_id'  To create ride
 #### POST:- localhost:8000/ride/add-rating  To add the rating with form-data type, user,ride_id, rating user:- user_id (practically in we have all these input in session except rating).
 #### GET:-  localhost:8000/ride/getAggregatedRating/:id To get the aggregated rating of the user rides just user_id
### To check this open the POSTMAN 
  ### Create user one driver ,passenger using above mentioned api's
  ### create some rides and rating
  ### Enter the data in x-www-form-urlencoded content type not in form-data
# Time Spent 4 hrs  
 
  
    


