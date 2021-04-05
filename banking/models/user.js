const mongoose =require('mongoose');


const User = mongoose.model('User',{
    acno: Number,
     name: String, 
     balance: Number, 
     username: String,
     password: String,
     history:[
         {
            typeofTransaction: String,
            amount:Number

         }
     ] 
})

module.exports = User;