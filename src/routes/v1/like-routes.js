const express = require('express');

const { LikeController } = require('../../controllers');
const { isLoggedIn } = require('../../middlewares/auth-middleware');

const router = express.Router();

router.post('/toggle/:modelType/:modelId', isLoggedIn, LikeController.toggleLike);

module.exports = router;
