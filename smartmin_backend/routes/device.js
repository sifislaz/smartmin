const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');


router.route('/')
.post(deviceController.changeDeviceState);

module.exports = router;