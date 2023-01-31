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
    .get(roomController.getAllRooms)
    .post(roomController.createNewRoom)
    .delete(roomController.deleteRoom)
    .put(roomController.updateRoom);

router.route('/room/:roomId/')
    .get(roomController.getRoom)
    .post(roomController.setRoomSensors);

router.route('/alerts')
    .get(verifyJWT,dataController.getAlerts);
    router.route('/alerts/:alertId')
    .put(verifyJWT,dataController.readAlert);
    

/*
router.route('/alerts/room/:roomId')
    .get()
    .post();


router.route('/alerts/Severity/:severityVal')
    .get()
    .post();
    */

module.exports = router;