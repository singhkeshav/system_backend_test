const express = require('express');
const router = express.Router();
const config = require("../config/index");

const userController = require('../test_controller/user');
router.post(config.api_version+'login', userController.login);
router.post(config.api_version+'signup', userController.signup);
module.exports = router;