/**
 * Created by congnt on 9/16/18.
 */


"use strict";
import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import rest from './lib/middlewares/Rest';
let logger = require('morgan');
let routes = require('./routes');
let app = express();
app.use(logger('combined'));
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
app.use(rest());
app.use('/tour-service', routes);

app.listen(process.env.PORT || 3001, function () {
    console.log(`Start server at : ${new Date()}
        HTTP server is listening.
        Node Env: ${process.env.NODE_ENV}`);
});

app.use(function (err, req, res, next) {
    res.status(404).send(err.stack);
});

module.exports = app;
