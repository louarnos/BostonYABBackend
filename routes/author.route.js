const express = require('express');
const router  = express.Router();
const Upload  = require('../middleware/multer').upload;

const authorController = require('../controllers/author.controller');

// a simple test url to check that all of our files are communicating correctly.
router.post('/add', Upload.array('file', 1), authorController.create);

module.exports = router;
