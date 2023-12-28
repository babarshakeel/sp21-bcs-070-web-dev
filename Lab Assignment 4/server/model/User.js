const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:3,
       
    },
    blogs:[{
        type:mongoose.Types.ObjectId,
        ref:'Blog',
        required:true,
    }],
    
    
});

module.exports = User = mongoose.model('User',userSchema);