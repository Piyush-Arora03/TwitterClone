const express = require('express');

const { InfoController } = require('../../controllers');
const userRouter = require('./user-routes');
const tweetRouter = require('./tweet-routes');
const commentRouter = require('./comment-routes');
const likeRouter = require('./like-routes');

const router = express.Router();

router.get('/info', InfoController.info);

router.use('/users', userRouter);
router.use('/tweets', tweetRouter);
router.use('/comments', commentRouter);
router.use('/likes', likeRouter);

module.exports = router;