/**
 * Created by congnt on 9/16/18.
 */


"use strict";
import express from "express";
import MainController from "./controllers/TourController";

let routes = express.Router();
routes.get('/check-heath', (req, res, next) => {
    res.send("Hello world!")
});

routes.get('/items', MainController.getItems);

module.exports = routes;