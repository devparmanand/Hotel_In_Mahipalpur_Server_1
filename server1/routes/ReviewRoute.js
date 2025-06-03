const ReviewRouter = require("express").Router()

const {createRecord , getAllRecord , getSingleRecord ,deleteRecord} = require("../controller/ReviewController")




ReviewRouter.post("/" , createRecord)
ReviewRouter.get("/" , getAllRecord)
ReviewRouter.post("/:_id" , getSingleRecord)
ReviewRouter.post("/:_id" , deleteRecord)


module.exports = ReviewRouter