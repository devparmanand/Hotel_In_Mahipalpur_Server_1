const mongoose = require("mongoose")

const AvailabilityScheema = new mongoose.Schema({
   
    checkIn:{
        type:String,
        required:[true,"CheckIn  is Mandaitory"],
    },
   
    checkOut:{
        type:String,
        required:[true,"CheckOut  is Mandaitory"],
    },

    adult:{
        type:Number,
      required:[true,"Adult  is Mandaitory"],
    },

    child:{
        type:Number,
       required:[true,"Child  is Mandaitory"], 
    },

roomQuantity:{
        type:Number,
        required:[true,"Room Quantity  is Mandaitory"],
    },

    totalDays:{
        type:Number,
        required:[true,"TotalDays  is Mandaitory"],
    },
    
  total:{
        type:Number,
        required:[true,"Total  is Mandaitory"],
    },

})

const Availability = new mongoose.model("Availability",AvailabilityScheema)

module.exports=Availability
