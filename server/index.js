// /import config from './config'
// import mongoose from 'mongoose'

// mongoose.Promise = global.Promise;
// mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'))
// mongoose.set('debug', true);

// require('./services')


var express = require("express")
 
 
var app = express();
 
app.get("/", function(req, res)  {
    res.json({hello: 'world'});
});
 
 
var port = process.env.PORT || 3000;
 
var server = app.listen(port, function () {
    console.log('Service started on port :' + port);
});