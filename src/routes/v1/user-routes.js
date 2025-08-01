const express = require('express');

const { UserController } = require('../../controllers');

const router = express.Router();

router.post('/', UserController.createUser);

router.post('/signin', UserController.signin);

module.exports = router;
