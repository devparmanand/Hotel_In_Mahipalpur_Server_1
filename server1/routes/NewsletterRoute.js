const NewsletterRouter = require("express").Router()
// const {verifyAdmin} = require("../multerMilddleware/validation")
const {createRecord, getAllRecord, getSingleRecord, updateRecord, deleteRecord} 
 = require("../controller/NewsletterController")

NewsletterRouter.post("/"  ,createRecord)
NewsletterRouter.get("/" ,getAllRecord)
NewsletterRouter.get("/:_id" ,getSingleRecord)
NewsletterRouter.put("/:_id", updateRecord)   
NewsletterRouter.delete("/:_id", deleteRecord)   

module.exports=NewsletterRouter