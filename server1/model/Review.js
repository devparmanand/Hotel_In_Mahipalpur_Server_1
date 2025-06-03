const mongoose = require("mongoose")

const ReviewScheema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Full Name  is Mandaitory"],
    
    },

    rating:{
        type:String,
        required:[true,"Rating  is Mandaitory"],
    },
     message:{
        type:String,
        required:[true,"Message  is Mandaitory"],
    
    },

})

const Review = new mongoose.model("Review",ReviewScheema)

module.exports=Review
