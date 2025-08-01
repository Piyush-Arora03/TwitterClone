const express = require('express');

const { TweetController } = require('../../controllers');
const { isLoggedIn } = require('../../middlewares/auth-middleware');

const router = express.Router();

router.post('/', isLoggedIn, TweetController.createTweet);
router.get('/:id', isLoggedIn, TweetController.deleteTweet);

module.exports = router;
