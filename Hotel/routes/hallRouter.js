const express = require('express');
const router = express.Router();

const hallController = require('../controllers/hallController.js');
const enshureToken = require('../libs/enshureToken.js');
const enshureAdmin = require('../libs/enshureAdmin.js');
const enshureTokenWithBarrier = require('../libs/enshureTokenWithBarrier.js');



router.post('/halls',enshureTokenWithBarrier,enshureAdmin, hallController.addHall); //Only admin can add new halls;
router.get('/halls', hallController.getAllHalls);
router.delete('/halls/:id',enshureTokenWithBarrier,enshureAdmin, hallController.deleteHall); //Only admin can delete hall;
// Developer routes
router.put('/test', hallController.test);

module.exports = router;