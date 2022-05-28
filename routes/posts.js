var express = require('express');
var router = express.Router();
const Post = require('../model/posts/model.js');
const User = require('../model/users/model.js');

/* GET users listing. */
router.get('/', async(req, res, next) => {
  // res.send('respond with a resource');
  const timeSort = req.query.timeSort == "asc" ? "createdAt":"-createdAt"
  const q = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {};
  const post = await Post.find(q).populate({
      path: 'user',
      select: 'name photo '
    }).sort(timeSort);
  // const posts = await Post.find().populate({
  //   path:'user',
  //   select:'name photo'
  // });
  res.status(200).json({
    post
  })
});

router.post('/', async(req, res, next)=>{
  const newPostContent = req.body
  const newPost = await Post.create({
    content: newPostContent.content,
    image: newPostContent.image,
    user:newPostContent.user,
    likes:newPostContent.likes
  });
  res.status(200).json({
    "success":true,
    newPost
  })
})

module.exports = router;