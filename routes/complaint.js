const express = require('express');
const router = express.Router();
const config = require("../config/index");

const complainController = require('../test_controller/complaint');
router.post(config.api_version+'complaint_list', complainController.complaintList);
router.post(config.api_version+'create_complaint', complainController.create_complaint);
router.post(config.api_version+'update_status', complainController.update_status);

module.exports = router;