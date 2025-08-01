const express = require('express');

const { CommentController } = require('../../controllers');
const { isLoggedIn } = require('../../middlewares/auth-middleware');

const router = express.Router();

router.post('/:tweetId', isLoggedIn, CommentController.createComment);

module.exports = router;
