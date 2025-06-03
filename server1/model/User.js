const mongoose = require("mongoose")

const UserScheema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Full Name  is Mandaitory"],
    
    },

    username:{
        type:String,
        required:[true,"User Name  is Mandaitory"],
        unique:true
    },

    email:{
        type:String,
        required:[true,"Eamil Address  is Mandaitory"],
        unique:true
    },
    phone:{
        type:String,
        required:[true,"Phone Number  is Mandaitory"],
    
    },
    password:{
        type:String,
        required:[true,"Password  is Mandaitory"],
    
    },
    address:{
        type:String,
        default:""    
    },

    city:{
        type:String,
        default:""    
    },

    state:{
        type:String,
        default:""    
    },
    pin:{
        type:String,
        default:""    
    },
    role:{
        type:String,
        default:"User"    
    },
    otp:{
        type:Number,
        default:-2334465678 
    },



    pic:{
        type:String,
        default:""
    },

    active:{
        type:Boolean,
        default:true
    }

})

const User = new mongoose.model("User",UserScheema)

module.exports=User

