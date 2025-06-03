const mongoose = require("mongoose")

const TestimonialScheema = new mongoose.Schema({
   
    name:{
        type:String,
        required:[true,"Name  is Mandaitory"],
    },
   
    message:{
        type:String,
        required:[true,"Name  is Mandaitory"],
    },
    pic:{
        type:String,
        required:[true,"Pic  is Mandaitory"],
    },
})

const Testimonial = new mongoose.model("Testimonial",TestimonialScheema)

module.exports=Testimonial
