const TestimonialRouter = require("express").Router()
// const {verifyAdmin} = require("../multerMilddleware/validation")
const {testimonialUploader} = require("../middleware/multer")
const {createRecord, getAllRecord, getSingleRecord, updateRecord, deleteRecord} 
 = require("../controller/TestimonialController")

TestimonialRouter.post("/", testimonialUploader.single("pic") ,createRecord)
TestimonialRouter.get("/",getAllRecord)
TestimonialRouter.get("/:_id",getSingleRecord)
TestimonialRouter.put("/:_id", testimonialUploader.single("pic"),updateRecord)   
TestimonialRouter.delete("/:_id", deleteRecord)   

module.exports=TestimonialRouter