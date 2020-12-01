'use strict';

// requires
const express = require('express');
const app = express();

// routes
app.use('/', require('./routes'));

app.listen(process.env.PORT, () => console.log(`Monti mailer running on ${process.env.PORT}`));
