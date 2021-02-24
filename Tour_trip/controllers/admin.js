const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = (req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;
    bcrypt.hash(password,12).then(hashed=>{
        const admin = new Admin({
            username:username,
            password:hashed
        })
        admin.save().then(()=>{
            res.send("admin created");
        })
     
    })
}

exports.adminLogin = (req,res,next)=>{
    const username = req.body.username;
    const password = req.body.password;
    Admin.findOne({username:username}).then(admin=>{
        if(!admin){
            return res.status(401).json({
                message:"Provide correct email or password"
            })
        }
      bcrypt.compare(password,admin.password).then(matched=>{
          if(!matched){
              return res.status(401).json({
                  message:"Provide correct email or password"
              })
          }
         const token = jwt.sign({
             username:admin.username,
             role:'admin'
         },process.env.secret,{
             expiresIn:'10h'
         });
         res.status(200).json({
             token:token
         })
      })
    })
}