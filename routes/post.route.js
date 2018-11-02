const express = require('express');
const router  = express.Router();


const postController = require('../controllers/post.controller');

// a simple test url to check that all of our files are communicating correctly.
router.post( '/add', postController.add );
router.patch( '/update', postController.update );
router.get( '/index', postController.index );
router.delete( '/delete', postController.destroy );

module.exports = router;
