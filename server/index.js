// import config from './config'
// import mongoose from 'mongoose'

// mongoose.Promise = global.Promise;
// mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'))
// mongoose.set('debug', true);

// require('./services')


import express from "express"
 
 
var app = express();
 
app.get("/", (req, res) => {
    res.json({hello: 'world'});
});
 
 
var port = process.env.PORT || 3000;
 
var server = app.listen(port, () => {
    console.log('Service started on port :' + port);
});