const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const path = require("path")


const Router = require("./routes")


require("./db_connect")

const app =  express()

var whitelist = ['http://localhost:3000' , 'http://localhost:5000']

var corsOptions = {
    origin: function (origin, callback) {
      
      if (whitelist.includes(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('You are not Authenticated , Not Allow to Access this api'))
      }
    }
  }



app.use(cors(corsOptions))
// app.use(express.static(path.join(__dirname,'build')))
app.use(express.json())
app.use("/public",express.static("./public"))


app.use("/api",Router)




let PORT = process.env.PORT || 5000


app.listen(PORT,console.log(`Server is Running at port ${PORT}`))
