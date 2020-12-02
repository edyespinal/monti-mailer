'use strict';

// requires
const express = require('express');
const app = express();

// fix CORS
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

// routes
app.use('/', require('./routes'));

app.listen(process.env.PORT, () => console.log(`Monti mailer running on ${process.env.PORT}`));
