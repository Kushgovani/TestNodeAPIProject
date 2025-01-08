const mongoose = require('mongoose');


const production = mongoose.Schema({
    name: {
     type:String
    },
    description:{
      type:String,  
    }, 
    price:{
        type:String,
    },
    // image:{
    //     type:String
    // },
    category: {
        type: String
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserData'
    }
});


const product = mongoose.model('ProductTest',production);
module.exports = product;