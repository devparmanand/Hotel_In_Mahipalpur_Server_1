const User = require("../model/User");
const passwordValidator = require("password-validator");
const bcrypt = require("bcrypt");
const {transporter1} = require("../mailer");
const jwt = require("jsonwebtoken");
// Create a schema
var schema = new passwordValidator()
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase(1) // Must have 1 uppercase letters
  .has()
  .lowercase(1) // Must have 1 lowercase letters
  .has()
  .digits(1) // Must have 1  digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

function createRecord(req, res) {
  if (schema.validate(req.body.password)) {
    const data = new User(req.body);
    bcrypt.hash(req.body.password, 12, async (error, hash) => {
      if (error) {
        res.status(500).send({
            result: "Fail",
            reason: "Internal Server Error ! Hash Password Doesn't Generated",
          });
      } else
        try {
          data.role = "User";
          data.password = hash;
          await data.save();

        transporter1.sendMail({
  from: process.env.EMAIL_USER,
  to: data.email,
  subject: "Welcome to Hotel in Mahilpalpur !",
  html: `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
      <h2 style="text-align: center; color: #2c3e50;">Welcome to Hotel in Mahilpalpur !</h2>

      <p style="text-align: justify;">Dear <strong>${data.name}</strong>,</p>

      <p style="text-align: justify;">
        Thank you for creating an account with <strong>Hotel in Mahipalpur</strong>.<br>
        We’re delighted to have you as part of our community. Your account has been successfully created,
        and you can now enjoy faster bookings, exclusive offers, and easy access to your reservation details.
      </p>

      <h3>Your Login Credentials:</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td><strong>User Name:</strong></td>
          <td>${data.username}</td>
        </tr>
        <tr>
          <td><strong>Password:</strong></td>
          <td>${data.password}</td>
        </tr>
        <tr>
          <td><strong>Login URL:</strong></td>
          <td><a href="https://www.hotelinmahipalpur.com/signin" style="color: #3498db;">hotelinmahipalpur.com/signin</a></td>
        </tr>
      </table>

      <hr style="margin: 20px 0;">

      <p style="text-align: justify;">If you have any questions or need assistance, feel free to reach out to us.</p>

      <div style="margin-top: 20px;">
        <p style="margin: 5px 0;">
          <img src="https://img.icons8.com/ios-filled/16/000000/worldwide-location.png" style="vertical-align: middle;" />
          <a href="https://www.hotelinmahipalpur.com" style="margin-left: 5px; color: #3498db;">www.hotelinmahipalpur.com</a>
        </p>
        <p style="margin: 5px 0;">
          <img src="https://img.icons8.com/ios-glyphs/16/000000/new-post.png" style="vertical-align: middle;" />
          <a href="mailto:info@hotelinmahipalpur.com" style="margin-left: 5px; color: #3498db;">info@hotelinmahipalpur.com</a>
        </p>
        <p style="margin: 5px 0;">
          <img src="https://img.icons8.com/ios-filled/16/000000/phone.png" style="vertical-align: middle;" />
          <span style="margin-left: 5px;">+91 9811226576</span>
        </p>
      </div>

      <p style="text-align: justify; margin-top: 30px;">Warm regards,<br><strong>Team Hotel in Mahipalpur</strong></p>
    </div>
  `,
  
});

        jwt.sign({data},process.env.JWT_SECRET_KEY_BUYER ,(error,token)=>{
          console.log(error);
          
          if(error){
             console.log(error);
            res.status(500).send({result:"Fail" , reason:"Internal Server Error"})

          }
           
            
          else
          res.send({result:"Done" , data:data , token:token , message:"Record is created, Successfully"})
        })
        } catch (error) {
          console.log(error);

          const errorMessage = {};

          error.keyValue?.username? errorMessage.username =  "User Name is Already Exist" : ""
          error.keyValue?.email? errorMessage.email =  "Email Address is Already Exist" : ""
          error.errors?.name? errorMessage.name =  error.errors.name.message : ""
          error.errors?.username? errorMessage.message = error.errors.username.message : ""
          error.errors?.email? errorMessage.email = error.errors.email.message : ""
          error.errors?.phone? errorMessage.phone = error.errors.phone.message : ""
          error.errors?.password? errorMessage.password =  error.errors.password.message : ""
          
       Object.values(errorMessage).filter((x)=>x!=="").length === 0?
           res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
            : res.send({ result: "Fail", reason: errorMessage });
        }
    });
  } else
    res.send({
      result: "Fail",
       
      reason:{password: "Invalid Password !!! Password Must Contains atleast 1 Digit , 1 Uppercase, 1 Lowercase Character and Should not contain any space and length must be within 8-100",}
    });
}

