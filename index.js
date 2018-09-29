const express = require('express');
const bodyParser = require('body-parser');

const post = require('./routes/post.route'); // Imports routes for the posts router
const app     = express();

const mongoose = require('mongoose');
const uri = process.env.MONGOLAB_URI || 'mongodb://localhost/yab_db';
mongoose.Promise = global.Promise;
mongoose.connect(uri); 

app.use('/posts', post);
app.get('/', ( req, res ) => {
    res.send('Hello World');
});

app.listen( 3000, () => { console.log('Gooooooooooomba') });
