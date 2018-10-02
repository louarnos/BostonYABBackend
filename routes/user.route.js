const express = require('express');
const router  = express.Router();


const userController = require('../controllers/user.controller');

// a simple test url to check that all of our files are communicating correctly.
router.post('/register', userController.register);
router.get('/all', userController.all);

module.exports = router;
