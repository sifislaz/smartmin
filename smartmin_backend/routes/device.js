const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const verifyJWT = require('../middleware/verifyJWT');


router.route('/')
.post(verifyJWT,deviceController.changeDeviceState);

module.exports = router;