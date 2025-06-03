const Availability = require("../model/Availability")
async function createRecord(req,res){
    try {
        const data = new Availability(req.body)
        await data.save()
          
    
     

        res.send({result:"Done", data:data ,message:"Record is created, Successfully"})
    } catch (error) {
        console.log(error);
        
       const errorMessage=[]
        error.errors?.checkIn ? errorMessage.push({checkIn:error.errors.checkIn.message}) : ""
        error.errors?.checkOut ? errorMessage.push({checkOut:error.errors.checkOut.message}) : ""
        error.errors?.adult ? errorMessage.push({adult:error.errors.adult.message}) : ""
        error.errors?.child ? errorMessage.push({child:error.errors.child.message}) : ""
        error.errors?.roomQuantity ? errorMessage.push({roomQuantity:error.errors.roomQuantity.message}) : ""
        error.errors?.totalDays ? errorMessage.push({totalDays:error.errors.totalDays.message}) : ""
        error.errors?.total ? errorMessage.push({total:error.errors.total.message}) : ""
        errorMessage.length===0?
        res.status(500).send({result:"Fail",reason:"Internal Server Error"}):
        res.status(500).send({result:"Fail",reason:errorMessage})
        

    }
}

async function getAllRecord(req,res){
    
    try {
        const data  = await Availability.find().sort({_id:-1})
        res.send({result:"Done",cont:data.length,data:data})   
    } catch (error) {
        res.status(500).send({result:"Fail",reason:"Internal Server Error"})
    }
}

async function getSingleRecord(req,res){
    
    try {
        const data  = await Availability.findOne({_id:req.params._id})
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
        const data  = await Availability.findOne({_id:req.params._id})
        if(data){
            data.checkIn=req.body.checkIn??data.checkIn
            data.checkOut=req.body.checkOut??data.checkOut
            data.adult=req.body.adult??data.adult
            data.child=req.body.child??data.child
            data.roomQuantity=req.body.roomQuantity??data.roomQuantity
            data.totalDays=req.body.totalDays??data.totalDays
            data.total=req.body.total??data.total
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
        const data  = await Availability.findOne({_id:req.params._id})
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



