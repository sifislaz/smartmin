const express = require('express');
const router = express.Router();
const dataController  = require('../controllers/dataController');
const humidityController  = require('../controllers/humidityController');
const temperatureController  = require('../controllers/temperatureController');
const roomController  = require('../controllers/roomController');


router.route('/room/:roomId/temp')
    .post(temperatureController.addNewTempReading)
    .get(temperatureController.getTempReading);

router.route('/room/:roomId/hum')
    .post(humidityController.addNewHumReading)
    .get(humidityController.getHumReading);



router.route('/room/')
    .get(roomController.getAllRooms)
    .post(roomController.createNewRoom)
    .delete(roomController.deleteRoom)
    .put(roomController.updateRoom);

router.route('/room/:roomId/')
    .get(roomController.getRoom)
    .post(roomController.setRoomSensors);

router.route('/alerts')
    .get(dataController.getAlerts);


    router.route('/alerts/:alertId')
    .post(dataController.readAlert);
    

/*
router.route('/alerts/room/:roomId')
    .get()
    .post();


router.route('/alerts/Severity/:severityVal')
    .get()
    .post();
    */

module.exports = router;