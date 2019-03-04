const express = require('express');
const router  = express.Router();
const Upload  = require('../middleware/multer').upload;

const authorController = require('../controllers/author.controller');

router.post('/add', Upload.array('file', 1), authorController.create);
router.put('/:id', Upload.array('file', 1), authorController.update);
router.get('/', authorController.show);

module.exports = router;
