const express = require('express');

const { CommentController } = require('../../controllers');
const { authenticate } = require('../../middlewares/authenticate');

const router = express.Router();

router.post('/:tweetId', authenticate, CommentController.createComment);

module.exports = router;
