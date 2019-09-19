var express = require('express');
var http  = require('http');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname)));
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})
 
app.listen(4200, function() {
    console.log('Listening port 4200');
})