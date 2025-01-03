const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {log} = require('console');
const app = express();

app.use(function(req, res, next) {
    console.log('Time ', Date.now());
    next();
});

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.send('get method');
});


var server = app.listen(8080, function () {

    var host = server.address().address
    var port = server.address().port
    
    console.log("Ung dung Node.js dang lang nghe tai dia chi: http://localhost:8080 ")
    
    })