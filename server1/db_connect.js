const mongoose = require("mongoose")


async function getConnect() {
    mongoose.connect('mongodb://127.0.0.1:27017/him_backend_1')
    .then(()=>{
        console.log("Database is Connected from him_backend_1");
        
    })
     .catch((error)=>{
        console.log(error);
        
    })
}


getConnect()




