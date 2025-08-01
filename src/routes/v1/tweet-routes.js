const express = require('express');

const { TweetController } = require('../../controllers');
const { authenticate } = require('../../middlewares/authenticate');

const router = express.Router();

router.post('/', authenticate, TweetController.createTweet);

module.exports = router;
