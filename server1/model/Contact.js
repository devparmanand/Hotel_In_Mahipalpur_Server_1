const mongoose = require("mongoose")

const ContactScheema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Full Name  is Mandaitory"],
    
    },

    email:{
        type:String,
        required:[true,"Eamil Address  is Mandaitory"],
    },
    phone:{
        type:String,
        required:[true,"Phone Number  is Mandaitory"],
    
    },
     message:{
        type:String,
        required:[true,"Message  is Mandaitory"],
    
    },

})

const Contact = new mongoose.model("Contact",ContactScheema)

module.exports=Contact
