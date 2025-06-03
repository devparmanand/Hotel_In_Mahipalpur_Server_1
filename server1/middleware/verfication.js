let jwt = require("jsonwebtoken")


function verifyAdmin(req,res,next){
let token = req.headers.authorization
console.log(token);

if(token && jwt.verify(token,process.env.JWT_SECRET_KEY_BUYER)){
    next()
}
else
res.send({result:"Fail",reason:"You Are Not An Authorized User to Access this Api"})
}

function verifyBoth(req,res,next){
// console.log(token);

    let token = req.headers.authorization
  jwt.verify(token,process.env.JWT_SECRET_KEY_ADMIN , (error)=>{
    if(error){
        jwt.verify(token,process.env.JWT_SECRET_KEY_BUYER , (error)=>{
            if(error){
                console.log(error);
                
                res.status(401).send({result:"Fail" , reason:"You Are Not An Authorized User to Access this Api"})
            }
            else
            next()
        })
    }
    else
    next()
  }) 
    }
module.exports={
    verifyAdmin,
    verifyBoth
}



