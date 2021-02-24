const packages = require('../models/packages');
const Package = require('../models/packages');
const fs = require('fs');
const ITEM_LIMIT = 2;

exports.postPackage = (req,res,next)=>{
    const dest = req.body.destination;
    const destinations = dest.split(',') || dest;
    const package = new Package({
        Title:req.body.title,
        imageUrl:req.file.path,
        price:Number(req.body.price),
        description:req.body.description,
        destination:destinations
    });
    package.save().then(saved=>{
        res.status(201).json(saved);
    })
}

exports.getAllPackages = (req,res,next)=>{
    const page = Number(req.query.page) || 1;
    let totaldocuments;
    Package.find().countDocuments().then(Docs=>{
        totaldocuments = Docs
       return Package.find().skip((page-1)*ITEM_LIMIT).limit(ITEM_LIMIT); 
    }).then(packges=>{
        var dataInfo;
        if(page === 1){
            dataInfo = {
                paginationInfo: {
                    currentpage : page,
                    lastPage:Math.ceil(totaldocuments/ITEM_LIMIT),
                },
                packages:packges
            }
        }
        else{
             dataInfo = {
                packages:packges
            }
        }  
          res.status(200).json(dataInfo);
    })
}


exports.deletePackage =  (req,res,next)=>{
    const package_id = req.params.id;
    console.log(package_id);
      
    Package.findById({_id:package_id}).then(doc=>{
       fs.unlink(doc.imageUrl,(err)=>{
           if(err){
             return  res.status(500).send();
           }
           doc.deleteOne().then(doc=>{
               if(!doc){
                   return res.status(500).send(); 
               }
               res.status(200).send();
           })

       })
    })
    // Package.deleteOne({_id:package_id}).then(deleted=>{
    //        res.status(200).json({
    //            message:"package deleted successfully"
    //        })
    // })
}

exports.updatePackage = (req,res,next)=>{
    const package_id = req.params.id;
    console.log(package_id);
    const dest = req.body.destination;
    const destinations = dest.split(',') || dest;
        const Title = req.body.title;
        const image = req.file;
        const price = Number(req.body.price);
        const description = req.body.description;
        const destination=destinations
        if(!image){
            Package.findByIdAndUpdate(package_id,{Title:Title,price:price,description:description,destination:destination},{new:true}).then(updated=>{
                console.log(updated);
            res.status(201).json({
                message:"updated"
         })
      })
        }
        else{
            Package.findById({_id:package_id}).then(doc=>{
                fs.unlink(doc.imageUrl,(err)=>{
                    if(err){
                        return res.status(500).send();
                    }
                    doc.Title = Title;
                    doc.imageUrl = image.path;
                    doc.price = price;
                    doc.description = description;
                    doc.destination = destinations;
                    doc.save().then(saved=>{
                        res.status(200).send();
                    })
                })
            })
        }
       
    // Package.findByIdAndUpdate(package_id,{Title:Title,price:price,imageUrl:imageUrl,description:description,destination:destination},{new:true}).then(updated=>{
    //     console.log(updated);
    //    res.status(201).json({
    //        message:"updated"
    //    })
    // })
}

exports.getByDestination = (req,res,next)=>{
    const target = req.params.target;
    Package.find({destination:target}).then(result=>{
        res.status(200).json({
            result:result
        })
    })

}
exports.searchAndFilter = (req,res,next)=>{
    const target = (req.body.target==='')? undefined : req.body.target;
    const min = req.body.min;
    const max = req.body.max;
    console.log(req.body);
    if(!target){
        if(!max){
            Package.find({price:{$gte:min}}).then(result=>{
                            res.status(200).json({
                                result: result
                            })
                        })
        }
        else{
            Package.find({$and:[{price:{$gte:min}},{price:{$lte:max}}]}).then(result=>{
                            res.status(200).json({
                                result: result
                            })
                        })
        }
    }
    else if(target){
        if(!max){
            Package.find({destination:target,price:{$gte:min}}).then(result=>{
                                res.status(200).json({
                                    result:result
                                })
                            })
        }
        else if(!min && !max){
            Package.find({destination:target}).then(result=>{
                res.status(200).json({
                    result:result
                })
            })
        }
        else{
            Package.find({$and:[{price:{$gte:min}},{price:{$lte:max}},{destination:target}]}).then(result=>{
                res.status(200).json({
                    result:result
                })
            })

        }
    }
    
}

exports.filterByPrice = (req,res,next)=>{
    const priceMin = Number(req.query.min);
    const priceMax = Number(req.query.max);
    Package.find({$and:[{price:{$gte:priceMin}},{price:{$lte:priceMax}}]}).then(result=>{
        res.status(200).json({
            result: result
        })
    })
    
}

exports.getSinglePackage = (req,res,next)=>{
    const id = req.params.id;
    Package.findOne({_id:id}).then(package=>{
        if(!package){
            return res.status(409).json({
                message:"Package not found"
            })
        }
        res.status(200).json({
            package:package
        })
    })
}
