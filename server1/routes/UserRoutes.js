const UserRouter = require("express").Router()
const {verifyAdmin, verifyBoth} = require("../middleware/verfication")
const {user, userUploader} = require("../middleware/multer")
const {createRecord, getAllRecord, getSingleRecord, updateRecord, 
    deleteRecord, login, forgetPassowrd1, forgetPassowrd2,
    forgetPassowrd3} 
 = require("../controller/UserController")

UserRouter.post("/",createRecord)
UserRouter.get("/", verifyAdmin,getAllRecord)
UserRouter.get("/:_id", verifyBoth,getSingleRecord)
UserRouter.put("/:_id",  verifyBoth,userUploader.single("pic"),updateRecord)   
UserRouter.delete("/:_id", verifyAdmin,deleteRecord)   
UserRouter.post("/login", login)   
UserRouter.post("/forget-password-1", forgetPassowrd1)   
UserRouter.post("/forget-password-2", forgetPassowrd2)   
UserRouter.post("/forget-password-3", forgetPassowrd3)   

module.exports=UserRouter