const express = require('express');

const { LikeController } = require('../../controllers');
const { authenticate } = require('../../middlewares/authenticate');

const router = express.Router();

router.post('/toggle/:modelType/:modelId', authenticate, LikeController.toggleLike);

module.exports = router;
