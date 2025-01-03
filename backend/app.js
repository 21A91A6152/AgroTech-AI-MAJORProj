import express from 'express';
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import cors from 'cors';
import customerdata from './modules/Customer.js';
 
 
var app = express();  
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())
app.use(express.json())

 
 
 
mongoose.connect('mongodb+srv://myAtlasDBUser:bc5OqNZlgc0XluxY@myatlasclusteredu.mzzgltg.mongodb.net/Agro?retryWrites=true&w=majority&appName=myAtlasClusterEDU', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
  })
  .then(() => console.log("Connected to Database & Listening on localhost:5000"))
  .catch(err => console.error("Database connection error:", err));
  
 
 
var server = app.listen(5000) 

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  //Admin Signup

app.post('/signup',async(req,res,next)=>{
    console.log(req.body)
    const {username,email,password,phone}=req.body;
    let users
    try{
      users = await  customerdata.findOne({ email: email });
    }catch(err){
        return console.log(err)
    }
     
    if(!users){
        const stud =new customerdata({
            username,
            email,
            password,
            phone,
          })
          stud.save();
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'manojmaridi666@gmail.com',
          pass: 'twws ipfi pavo frie'
        }
      });
       
      const emailBody = ` 
      <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
     
    <style>
        /* Add your styles here */
        body {
          font-family: 'Arial', sans-serif;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
        }
        .header {
          background-color: #4CAF50;
          color: #fff;
          padding: 15px;
          text-align: center;
        }
        .content {
          padding: 20px;
        }
        .footer {
          background-color: #f4f4f4;
          padding: 10px;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Registration Successful</h2>
        </div>
        <div class="content">
          <p>Hello ${username},</p>
          <p>Congratulations! Your registration was successful.</p>
          <p>Your account has been created with the following details:</p>
          <ul>
            <li>Email: ${email}</li>
            <li>Phone no:${phone}</li>
          </ul>
          <p>Thank you for joining our community.</p>
        </div>
        <div class="footer">
          <p>© 2024 manojkumar. All rights reserved.</p>
        </div>
      </div>
    </body>
  </html>
       `;
  
      
      var mailOptions = {
        from: 'manojmaridi666@gmail.com',
        to: email,
        subject: 'Registration Successful',
        html:  emailBody};
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      return res.send({msg:"Account registered successfully"}) 
    }
    else{
      return res.status(200).json({msg:"email exists!.."})
    }
  });
  


  // Admin LOGIN

 
app.post('/login',async (req,res,next)=>{
     
   
    const {email,password}=req.body;
    let users;
    try{
      users = await customerdata.findOne({ email: email });
    }catch(err){
        return console.log(err)
    }
    console.log(users)
    if(!users){
      return res.status(200).json({msg:"Not registered"})
    }
    else{
      if(users.password===password){
        return res.status(200).json({msg:"login successful",email:users})
      }
      else{
        return res.status(200).json({msg:"password incorrect"})
      }
    }
     
  })
  
  //Password change

  app.put('/forgot', async (req, res, next)=>{
    console.log(req.body.formDataF)
    const {email,password,confirmpassword}=req.body.formDataF;
    let users;
    let stud;
    try{
      users = await customerdata.findOne({ email: email });
    }catch(err){
        return console.log(err)
    }
    console.log(users)
    if(!users){
      return res.status(200).json({msg:"email incorrect"})
    }
    else if(password!=confirmpassword){
      return res.status(200).json({msg:"please enter correct password"})
    }
    else{
        stud = await customerdata.findByIdAndUpdate(users._id,{
          email,
          password, 
        });
        return res.status(200).json({msg:"password updated successfully"})
    }
  })


 
 
 