async function getAllRecord(req, res) {
  try {
    const data = await User.find().sort({ _id: -1 });
    res.send({ result: "Done", cont: data.length, data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", reason: "Internal Server Error" });
  }
}

async function getSingleRecord(req, res) {
  try {
    const data = await User.findOne({ _id: req.params._id });
    if (data) res.send({ result: "Done", data: data });
    else res.send({ result: "Fail", reason: "Invalid Id, Record Not Found" });
  } catch (error) {
    res.status(500).send({ result: "Fail", reason: "Internal Server Error" });
  }
}

async function updateRecord(req, res) {
  try {
    const data = await User.findOne({ _id: req.params._id });
    if (data) {
      data.name = req.body.name ?? data.name;
      data.phone = req.body.phone ?? data.phone;
      data.address = req.body.address ?? data.address;
      data.pin = req.body.pin ?? data.pin;
      data.city = req.body.city ?? data.city;
      data.state = req.body.state ?? data.state;
      data.active = req.body.active ?? data.active;
      if (req.file) {
        try {
          const fs = require("fs");
          fs.unlinkSync(data.pic);
        } catch (error) {
          data.pic = req.file.path;
        }
      }
      await data.save();
      res.send({ result: "Done", message: "Record Updated, Successfully" });
    } else res.send({ result: "Fail", reason: "Invalid Id, Record Not Found" });
  } catch (error) {
    res.status(500).send({ result: "Fail", reason: "Internal Server Error" });
    const errorMessage = [];

    error.keyValue?.name
      ? errorMessage.push({ name: "User Name is Already Exist" })
      : "";
    error.errors?.name
      ? errorMessage.push({ name: error.errors.name.message })
      : "";
    errorMessage.length === 0
      ? res
          .status(500)
          .send({ result: "Fail", reason: "Internal Server Error" })
      : res.status(500).send({ result: "Fail", reason: errorMessage });
  }
}

async function deleteRecord(req, res) {
  try {
    const data = await User.findOne({ _id: req.params._id });
    if (data) {
      if (req.file) {
        try {
          const fs = require("fs");
          fs.unlinkSync(data.pic);
        } catch (error) {
          data.pic = req.file.path;
        }
      }
      await data.deleteOne();
      res.send({ result: "Done", reason: "Record is Deleted" });
    } else res.send({ result: "Fail", reason: "Invalid Id, Record Not Found" });
  } catch (error) {
    res.status(500).send({ result: "Fail", reason: "Internal Server Error" });
  }
}

async function login(req, res) {
  try {
    let data = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.username }],
    }); 
    if (data && await bcrypt.compare(req.body.password, data.password)) {
      let secretkey =
        data.role === "User"
          ? process.env.JWT_SECRET_KEY_BUYER
          : process.env.JWT_SECRET_KEY_ADMIN;
          // ,{ expiresIn: 60 * 60 * 24 * 7 }
      jwt.sign({ data },secretkey,(error, token) => {
          if (error) {
            console.log(error);
            res.status(500).send({ result: "Fail", reason: "Internal Server Error" });
          }
           
           else 
           res.send({ result: "Done", data: data, token: token });
         })
         }
       else
   res.status(401).send({ result: "Fail", reason: "User Name or Password Invalid" });
  } catch (error) {
    res.status(500).send({ result: "Fail", reason: "Internal Server Error" });
  }
}
async function forgetPassowrd1(req, res) {
  try {
    let data = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.username }],
    });
    console.log(data);
    
    if (data) {
      let otp = parseInt(
        Math.floor(Math.random() * 1000000)
          .toString()
          .padEnd(6, "1")
      );
      data.otp = otp;
      await data.save();

      transporter1.sendMail({
        from: process.env.EMAIL_USER,
        to: data.email,
        subject: "OTP for Password Reset: Team HIM",
        text: `
             Hello ${data.name} 
             We Recieved an Record for Password Reset  Your Side 
             OTP for Password Reset is ${otp}
             Never Share OTP With Anyone
             Team:HIM
             `,
      });

      res.send({
        result: "Done",
        message: "Otp Has Been Sent Your Registered Email Adress",
      });
    } else {
      res
        .status(401)
        .send({
          result: "Fail",
          reason: "Invalid Credential !!! User Not Found",
        });
    }
  } catch (error) {
    res.status(500).send({ result: "Fail", reason: "Internal Server Error" });
  }
}

async function forgetPassowrd2(req, res) {
  try {
    let data = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.username }],
    });
    console.log(data);
    console.log(req.body.username);
    
    
    if (data) {
      if (data.otp == req.body.otp) res.send({ result: "Done" });
      else res.send({ result: "Fail", reason: "Invalid OTP" });
    } else {
      res.send({result:"Fail" , reason:"Un Authorised Activity"})
    }
  } catch (error) {
    console.log(error);
    
    res.status(500).send({ result: "Fail", reason: "Internal Server Error"});
}
}

async function forgetPassowrd3(req, res) {
  try {
    let data = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.username }],
    });
    if (data) {
      bcrypt.hash(req.body.password, 12, async (error, hash) => {
        if (error)
          res
            .status(500)
            .send({ result: "Fail", reason: "Internal Server Error" });
        else {
          data.password = hash;
          await data.save();

          res.send({ result: "Done", reason: "Your Password Has Been Reset" });
        }
      });
    } else {
      res.status(401).send({ result: "Fail", reason: "UnAuthorised Activity" });
    }
  } catch (error) {
    res.status(500).send({ result: "Fail", reason: "Internal Server Error" });
  }
}
module.exports = {
  createRecord,
  getAllRecord,
  getSingleRecord,
  updateRecord,
  deleteRecord,
  login,
  forgetPassowrd1,
  forgetPassowrd2,
  forgetPassowrd3,
};
