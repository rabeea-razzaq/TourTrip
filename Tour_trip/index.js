const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/Auth');
const bodyParser = require('body-parser');
const packagesRouter = require('./routes/PackagesRoutes');
const purchaseRoute = require('./routes/purchase');
const dotenv = require('dotenv');

dotenv.config({path:__dirname +'/secret.env' });

const multer = require('multer');
const cors = require('cors');

const app = express();
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads');
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }
})


app.use(bodyParser.json());
app.use(multer({storage:storage}).single('tripImage'));

app.use('/uploads',express.static('uploads'))
app.use(cors());
app.use('/auth',authRoutes);
app.use('/packages',packagesRouter)
app.use('/purchase',purchaseRoute);


mongoose.connect('mongodb+srv://tourtrip:tourtrip123@tourtripcluster.6pqtb.mongodb.net/',{ 
    useNewUrlParser: true,useUnifiedTopology: true }).then(()=>{
    app.listen(3000);
    console.log('connected');

})

