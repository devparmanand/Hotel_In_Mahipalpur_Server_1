const path = require("path")
const RoomCart = require("../model/RoomCart")
const Newsletter = require("../model/Newsletter")
const mailer = require("../mailer")
async function createRecord(req,res){
    try {
        const data = new RoomCart(req.body)
        if(req.files){
            data.pic = Array.from(req.files).map((x)=>x.path)
        }
        await data.save()

        
        // let findData = await RoomCart.findOne({_id:data._id})
        //         .populate([
        //             {
        //                 path:"maincategory",
        //                 select:"name"
        //             },

        //             {
        //                 path:"subcategory",
        //                 select:"name"
        //             },

        //             {
        //                 path:"brand",
        //                 select:"name"
        //             },
        //         ])
// New RoomCart Create     Karne Par User Ke Pass Email Chala Jayega
        const   newsaletter= await Newsletter.find()    
        newsaletter.forEach((x)=>{
            mailer.sendMail({
                from:process.env.EMAIL_USER,
                to:x.email,
                subject:"Checkout Our Latest RoomCarts:Team HIM",
                text:`
                     Hello ${data.name}
                     Checkout Our Latest RoomCarts
                     Team:HIM
                     `
               },(error)=>{
                console.log(error);
                
               })
        })  
        res.send({result:"Done", data:data ,message:"Record is created, Successfully"})
    } catch (error) {
        console.log(error);
        
       const errorMessage=[]
       
        error.errors?.name ? errorMessage.push({name:error.errors.name.message}) : ""
        error.errors?.pricePerNight ? errorMessage.push({pricePerNight:error.errors.pricePerNight.message}) : ""
        error.errors?.discount ? errorMessage.push({discount:error.errors.discount.message}) : ""
        error.errors?.finalPrice ? errorMessage.push({finalPrice:error.errors.finalPrice.message}) : ""
        error.errors?.stockQuantity ? errorMessage.push({stockQuantity:error.errors.stockQuantity.message}) : ""
        error.errors?.description ? errorMessage.push({description:error.errors.description.message}) : ""
        error.errors?.pic ? errorMessage.push({pic:error.errors.pic.message}) : ""
        errorMessage.length===0?
        res.status(500).send({result:"Fail",reason:"Internal Server Error"}):
        res.status(500).send({result:"Fail",reason:errorMessage})
        

    }
}

async function getAllRecord(req,res){
    
    try {
        let data  = await RoomCart.find().sort({_id:-1})
        res.send({result:"Done",data:data,count:data.length})   
    } catch (error) {
        res.status(500).send({result:"Fail",reason:"Internal Server Error"})
    }
}

async function getSingleRecord(req,res){
    
    try {
        const data  = await RoomCart
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
        const data  = await RoomCart.findOne({_id:req.params._id})
        if(data){
            data.name=req.body.name??data.name
            data.pricePerNight=req.body.pricePerNight??data.pricePerNight
            data.discount=req.body.discount??data.discount
            data.finalPrice=req.body.finalPrice??data.finalPrice
            data.stockQuantity=req.body.stockQuantity??data.stockQuantity
            data.description=req.body.description??data.description
            if(req.files){
                try {
                  data.oldPic.forEach((x , index)=>{
                    if(!(req.body.oldPic?.split(",").includes(x))){
                        const fs = require("fs")
                        fs.unlinkSync(x)
                    }

                    })

                } catch (error) {}
                if(req.body.oldPic===""){
                    data.pic = req.body.map((x)=>x.path)
                }
                else
                data.pic = req.body.oldPic?.split(",").concat(req.files.map((x)=>x.path))
                   
            }

            await data.save()
            
        res.send({result:"Done",data:data,message:"Record Updated, Successfully"})  
               }
        else
        res.send({result:"Fail",reason:"Invalid Id, Record Not Found"})  

    } catch (error) {
        console.log(error);
        
        res.status(500).send({result:"Fail",reason:"Internal Server Error"})
       
    }
}

async function deleteRecord(req,res){
    
    try {
        const data  = await RoomCart.findOne({_id:req.params._id})
        if(data){
            try {
                    const fs = require("fs")
                    data.pic.forEach((x)=>fs.unlinkSync(x))
                    } catch (error) {}
                    await data.deleteOne()
                    res.send({result:"Done",reason:"Record is Deleted"})  
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



