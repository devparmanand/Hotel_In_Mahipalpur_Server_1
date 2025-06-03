const mongoose = require("mongoose")


async function getConnect() {
    mongoose.connect('mongodb://127.0.0.1:27017/him_backend_1')
    .then(()=>{
        console.log("Database is Connected");
        
    })
    .catch((error)=>{
        console.log(error);
        
    })
}


getConnect()




