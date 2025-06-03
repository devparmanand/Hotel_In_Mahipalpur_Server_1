const Router = require("express").Router()


const UserRouter = require("./UserRoutes")
const ContactRouter = require("../routes/ContactUsRoute")
const NewaletterRouter = require("../routes/NewsletterRoute")
const TestimonialRouter = require("../routes/TestimonialRoute")
const RoomCartRouter = require("../routes/RoomCartRoute")
const AvailabilityRouter = require("./AvailabilityRoute")
const BookingRouter = require("./BookingRoute")
const ReviewRouter = require("./ReviewRoute")

Router.use("/user" , UserRouter)
Router.use("/contactus" , ContactRouter)
Router.use("/newsletter" , NewaletterRouter)
Router.use("/testimonial" , TestimonialRouter)
Router.use("/roomcart" , RoomCartRouter)
Router.use("/check-availability" , AvailabilityRouter)
Router.use("/review" , ReviewRouter)
Router.use("/booking" , BookingRouter)



module.exports = Router
