const express = require('express');
const router = express.Router();
const dataController  = require('../controllers/dataController');
const humidityController  = require('../controllers/humidityController');
const temperatureController  = require('../controllers/temperatureController');
const roomController  = require('../controllers/roomController');
const verifyJWT = require("../middleware/verifyJWT");

router.route('/room/:roomId/temp')
    .post(temperatureController.addNewTempReading)
    .get(verifyJWT,temperatureController.getTempReading);

router.route('/room/:roomId/hum')
    .post(humidityController.addNewHumReading)
    .get(verifyJWT,humidityController.getHumReading);



router.route('/room/')
    .get(verifyJWT,roomController.getAllRooms)
    .post(verifyJWT,roomController.createNewRoom)
    .delete(verifyJWT,roomController.deleteRoom)
    .put(verifyJWT,roomController.updateRoom);

router.route('/room/:roomId/')
    .get(verifyJWT,roomController.getRoom)
    .post(verifyJWT,roomController.setRoomSensors);

router.route('/alerts')
    .get(verifyJWT,dataController.getAlerts)
    .post(verifyJWT,dataController.readAllAlerts);
router.route('/alerts/:alertId')
    .post(verifyJWT,dataController.readAlert);

module.exports = router;