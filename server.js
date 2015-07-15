// Invoke 'strict' JavaScript mode
'use strict';

// Load the 'express' module
//var express = require('express');
var fs = require('fs');
var jsonData = require('./applyData');
var open = require('open');                             // opens the browser

// Create a new Express application instance
var express = require('express')
    , cors = require('cors')
    , app = express();

app.use(cors());

app.use(express.static(__dirname + '/app')); // set the static files location /public/img will be /img for users

// Log service
app.get('/log', function (req, res) {
    if (req.param('message')) {
        fs.appendFile('trace.txt', req.param('message') + '\n', function (err) {
            if (err) return console.log(err);
        });

        res.status(200);
        res.send("logged \"" + req.param('message') + "\"");
    }
    else {
        res.status(400);
        res.send("Message parameter is missing");
    }
});

// Login service
app.get('/login', function (req, res) {
    res.status(200);
    res.send("login");
});

// Write service
app.get('/writeData',function(req, res){
    if (req.query.saveData) {
        console.log(req.query.saveData);
        var data = JSON.parse(req.query.saveData);
        jsonData.applyData.push(data);
        var dataJSON = JSON.stringify(jsonData);
        fs.writeFileSync('applyData.json', dataJSON);
        res.status(200);
        res.send("logged \"" + req.query.saveData + "\"");
    }
    else {
        res.status(400);
        res.send("Data missing");
    }
});

app.post('/writeData',function(req, res){
    var applyData = "";
    res.header('Access-Control-Allow-Origin', '*');

    req.on('data', function (chunk) {
        applyData += chunk;
    });
    req.on('end', function () {
        console.log('POSTed: ' + applyData);
        var data = JSON.parse(applyData);
        jsonData.applyData.push(data);
        var dataJSON = JSON.stringify(jsonData);
        fs.writeFileSync('applyData.json', dataJSON);
        res.status(200);
        res.send("logged \"" + req.query.saveData + "\"");

    });

});

// Read service
app.get('/readData',function(req, res){
        res.status(200);
        res.send(JSON.stringify(jsonData));
});
// Logout service
app.get('/logout', function (req, res) {
    res.status(200);
    res.send("logout");
});


// Use the Express application instance to listen to the '3000' port
app.listen(3000);

// Log the server status to the console
console.log('Server running at http://localhost:3000/');

open('http://localhost:3000/', function (err) {
      if (err) throw err;
      console.log('The user closed the browser');
    });
// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;