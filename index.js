'use strict';
require('dotenv').config();
const { app ,start} = require('./server');
start(process.env.PORT || 3001);