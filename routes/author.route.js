const express = require('express');
const router  = express.Router();

const authorController = require('../controllers/author.controller');

// a simple test url to check that all of our files are communicating correctly.
router.post('/add', authorController.create);

module.exports = router;
