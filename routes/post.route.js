const express = require('express');
const router  = express.Router();
const Upload  = require('../middleware/multer').upload;

const postController = require('../controllers/post.controller');

// a simple test url to check that all of our files are communicating correctly.
router.post( '/add', Upload.array('files', 5), postController.add );
router.patch( '/update', postController.update );
router.get( '/index', postController.index );
router.delete( '/delete', postController.destroy );

module.exports = router;
