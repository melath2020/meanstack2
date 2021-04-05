
const User =require('../models/user');

let accountDetails = {
    userone: 
    { acno: 1000, name: "sanjay", balance: 10000, username: "userone", password: "userone", history:[] },
    usertwo: { acno: 1001, name: "anjay", balance: 20000, username: "usertwo", password: "testuser1",history:[]},
    userthree: { acno: 1002, name: "ajay", balance: 25000, username: "userthree", password: "testuser2", history:[]},
};

const authenticateUser = (uname,pwd) => {
   return User.findOne({
        username:uname,
        password:pwd
    });
    // .then(data=>{
    //     if(data){
    //         res.send({
    //             message:"logged in successfully"
    //         });
    //     }else{
    //         res.send(422).send({
    //             message:"invalid Credentials"
    //         });
    //     }
    
    // if (uname in dataset) {
    //     if (dataset[uname].password == pwd) {
    //         return 1;//valid user password
    //     }
    //     else {
    //         return 0;//invalid password
    //     }
    // }
    // else {
    //     return -1;//no user exist
    // }
  }

const deposit=(username,amount) =>{
//     let user = authenticateUser(username, password);
//     if (user == 1) {
    return User.findOne({
        username
    })
    .then(user=>{
        user.balance+=amount;
        user.history.push({
            amount,
            typeofTransaction: "credit"
        })
        user.save();
        return {
            balance:user.balance,
            message:"your account has been credited with" + amount+"new balance"+user.balance
        };
    
    })
}
       
            //     else {
    //     return "invalid details";
    // }


const withdraw=(username, amount)=>{
        // let user = authenticateUser(username, password);
        // if (user == 1) {
            return User.findOne({
                username
            })
            .then(user=>{
                if(user.balance<amount){
                    return {message:"Insuffitient balance"};
                }
            user.balance -= amount;
            user.history.push({
                amount: amount,
                typeofTransaction: "debit"
            })
            user.save();
            return {
                balance:user.balance,
                message:"your account has been debited with" + amount+"new balance"+user.balance
            };
        })
        // } else {
        //     return "invalid details";
        // }
    }
    const getUser= (username)=>{
        // let user= authenticateUser(username,password);
        // if(user == 1){
            return User.findOne({
                username:username
            })
        // }else{
        //     return [];
        // }

    }
  
  module.exports={
      authenticateUser,
      deposit,
      withdraw,
      getUser
  }