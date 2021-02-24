const Purchase = require('../models/purchase');
const User = require('../models/user');
const nodeMailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

// const transport = nodeMailer.createTransport(sendgridTransport({
//   user_key:''
// }))

exports.addPurchase = (req,res,next)=>{
        const id = req.user.id
        const purchase = new Purchase( {
            fullName: req.body.name,
            ContactNumber:req.body.ctNumber,
            price:Number(req.body.price),
            Address:req.body.address,
            purchaseDate:req.body.purchaseDate,
            package_id:req.body.package,
            User_id: id
        });
        purchase.save().then(saved=>{
            res.status(200).send()
        })   
}

exports.getPurchases = (req,res,next)=>{
  const id = req.user.id;
  Purchase.find({User_id:id}).populate('package_id').exec().then(found=>{
    if(found.length>0){
     return res.status(200).json({
        result:found
      })
    }
    res.status(409).send();
  })
}

