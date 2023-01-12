const express = require('express');
const router = express.Router();
const controller  = require('../controllers/controller');
const roomController  = require('../controllers/roomController');


router.route('/room/:roomId/temp')
    .post(controller.addNewTempReading)
    .get(controller.getTempReading);

router.route('/room/:roomId/hum')
    .post(controller.addNewHumReading)
    .get(controller.getHumReading);



router.route('/room/')
    .get(roomController.getAllRooms)
    .post(roomController.createNewRoom)
    .delete(roomController.deleteRoom)
    .put(roomController.updateRoom);

router.route('/room/:roomId/')
    .get(roomController.getRoom)


router.route('/alerts')
    .get(controller.getAlerts)
    // .post();

/*
router.route('/alerts/room/:roomId')
    .get()
    .post();


router.route('/alerts/Severity/:severityVal')
    .get()
    .post();
    */

module.exports = router;