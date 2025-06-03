const mongoose = require("mongoose")

const BookingScheema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"User  Id is Mandaitory"],
    
    },
     name:{
    type:String,
    required:[true,"Name is Mandaitory"],

   },
     roomId:{
   
    type:String,
       required:[true,"Room Cart  Id is Mandaitory"],

   },

      checkIn:{
        type:String,
        required:[true,"Check In Date  is Mandaitory"],
       
    },

    checkOut:{
        type:String,
        required:[true,"Check Out Date  is Mandaitory"],
       
    },

    adult:{
        type:Number,

        required:[true, "Adult Is Required"]



       
    },
    child:{
        type:Number,
        required:[true, "Child Is Required"]

    },
    bookingStatus:{
       type:String,
       default:"Booking is Confirm"
    },

    paymentMode:{
        type:String,
        default:"Pay at Hotel"
     },

     paymentStatus:{
        type:String,
        default:"Pending"
     },

      pricePerNight:{
    type:Number,
    required:[true,"Price Per Night is Mandaitory"],

   },

totalNight:{
    type:String,
    required:[true,"totalNight is Mandaitory"],

   },

     roomQuantity:{
            type:Number,
            required:[true,"Room Quantity   is Mandaitory"],
        },
    total:{
        type:Number,
        required:[true,"Total Amount   is Mandaitory"],
    },

    rppid:{
        type:Number,
        default:""
    },

    date:{
        type:String,
        default:"" 
    },
     pic:{
    type:String,
    required:[true,"Pic is Mandaitory"],

   },
//    roomcarts:[
//     {
//        roomcart:{
//             type:mongoose.Schema.Types.ObjectId,
//             ref:"RoomCart",
//             required:[true,"Room Cart  Id is Mandaitory"],
//         },
        
//         qty:{
//             type:Number,
//             required:[true,"Booking Room Cart Quantity   is Mandaitory"],
//         },
    
//         total:{
//             type:Number,
//             required:[true,"Total Amount   is Mandaitory"],
//         },
//     }
//    ]
 rooms:[
    {
        room:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"RoomCart",
            required:[true,"Room Cart  Id is Mandaitory"],
        },
        
        // qty:{
        //     type:Number,
        //     required:[true,"Room Quantity   is Mandaitory"],
        // },
    
        // total:{
        //     type:Number,
        //     required:[true,"Total Amount   is Mandaitory"],
        // },
    }
   ]
})
const Booking = new mongoose.model("Booking",BookingScheema)

module.exports=Booking
