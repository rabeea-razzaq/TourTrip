const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.signUp = (req,res,next)=>{
    const FirstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email:email}).then(result=>{
        if(result){
           return res.status(409).json({
               message:"email Already Exists"
           })
        }
           bcrypt.hash(password,12).then(hashed=>{
               const user = new User({
                   firstName: FirstName,
                   lastName:lastName,
                   email:email,
                   password:hashed
               });
               user.save().then(newUser=>{
                  const token = jwt.sign({
                       email:email,
                       id: newUser._id
                   },process.env.secret,{
                       expiresIn:'10h'
                   })
                   res.status(201).json({
                      message:"user is signed Up" ,
                      token:token
                   })
               })
           }) 
      
    })

}

exports.Login = (req,res,next)=>{
    const email = req.body.email
    const password = req.body.password;
    console.log(email,password);
    User.findOne({email:email}).then(found=>{
        if(!found){
            console.log('yahan atka hai');
            return res.status(401).json({
                message:"email doesnot found"
            })
        }
        console.log(found.password);
        bcrypt.compare(password,found.password).then(matched=>{
            if(!matched){
                console.log('password ki waja se atka hai');
               return res.status(401).json({
                   message:"Auth failed"
               })
            }
            const token = jwt.sign({
                email:found.email,
                id:found._id
            },process.env.secret,{
                expiresIn:"10h"
            })
            res.status(200).json({
                message:"User logged In ",
                token:token
            })
        })
           

      
    })
    
}