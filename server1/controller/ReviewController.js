const Review = require("../model/Review")
// const {transporter1} = require("../mailer")
async function createRecord(req,res){
    try {
        const data = new Review(req.body)
        data.date = new Date()
        await data.save()
          
//        transporter1.sendMail({
//           from: process.env.EMAIL_USER,
//           to: data.email,
//           subject: "Thank You for Contacting Hotel In Mahipalpur",
//           html: `
//             <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
//               <h2 style="text-align: center; color: #2c3e50;">Thank You for Contacting Hotel In Mahipalpur</h2>
        
//               <p style="text-align: justify;">Dear <strong>${data.name}</strong>,</p>
        
            
//               <p style="text-align: justify;">Thank you for reaching out to Hotel In Mahipalpur</p>
              
//               <p style="text-align: justify;">We have received your message and our team will review it shortly. One of our representatives will get back to you as soon as possible.</p>
//               <p style="text-align: justify;">For urgent inquiries, please feel free to call us at +91 9811226576 </p>
              
        
//               <hr style="margin: 20px 0;">
        
        
//               <div style="margin-top: 20px;">
//                 <p style="margin: 5px 0;">
//                   <img src="https://img.icons8.com/ios-filled/16/000000/worldwide-location.png" style="vertical-align: middle;" />
//                   <a href="https://www.hotelinmahipalpur.com" style="margin-left: 5px; color: #3498db;">www.vhotelthegrandshoba.com</a>
//                 </p>
//                 <p style="margin: 5px 0;">
//                   <img src="https://img.icons8.com/ios-glyphs/16/000000/new-post.png" style="vertical-align: middle;" />
//                   <a href="mailto:info@hotelinmahipalpur.com" style="margin-left: 5px; color: #3498db;">info@vhotelthegrandshoba.com</a>
//                 </p>
//                 <p style="margin: 5px 0;">
//                   <img src="https://img.icons8.com/ios-filled/16/000000/phone.png" style="vertical-align: middle;" />
//                   <span style="margin-left: 5px;">+91 9811226576</span>
//                 </p>
//               </div>
        
//               <p style="text-align: justify; margin-top: 30px;">Warm regards,<br><strong>Team Hotel In Mahipalpur</strong></p>
//             </div>
//           `,
//         });
//           transporter1.sendMail({
//   from: process.env.EMAIL1_USER,
//   to: process.env.EMAIL1_USER,
//   subject: "New Query Has Been Received: Team V GRAND SHOBA",
//   html: `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
//       <h2 style="color: #333;">📩 New Customer Contact US Query</h2>
//       <p style="font-size: 16px; line-height: 1.6;">
//         You have received a new query from a customer. The details are as follows:
//       </p>

//       <table style="width: 100%; border-collapse: collapse;">
//         <tr>
//           <td style="padding: 8px; font-weight: bold;">👤 Name:</td>
//           <td style="padding: 8px;">${data.name}</td>
//         </tr>
//         <tr>
//           <td style="padding: 8px; font-weight: bold;">📧 Email:</td>
//           <td style="padding: 8px;">${data.email}</td>
//         </tr>
//         <tr>
//           <td style="padding: 8px; font-weight: bold;">📞 Phone:</td>
//           <td style="padding: 8px;">${data.phone}</td>
//         </tr>
//         <tr>
//           <td style="padding: 8px; font-weight: bold;">💬 Message:</td>
//           <td style="padding: 8px;">${data.message}</td>
//         </tr>
//       </table>

//       <p style="margin-top: 20px; font-size: 14px; color: #777;">
//         — Team Hotel In Mahipalpur<br>
//         📞 +91 9811320209<br>
//         🌐 <a href="https://www.vhotelthegrandshoba.com" target="_blank">www.vhotelthegrandshoba.com</a><br>
//         ✉️ info@vhotelthegrandshoba.com
//       </p>
//     </div>
//   `
// }, (error) => {
//   if (error) {
//   } else {
//   }
// });

        res.send({result:"Done", data:data ,message:"Record is created, Successfully"})
    } catch (error) {
       const errorMessage=[]
        error.errors?.name ? errorMessage.push({name:error.errors.name.message}) : ""
        error.errors?.rating ? errorMessage.push({rating:error.errors.rating.message}) : ""
        error.errors?.message ? errorMessage.push({message:error.errors.message.message}) : ""
        errorMessage.length===0?
        res.status(500).send({result:"Fail",reason:"Internal Server Error"}):
        res.status(500).send({result:"Fail",reason:errorMessage})
        

    }
}

async function getAllRecord(req,res){
    
    try {
        const data  = await Review.find().sort({_id:-1})
        res.send({result:"Done",cont:data.length,data:data})   
    } catch (error) {
        res.status(500).send({result:"Fail",reason:"Internal Server Error"})
    }
}

async function getSingleRecord(req,res){
    
    try {
        const data  = await Review.findOne({_id:req.params._id})
        if(data)
          res.send({result:"Done",data:data})  
        else
        res.send({result:"Fail",reason:"Invalid Id, Record Not Found"})  

    } catch (error) {
        res.status(500).send({result:"Fail",reason:"Internal Server Error"})
    }
}

async function updateRecord(req,res){
     try {
        const data  = await Review.findOne({_id:req.params._id})
        if(data){
            data.name=req.body.name??data.name
            data.rating=req.body.rating??data.rating
            data.message=req.body.message??data.message
            await data.save()

            // mailer.sendMail({
            //     from:process.env.EMAIL,
            //     to:data.email,
            //     subject:"Your Query Has Been Resolved:Team V GRAND SOBA",
            //     text:`
            //          Hello ${data.name}   
            //          Your Query Has Been Resolved
            //         If You More Query then feel free contact us  again
            //          Team:V GRAND SOBA
            //          `
            //    },(error)=>{
            //    })
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
        const data  = await Review.findOne({_id:req.params._id})
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

module.exports={
    createRecord,
    getAllRecord,
    getSingleRecord,
    updateRecord,
    deleteRecord
}



