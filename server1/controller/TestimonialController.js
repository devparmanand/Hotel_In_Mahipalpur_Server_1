const Testimonial = require("../model/Testimonial")
async function createRecord(req,res){
    try {
        const data = new Testimonial(req.body)
        if(req.file){
            data.pic = req.file.path
        }
        await data.save()

        res.send({result:"Done", data:data ,message:"Record is created, Successfully"})
    } catch (error) {
        console.log(error);
        
       const errorMessage=[]
       
        error.errors?.name ? errorMessage.push({name:error.errors.name.message}) : ""
        error.errors?.pic ? errorMessage.push({pic:error.errors.pic.message}) : ""
        error.errors?.message ? errorMessage.push({message:error.errors.message.message}) : ""
        errorMessage.length===0?
        res.status(500).send({result:"Fail",reason:"Internal Server Error"}):
        res.status(500).send({result:"Fail",reason:errorMessage})
        

    }
}

async function getAllRecord(req,res){
    
    try {
        const data  = await Testimonial.find().sort({_id:-1})
        res.send({result:"Done",count:data.length,data:data})   
    } catch (error) {
        res.status(500).send({result:"Fail",reason:"Internal Server Error"})
    }
}

async function getSingleRecord(req,res){
    
    try {
        const data  = await Testimonial.findOne({_id:req.params._id})
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
        const data  = await Testimonial.findOne({_id:req.params._id})
        if(data){
            data.name=req.body.name??data.name
            data.active=req.body.active??data.active
            if(req.file){
                try {
                    const fs = require("fs")
                    fs.unlinkSync(data.pic)

                } catch (error) {
                    data.pic = req.file.path
                }
            }
            await data.save()
        res.send({result:"Done",message:"Record Updated, Successfully"})  
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
        const data  = await Testimonial.findOne({_id:req.params._id})
        if(data){
            if(req.file){
                try {
                    const fs = require("fs")
                    fs.unlinkSync(data.pic)

                } catch (error) {
                    data.pic = req.file.path
                }
            }
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



