var express = require('express');
var router = express.Router();
var bankService = require('../services/bank.service');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query.username)
  res.render('index', { title: 'Hello world' });
});


router.post('/', function(req, res,) {
  const result = bankService.authenticateUser(req.body.username, req.body.password);
  if(result==1){
    res.send("logged in");
  }else{
    res.send("invalid credentials");
  }
});
  router.post('/deposit',function(req, res,){
    const message = bankService.deposit(req.body.username, req.body.password, req.body.amount);
    res.send(message);

  })
  
  router.post('/withdrew',function(req, res,){
    const message = bankService.withdrew(req.body.username, req.body.password, req.body.amount);
    res.send(message);

  })
  
  // res.render('index', { title: 'Hello world' });

module.exports = router;
