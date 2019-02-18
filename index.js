'use strict';

require('dotenv').config();

const app      = require('./middleware/router.js').app;

const mongoose = require('mongoose');
const uri = process.env.MONGOLAB_URI || 'mongodb://localhost/yab_db';
mongoose.Promise = global.Promise;
mongoose.connect(uri); 

app.listen( 3000, () => { console.log('Server listening on port 3000') });
