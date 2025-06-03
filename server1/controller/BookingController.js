// const Booking = require("../model/Booking")
// const RoomCart = require("../model/RoomCart")
// const {transporter1} = require("../mailer")
// async function createRecord(req,res){
//     try {
//         const data = new Booking(req.body)
//         data.date = new Date()
        
//         await data.save()
//         data.roomcarts?.forEach( async(x)=>{
//             let roomcart = await RoomCart.findOne({_id:x.roomcart})
//                roomcart.stockQuantity=roomcart.stockQuantity-x.qty
//             //    roomcart.stock = roomcart.stockQuantity-x.qty=== 0 ? false : true
//                await roomcart.save() 
//                })
//  let check = await Booking.findOne({_id:data._id},{_id:0,user:1}).populate({path:"user",select:"name -_id email"})
//   let {user}=check
              
//  transporter1.sendMail({
//                 from:process.env.EMAIL_USER,
//                 to:user.email,
//                 subject:"Your Booking Has Been Confirm: Team HIM",
//                 text:`
//                      Hello ${user.name} 
//                     Your Booking Has Been Confirm 
//                     Shop more, Save more
//                      Team:HIM
//                      `
//                },(error)=>{
//                 console.log(error);
                
//                })
//             res.send({result:"Done", data:data,message:"Record is created, Successfully"})
//     } catch (error) { 
//         console.log(error);
//        const errorMessage=[]
//         error.errors?.user ? errorMessage.push({user:error.errors.user.message}) : ""
//         error.errors?.total ? errorMessage.push({total:error.errors.total.message}) : ""
//         errorMessage.length===0?
//         res.status(500).send({result:"Fail",reason:"Internal Server Error"}):
//         res.status(500).send({result:"Fail",reason:errorMessage})
//          }
// }

// async function getAllRecord(req,res){
    
//     try {
//         const data  = await Booking.find().sort({_id:-1}).populate([
//             {
//                 path:"user",
//                 select:"name email phone address"
//             },
//             {
//                 path:"RoomCarts.RoomCart",
//                 select:"name checkIn checkOut adult child roomQuantity pricePerNight totalDays  total    discount finalPrice pic  stockQuantity",
              
//                 options:{slice:{pic:1}},


//             },

//         ])
//         res.send({result:"Done",count:data.length,data:data ,message:"Booking Data is get Successfully"})   
//     } catch (error) {
//         console.log(error);
        
//         res.status(500).send({result:"Fail",reason:"Internal Server Error"})
//     }
// }

// async function getAllUserRecords(req,res){
    
//     try {
//         const data  = await Booking.find({user:req.params.userid}).sort({_id:-1}).populate([
//             {
//                 path:"user",
//                 select:"name email phone address"
//             },
//             {
//                 path:"RoomCarts.RoomCart",
//                 select:"name checkIn checkOut adult child roomQuantity pricePerNight totalDays  total discount finalPrice pic  stockQuantity",
              
//                 options:{slice:{pic:1}},
//               },

//         ])
//         res.send({result:"Done",count:data.length,data:data})   
//     } catch (error) {
//         res.status(500).send({result:"Fail",reason:"Internal Server Error"})
//     }
// }

// async function getSingleRecord(req,res){
//     try {
//         const data  = await Booking.findOne({_id:req.params._id}).populate([
//             {
//                 path:"user",
//                 select:"name email phone address"
//             },
//             {
//                 path:"RoomCarts.RoomCart",
//                 select:"name checkIn checkOut adult child roomQuantity pricePerNight totalDays  total discount finalPrice pic  stockQuantity",
          
//                 options:{slice:{pic:1}},
//              },
//         ])
//         if(data)
//           res.send({result:"Done",data:data})  
//         else
//         res.send({result:"Fail",reason:"Invalid Id, Record Not Found"})  

//     } catch (error) {
//         res.status(500).send({result:"Fail",reason:"Internal Server Error"})
//     }
// }

// async function updateRecord(req,res){
//      try {
//         const data  = await Booking.findOne({_id:req.params._id})
//         if(data){
//             data.BookingStatus=req.body.BookingStatus??data.BookingStatus
//             data.paymentStatus=req.body.paymentStatus??data.paymentStatus
//             data.paymentMode=req.body.paymentMode??data.paymentMode
//             data.rppid=req.body.rppid??data.rppid
//             await data.save()
//             let finalData = await Booking.findOne({_id:data._id}).populate([
//                 {
//                     path:"user",
//                     select:"name email phone address"
//                 },
//                 {
//                     path:"RoomCarts.RoomCart",
//                     select:"name checkIn checkOut adult child roomQuantity pricePerNight totalDays  total discount finalPrice pic  stockQuantity",
                
//                     options:{slice:{pic:1}},
    
    
//                 },
    
