var express = require('express');
const { token } = require('morgan');
var router = express.Router();
var bankService = require('../services/bank.service');
const jwt=require('jsonwebtoken');
const jwtSecret="secretkey!>@";

const authMiddleware = (req,res,next)=>{
  try{
    const token= req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token,jwtSecret);
    req.user = user;
    next();
  }catch{
    res.status(401).send({message:"invalid token"});
  }
}

/* GET home page. */
router.get('/', function(req, res,) {
  // const user= new User({
  //   acno: 11111,
  //   name: "achu", 
  //   balance: 20012, 
  //   username: "userone",
  //   password: "userone",
  //   history:[
  //   ] 
  // })
  // user.save();
});


router.post('/login', function(req, res) {
 bankService.authenticateUser(req.body.username, req.body.password)
 .then(user=>{
  if(user){
    const token=jwt.sign({
      exp: Math.floor(Date.now()/1000)+(60*60*5),
      username:req.body.username
    }, jwtSecret);
    res.send({
      message:"logged in succesfully",
      token:token
    });
  }else{
    res.status(422).send({
      message:"invalid credentials"
  });
}


 });
 
  });
  

  router.post('/deposit',authMiddleware,function(req, res,){
     bankService.deposit(req.user.username, req.body.amount)
    .then(message=>{
      res.send(message);
    });
  })
  
  router.post('/withdraw',authMiddleware,function(req, res,){
    bankService.withdraw(req.user.username,req.body.amount)
    .then(message=>{
      res.send(message);
    });
  })
  router.get('/history',authMiddleware,function(req, res,){
    bankService.getUser(req.user.username)
    .then(user=>{
      res.send(user.history);
  });
})
  router.get('/profile',authMiddleware,function(req, res,){
    bankService.getUser(req.user.username)
    .then(user=>{
      res.send(user);
  });
})
  // res.render('index', { title: 'Hello world' });

module.exports = router;
