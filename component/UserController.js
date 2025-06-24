

const jwt = require('jsonwebtoken');
const UserModel = require('../Model/User');
require('dotenv').config();
const bcrypt = require('bcrypt');
const LinkQr = require('../Model/LinkQr');
const User = require('../Model/User');
const nodemail =  require('nodemailer');
const Activity = require('../Model/Activity');

exports.getqrlink = async(req,res) => {
   try {
      const qrlink = await LinkQr.find({user:req.user.id})
      res.json(qrlink)
   } 
   catch (error){
            res.json({'error':error})
   }
}

exports.addlink = async(req, res) => {
        const qrlink = req.body.qrlink
        const qrcolor  = req.body.qrcolor
        const user  = req.user.id


        try {
           const newLinkQr = new LinkQr({
            qrlink,
            qrcolor,
            user
           })
        
           const saveQr = await  newLinkQr.save();
           res.json(saveQr)
            await Activity.create({
          message: `${user.uname} created a new QR code`
  });

        }
        catch (error) {
           res.json({"error": error})
        }
   }

exports.reguser = async (req, res) => {
  console.log('Incoming request:', req.body);
  try {
    const uname = req.body.uname;
    const pass = await bcrypt.hash(req.body.pass, 12);
    const uemail = req.body.uemail;
    const newuser = new UserModel({
      username: uname,
      password: pass,
      email: uemail
    });

    const savedUser = await newuser.save();

    res.status(201).json({
      msg: 'User registered successfully',
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email
      }
    });

  } catch (err) {
    console.error('Error in reguser:', err);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

exports.sendemail = async (req, res) => {
  const { email, img, sub } = req.body;
  if (!email || !img) {
    return res.status(400).json({ error: "Email and image are required." });
  }
  const transporter = require('nodemailer').createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: sub || "Your QR Code",
     text: "Here is your QR Code.",
    attachments: [
      {
        filename: "qrcode.png",
        content: img.split("base64,")[1],
        encoding: "base64",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent!" });
  } catch (err) {
    console.error("Email sending failed:", err); // <--- Add this
    res.status(500).json({
      error: "Failed to send email",
      detail: err.message, // <--- Add this for frontend debugging
    });
  }
};



exports.loguser = async (req,res) => {
   const uemail = req.body.uemail;
    const pass = req.body.pass;

    try {
       const userlogin = await UserModel.findOne({"email": uemail})

       if(!userlogin){
         res.json({"loginsts": "1",
           "msg" : "user not found"
         })
        }
         else{
            const ismatch = await bcrypt.compare(pass, userlogin.password)
            if(!ismatch){
              res.json({
                 "loginsts": "2",
                 "msg": "password not match"                 
              })
            
            }
            else{
              const jwt = require('jsonwebtoken');
              const token = await jwt.sign({id:userlogin._id,email:userlogin.email},
                process.env.JWT_SECRET,
                {expiresIn: '5m'}
              )
                res.json({"loginsts" : "0", "token": token})
               
                await Activity.create({
                message: `${userlogin.uname} logged in`
  });
            }
         }

       }
       catch(error) {
          console.error('error in loguser: ',error);
       }

    };




exports.msgg = async (req, res) => {
     res.json({
        "msg": "test user route"
     })
};

