'use strict';
const logger = require('./../../applogger');
const router = require('express').Router();
const xfdController = require('./xfdController');
router.get('/notify',xfdController.notify);
// router.get('/sendtoslack',xfdController.sendtoslack);


module.exports = router;
