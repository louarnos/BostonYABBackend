'use strict';

const express = require('express');
const app     = express();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

module.exports = {
    app
}
