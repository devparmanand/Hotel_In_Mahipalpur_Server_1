const ContactUsRouter = require("express").Router()

const {createRecord , getAllRecord , getSingleRecord ,deleteRecord} = require("../controller/ContactUsController")




ContactUsRouter.post("/" , createRecord)
ContactUsRouter.get("/" , getAllRecord)
ContactUsRouter.post("/:_id" , getSingleRecord)
ContactUsRouter.post("/:_id" , deleteRecord)


module.exports = ContactUsRouter