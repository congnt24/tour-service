"use strict";
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const options = {
    server: {poolSize: 3},
    replicaSet: {
        rs_name: 'rs0',
        poolSize: 5,
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    },
    keepAlive: 300000,
    connectTimeoutMS: 30000,
    reconnectTries: 30,
    reconnectInterval: 3000,
}

const mongooseOptions = {
    bufferMaxEntries: 0,
    server: {
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500,
    }
}
export let instance;

export function init(config) {
    instance = mongoose.createConnection(config.MONGO.price, mongooseOptions);
}

export function getInstance() {
    if (!instance)
        console.log('mongo price init failed');
    return instance;
}