//             ])
//          let user = finalData.user
//             transporter1.sendMail({
//                 from:process.env.EMAIL_USER,
//                 to:user.email,
//                 subject:"Status of Your Booking Has Been Changed: Team HIM",
//                 text:`
//                      Hello ${user.name} 
//                     Status of Your Booking Has Been Changed 
//                     Your Booking Status : ${req.body.BookingStatus}
//                      Team:HIM
//                      `
//                },(error)=>{
//                 console.log(error);
                
//                })
//         res.send({result:"Done", data:finalData,message:"Record Updated, Successfully"})  
//                }
//         else
//         res.send({result:"Fail",reason:"Invalid Id, Record Not Found"})  

//     } catch (error) {
//         console.log(error);
//          res.status(500).send({result:"Fail",reason:"Internal Server Error"})
//        }
// }

// async function deleteRecord(req,res){
    
//     try {
//         const data  = await Booking.findOne({_id:req.params._id})
//         if(data){
//             await data.deleteOne()
//             res.send({result:"Done",reason:"Record is Deleted"})  
//        }
//        else
//         res.send({result:"Fail",reason:"Invalid Id, Record Not Found"})  

//     } catch (error) {
//         res.status(500).send({result:"Fail",reason:"Internal Server Error"})
//     }
// }

// module.exports={
//     createRecord,
//     getAllRecord,
//     getSingleRecord,
//     updateRecord,
//     deleteRecord,
//     getAllUserRecords
// }

const Booking = require("../model/Booking")
const RoomCart = require("../model/RoomCart")
const {transporter1} = require("../mailer")
 
const  Razorpay = require ("razorpay")


// Payment Api

