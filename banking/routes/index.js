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
router.get('/', function(req, res, next) {
  console.log(req.query.username)
  res.render('index', { title: 'Hello world' });
});


router.post('/login', function(req, res,) {
  const result = bankService.authenticateUser(req.body.username, req.body.password);
  if(result==1){
    const token=jwt.sign({
      exp: Math.floor(Date.now()/1000)+(60*60*5),
      username:req.body.username
    }, jwtSecret)
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
  router.post('/deposit',authMiddleware,function(req, res,){
    const message = bankService.deposit(req.user.username, req.body.amount);
    res.send(message);

  })
  
  router.post('/withdraw',authMiddleware,function(req, res,){
    const message = bankService.withdraw(req.user.username,req.body.amount);
    res.send(message);

  })
  router.get('/history',authMiddleware,function(req, res,){
    const message = bankService.history(req.user.username);
    res.send(message);

  })
  // res.render('index', { title: 'Hello world' });

module.exports = router;
