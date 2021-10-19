const express = require('express');

const http = require('http');
var {PORT} = require('./constants/systemConfig.js');

console.log(PORT)
const app = express();

const nodeServer = http.createServer(app).listen(PORT, () => {
    console.log('server started successfully', PORT)
})