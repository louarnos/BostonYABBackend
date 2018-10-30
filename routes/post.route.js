const express = require('express');
const router  = express.Router();


const postController = require('../controllers/post.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', postController.test);
router.post('/add', postController.add);

module.exports = router;