async function order(req,res){
    try {
         const  instance = new Razorpay({
            key_id : process.env.RPKEYID,
            key_secret : process.env.RPSECRET_KEY
            
          });
          
        const options = {
            amount : req.body.amount * 100,
            currency : "INR"
        };
        instance.orders.create(options, (error,order)=>{
            if(error){
                return res.status(500).json({message:"Something went wrong"})                
            }
            res.status(200).json({data:order})
        })
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}


async function verifyOrder(req,res){
    try {
        var check =await Booking.findOne({_id:req.body.checkid})
        check.rppid = req.body.razorpay_payment_id
        check.paymentStatus="Done"
        check.paymentMode = "Net Banking"
        await check.save()
        res.status(200).json({result:"Done", message:"Payment Done Successfully"})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}
async function createRecord(req,res){
    try {
        const data = new Booking(req.body)
        data.date = new Date()
        await data.save()
   
    //  const room = await RoomCart.findById(req.body.roomId);
     
    //     if (!room) return res.status(404).send({ message: "Room not found" });

    //     if (room.stockQuantity < req.body.qty) {
    //         return res.status(400).send({ message: "Not enough stock available" });
    //     }

    //     // ✅ Reduce stock
    //     room.stockQuantity -= req.body.qty;
    //     await room.save();

 let check = await Booking.findOne({_id:data._id},{_id:0,user:1}).populate({path:"user",select:"name -_id email"})
  let {user}=check

  
    transporter1.sendMail({
    from:process.env.EMAIL_USER,
    
    to:user?.email,
    subject:"Booking Confirmation – V Hotel The Grand Shoba",
    html: `
         <p>Dear <strong>${user?.name}</strong>,</p>
        <p>Thank you for choosing <strong>V Hotel The Grand Shoba</strong>. Your room booking has been successfully confirmed. Please find the booking details below:</p>

        <h3>Booking Details:</h3>
        <ul>
          <li><strong>Booking Id:</strong> ${data._id}</li>
          <li><strong>Room Id:</strong> ${data.roomId}</li>
          <li><strong>Room Category:</strong> ${data.name}</li>
          <li><strong>Price/Night:</strong> ₹${data.pricePerNight} per night</li>
          <li><strong>Total Night:</strong> ${data.totalNight} night</li>
          <li><strong>Room Quantity:</strong> ${data.roomQuantity} room</li>
          <li><strong>Total Price :</strong> ${data.total}</li>
          <li><strong>Check-in Date:</strong> ${data.checkIn}</li>
          <li><strong>Check-out Date:</strong> ${data.checkOut}</li>
          <li><strong>Booking Status:</strong> ${data.bookingStatus}</li>
          <li><strong>Payment Mode:</strong> ${data.paymentMode}</li>
          <li><strong>Payment Status:</strong> ${data.paymentStatus}</li>
        </ul>

        <p>If you have any special requests or need further assistance, please feel free to contact us at <a href="mailto:info@vhotel.com">info@vhotel.com</a> or call us at <strong>+91-1234567890</strong>.</p>
        
        <p>Warm regards,<br/>Team V Hotel The Grand Shoba</p>
         `
   },(error)=>{
    console.log(error);
    
   })
   transporter1.sendMail(
  {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Admin email
    subject: "New Booking Received – V Hotel The Grand Shoba",
    html: `
      <p>Dear Admin,</p>

      <p>A new room booking has been received with the following details:</p>

      <h3>Booking Information</h3>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;">
        <tr>
          <td><strong>Booking ID</strong></td>
          <td>${data._id}</td>
        </tr>
        <tr>
          <td><strong>Room ID</strong></td>
          <td>${data.roomId}</td>
        </tr>
        <tr>
          <td><strong>Room Category</strong></td>
          <td>${data.name}</td>
        </tr>
        <tr>
          <td><strong>Price per Night</strong></td>
          <td>₹${data?.pricePerNight}</td>
        </tr>
        <tr>
          <td><strong>Total Night</strong></td>
          <td>₹${data?.totalNight}</td>
        </tr>
        <tr>
          <td><strong>Room Quantity</strong></td>
          <td>₹${data?.roomQuantity}</td>
        </tr>
        <tr>
          <td><strong>Total Price</strong></td>
          <td>₹${data.total}</td>
        </tr>
        <tr>
          <td><strong>Check-in Date</strong></td>
          <td>${data.checkIn}</td>
        </tr>
        <tr>
          <td><strong>Check-out Date</strong></td>
          <td>${data.checkOut}</td>
        </tr>
        <tr>
          <td><strong>Booking Status</strong></td>
          <td>${data.bookingStatus}</td>
        </tr>
        <tr>
          <td><strong>Payment Mode</strong></td>
          <td>${data.paymentMode}</td>
        </tr>
        <tr>
          <td><strong>Payment Status</strong></td>
          <td>${data.paymentStatus}</td>
        </tr>
      </table>

      <h3>Guest Details</h3>
      <ul>
        <li><strong>Name:</strong> ${user?.name}</li>
        <li><strong>Email:</strong> ${user?.email}</li>
      </ul>

      <p>Please ensure all arrangements are made for the upcoming check-in.</p>

      <p>Regards,<br/>
      <strong>Booking System – V Hotel The Grand Shoba</strong></p>
    `,
  },
  (error) => {
    console.log(error);
  }
);
res.send({result:"Done", data:data,message:"Record is created, Successfully"})
} catch (error) { 
    console.log(error);
    
const errorMessage=[]
     error.errors?.name ? errorMessage.push({name:error.errors.name.message}) : ""
     error.errors?.roomId ? errorMessage.push({roomId:error.errors.roomId.message}) : ""
        error.errors?.checkIn ? errorMessage.push({checkIn:error.errors.checkIn.message}) : ""
        error.errors?.checkOut ? errorMessage.push({checkOut:error.errors.checkOut.message}) : ""
        error.errors?.adult ? errorMessage.push({adult:error.errors.adult.message}) : ""
        error.errors?.child ? errorMessage.push({child:error.errors.child.message}) : ""
        error.errors?.pic ? errorMessage.push({pic:error.errors.pic.message}) : ""
        error.errors?.pricePerNight ? errorMessage.push({pricePerNight:error.errors.pricePerNight.message}) : ""
       error.errors?.user ? errorMessage.push({user:error.errors.user.message}) : ""
       error.errors?.roomQuantity ? errorMessage.push({roomQuantity:error.errors.roomQuantity.message}) : ""
        error.errors?.total ? errorMessage.push({total:error.errors.total.message}) : ""

errorMessage.length===0?
res.status(500).send({result:"Fail",reason:"Internal Server Error"}):
res.status(500).send({result:"Fail",reason:errorMessage})
}
}

   

async function getAllRecord (req, res){
    try {
        let data = await Booking.find().sort({_id:-1}).populate([
            {path:"user", select:"name email phone pin address city state  "},
            {path:"rooms.room", select:"name price  finalPrice pic stockQuantity",
                options:{slice:{pic:1}},     // this line used to any array from fetch single img 
             
            },
        ])
        res.send({result:"Done", count:data.length , data:data})
    } catch (error) {
        res.status(500).send({result:"fail", reason:"Internal server error"})
    }
}



async function getSingleRecord (req, res){
    try {
        let data = await Booking.findOne({_id:req.params._id}).populate([
            {path:"user", select:"name email phone pin address city state  "},
            {path:"rooms.room", select:"name price  finalPrice pic stockQuantity",
                options:{slice:{pic:1}},     // this line used to any array from fetch single img 
             
            },
        ])
        res.send({result:"Done", data:data})
    } catch (error) {
        res.status(500).send({result:"fail", reason:"Internal server error"})
    }
}




 async function getAllUserRecords (req, res){
    try {
        let data = await Booking.find({user:req.params.userid}).sort({_id:-1}).populate([
            {path:"user", select:"name email phone pin address city state  "},
            {path:"rooms.room", select:"name maincategory finalPrice pic stockQuantity",
                options:{slice:{pic:1}},     // this line used to any array from fetch single img 
               
            },
        ])
        res.send({result:"Done", count:data.length , data:data})
    } catch (error) {
        res.status(500).send({result:"fail", reason:"Internal server error"})
    }
}




async function getSingleRecord(req,res){
    try {
        let data = await Booking.findOne({_id:req.params._id}).populate([
            {path:"user", select:"name email phone pin address city state  "},
            {path:"rooms.room", select:"name price  finalPrice pic stockQuantity",
                options:{slice:{pic:1}},     // this line used to any array from fetch single img 
                         },
        ])
        if(data)
            res.send({result:"Done", data:data})
        else
          res.status(500).send({result:"Fail", reason:"Invailid Id or Data Not Found"})
    } catch (error) {
        console.log(error);
    
         res.status(500).send({result:"fail", reason:"Internal Server error"})
    }
}







async function updateRecord(req,res){
    try {
        let data= await Booking.findOne({_id:req.params._id})
        if(data){
                data.bookingStatus = req.body.bookingStatus ?? data.bookingStatus
                data.paymentStatus = req.body.paymentStatus ?? data.paymentStatus
                data.paymentMode = req.body.paymentMode ?? data.paymentMode
                data.rppid = req.body.rppid ?? data.rppid
               await data.save()
     
               let  finalData = await Booking.findOne({_id:data._id}).populate([
                {path:"user", select:"name email phone pin address city state  "},
                {path:"products.product", select:"name finalPrice pic stockQuantity",
                    options:{slice:{pic:1}},     // this line used to any array from fetch single img 
                   
                },
            ])

    let user = finalData.user
    
   transporter1.sendMail({
   from:process.env.EMAIL_USER,
   to:user.email,
   subject:"Team HIM: Status of Your  Booking Has Been Changed",
   html:
     `<h4>
            Dear ${user.name},
          </h4>
       <h4>Your Order Status Has been Chenged.</h4>
       <h4> We wanted to update you on the status of your order. Below are the details of your recent purchase: </h4>

      <p>Your Order Status : ${req.body.bookingStatus}</p>
      <p>Thank you for choosing HIM. We hope you enjoy your shopping experience with us!</p> 
           <br/>

       Thanks & Regards,
       <h2>Mr. Aditya Khanna </h2>
       Founder and partner of HIM <br/>
        www.vgrandsoba.com
      `
           },(error)=>{

            })


               res.send({result:"Done", data:finalData, message:"data update successfully"})
           
         
        }
        else
         res.status(500).send({result:"fail", reason:"Invalid id or Data not found"})
    } catch (error) {
          res.status(500).send({result:"fail", reason:"Internal server error"}) 
         
        
    }
}







async function updateRecord(req,res){
     try {
        const data  = await Booking.findOne({_id:req.params._id})
        if(data){
            data.checkIn=req.body.checkIn??data.checkIn
            data.checkOut=req.body.checkOut??data.checkOut
            data.qty=req.body.qty??data.qty
            data.total=req.body.total??data.total
            data.adult=req.body.adult??data.adult
            data.child=req.body.child??data.child
            await data.save()


        res.send({result:"Done",message:"Record Updated, Successfully"})  
               }
        else
        res.send({result:"Fail",reason:"Invalid Id, Record Not Found"})  

    } catch (error) {
        res.status(500).send({result:"Fail",reason:"Internal Server Error"})
    }
}

async function deleteRecord(req,res){
    try {
        const data  = await Booking.findOne({_id:req.params._id})
        if(data){
          if(data.active){
            res.send({result:"Fail" ,reason:"Can't Delete Active Contact Us Query"})
          }
          else{
            await data.deleteOne()
            res.send({result:"Done",reason:"Record is Deleted"})  
          }
        }
        else
        res.send({result:"Fail",reason:"Invalid Id, Record Not Found"})  

    } catch (error) {
        res.status(500).send({result:"Fail",reason:"Internal Server Error"})
    }
}
async function cancelBooking(req, res) {
    try {
        const booking = await Booking.findById(req.params.id).populate('room');
        if (!booking) return res.status(404).send({ message: "Booking not found" });

        // ✅ Increase stock
        booking.room.stockQuantity += booking.qty;
        await booking.room.save();

        // ✅ Remove booking
        await booking.deleteOne();

        res.send({ message: "Booking cancelled and stock restored" });
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports={
    createRecord,
    getAllRecord,
    getAllRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord,
    getAllUserRecords,
    order,
    verifyOrder,
    cancelBooking
}

