const { validationResult } = require('express-validator/check');
const Post = require('../models/post');

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll({});
    res.status(200).json({
      posts: posts.map((post) => post.dataValues),
    });
  } catch (e) {
    console.log(e);
    const error = new Error(e.message);
    error.statusCode = e.statusCode;
    next(error);
  }
};

exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      const error = new Error('post not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: 'post fetched',
      post,
    });
  } catch (e) {
    console.log(e);
    if (!e.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      console.log('here');
      return res.status(422).json({
        message: 'validation failed',
        errors: err.array(),
      });
    }
    const title = req.body.title;
    const content = req.body.content;
    const post = await Post.create({
      title,
      content,
      imageURL: 'kdlcmjkk',
      creator: '{name: rezo}',
    });
    res.status(201).json({
      message: 'Post created successfully!',
      post,
    });
  } catch (e) {
    console.log(e);
    const error = new Error(e.message);
    error.statusCode = e.statusCode;
    next(error);
  }
};
