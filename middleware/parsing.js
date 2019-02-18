'use strict';

const express = require('express');
const app     = express();
const cors    = require('cors');

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use( cors() );

app.use(express.static('uploads'))

module.exports = {
    app
}
