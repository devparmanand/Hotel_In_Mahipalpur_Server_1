const mongoose = require("mongoose")

const NewsletterScheema = new mongoose.Schema({
   
    email:{
        type:String,
        required:[true,"Eamil Address  is Mandaitory"],
    },
   

})

const Newsletter = new mongoose.model("Newsletter",NewsletterScheema)

module.exports=Newsletter
