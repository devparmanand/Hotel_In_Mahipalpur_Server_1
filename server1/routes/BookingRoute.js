const BookingRouter = require("express").Router()

const {createRecord , getAllRecord , getSingleRecord  , getAllUserRecords,deleteRecord} = require("../controller/BookingController")




BookingRouter.post("/" , createRecord)
BookingRouter.get("/" , getAllRecord)
BookingRouter.get("/:userid" , getAllUserRecords)
BookingRouter.get("/:_id" , getSingleRecord)
BookingRouter.post("/:_id" , deleteRecord)




module.exports = BookingRouter