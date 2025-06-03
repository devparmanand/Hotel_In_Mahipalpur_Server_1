const RoomCartRouter = require("express").Router()
const {roomcartUploader} = require("../middleware/multer")
const {createRecord, getAllRecord, getSingleRecord, updateRecord, deleteRecord} 
 = require("../controller/RoomCartController")

RoomCartRouter.post("/" ,roomcartUploader.array("pic") ,createRecord)
RoomCartRouter.get("/",getAllRecord)
RoomCartRouter.get("/:_id",getSingleRecord)
RoomCartRouter.put("/:_id", roomcartUploader.array("pic"),updateRecord)   
RoomCartRouter.delete("/:_id",deleteRecord)   

module.exports=RoomCartRouter