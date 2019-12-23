const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController.js');
//const enshureToken = require('../libs/enshureToken.js');

router.post('/signUp', usersController.signUp);  //Users SignUp;
router.post('/signIn', usersController.signIn);  //Users SignIn;




module.exports = router;