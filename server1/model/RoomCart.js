const mongoose = require("mongoose")

const RoomCartScheema = new mongoose.Schema({
   
    name:{
        type:String,
        required:[true,"Room Category Name  is Mandaitory"],
    },
   
    pricePerNight:{
        type:Number,
        required:[true,"Price Per Night  is Mandaitory"],
    },

    discount:{
        type:Number,
      required:[true,"Discount  is Mandaitory"],
    },

    finalPrice:{
        type:Number,
       required:[true,"Final Price  is Mandaitory"], 
    },

stockQuantity:{
        type:Number,
        required:[true,"Room Stock Quantity  is Mandaitory"],
    },

    description:{
        type:String,
        required:[true,"Room Description  is Mandaitory"],
    },
    pic:[

    ],


})

const RoomCart = new mongoose.model("RoomCart",RoomCartScheema)

module.exports=RoomCart
