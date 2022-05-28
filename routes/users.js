var express = require('express');
var router = express.Router();

const User = require('../model/users/model.js');
/* GET users listing. */

router.get('/', async(req, res, next)=>{
  const allUsers = await User.find();
  // res.send('respond with a resource');
  res.status(200).json({
    allUsers
  })
});

router.post('/', async(req, res, next)=>{
  const userInfo = req.body;
  const newUser = await User.create({
    name: userInfo.name,
    email: userInfo.email,
    photo: userInfo.photo,
  });
  // res.send('respond with a resource');
  res.status(200).json({
    "success":"true",
    newUser
  })
});

module.exports = router;
