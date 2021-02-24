const jwt = require('jsonwebtoken');

exports.adminTokenVerify = (req,res,next)=>{
 const token = req.headers.authorization;
 const purpose = req.query.pr;
 try{
    const verify = jwt.verify(token,process.env.secret);
    if(verify.role==='admin' && purpose!== "notproceed"){
        next();
    }
    else if(purpose === "notproceed"){
        console.log('iss me agaya hai');
        res.status(200).send();
    }
    else{
        res.status(401).json({
            message:"do not have the previlage"
        })
    }
 }
 catch(error){
   res.status(401).json({
       message:"Auth failed"
   })
 }
 
}
exports.tokenVerify = (req,res,next)=>{
    const token = req.headers.authorization;
    const purpose = req.query.pr;
    try{
        const verify = jwt.verify(token,process.env.secret);
        req.user = verify;
        if(purpose ==='check'){
            return res.status(200).send()
        }
        next();
    } catch(err){
        res.status(409).json({
            message:err.message
        })
    }
  

}