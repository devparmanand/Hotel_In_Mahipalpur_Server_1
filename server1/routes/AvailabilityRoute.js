const AvailabilityRouter = require("express").Router()

const {createRecord , getAllRecord , getSingleRecord ,deleteRecord} = require("../controller/AvailabiltyController")




AvailabilityRouter.post("/" , createRecord)
AvailabilityRouter.get("/" , getAllRecord)
AvailabilityRouter.post("/:_id" , getSingleRecord)
AvailabilityRouter.post("/:_id" , deleteRecord)




module.exports = AvailabilityRouter