let multer = require('multer');

let upload = multer({ dest: 'uploads/' });

module.exports = {
    upload: upload,
};
