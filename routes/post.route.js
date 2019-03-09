const express = require('express');
const router  = express.Router();
const Upload  = require('../middleware/multer').upload;
const passport = require('../middleware/auth.js').passport;

const postController = require('../controllers/post.controller');

router.get(    '/',    postController.index );
router.post(   '/',    passport.authenticate('jwt', { session : false }),  Upload.array('files', 10), postController.create );
router.patch(  '/',    passport.authenticate('jwt', { session : false }),  Upload.array('files', 10), postController.update );
router.delete( '/:id', passport.authenticate('jwt', { session : false }),  postController.destroy );

module.exports = router;
