"use strict";

var Reset = "\x1b[0m";
var Bright = "\x1b[1m";
var Dim = "\x1b[2m";
var Underscore = "\x1b[4m";
var Blink = "\x1b[5m";
var Reverse = "\x1b[7m";
var Hidden = "\x1b[8m";

var FgBlack = "\x1b[30m";
var FgRed = "\x1b[31m";
var FgGreen = "\x1b[32m";
var FgYellow = "\x1b[33m";
var FgBlue = "\x1b[34m";
var FgMagenta = "\x1b[35m";
var FgCyan = "\x1b[36m";
var FgWhite = "\x1b[39m";

var BgBlack = "\x1b[40m";
var BgRed = "\x1b[41m";
var BgGreen = "\x1b[42m";
var BgYellow = "\x1b[43m";
var BgBlue = "\x1b[44m";
var BgMagenta = "\x1b[45m";
var BgCyan = "\x1b[46m";
var BgWhite = "\x1b[47m";

module.exports = {
    initialize: function (enableLog) {
        console.warn = function () {
            if (enableLog) {
                var date = new Date();
                var time = Reset + FgBlue + date.toLocaleTimeString() + " " + date.getUTCMilliseconds() + " ms ->" + FgYellow;
                return Function.prototype.bind.call(console.log, console, time);
            } else {
                return Function.prototype.bind.call(function () {

                });
            }
        }();

        console.error = function () {
            if (enableLog) {
                var date = new Date();
                var time = Reset + FgBlue + date.toLocaleTimeString() + " " + date.getUTCMilliseconds() + " ms ->" + FgRed;
                return Function.prototype.bind.call(console.log, console, time);
            } else {
                return Function.prototype.bind.call(function () {

                });
            }
        }();

        console.debug = function () {
            if (enableLog) {
                var date = new Date();
                var time = Reset + FgBlue + date.toLocaleTimeString() + " " + date.getUTCMilliseconds() + " ms ->" + FgMagenta;
                return Function.prototype.bind.call(console.log, console, time);
            } else {
                return Function.prototype.bind.call(function () {

                });
            }
        }();

        console.log = function () {
            if (enableLog) {
                var date = new Date();
                var time = Reset + FgBlue + date.toLocaleTimeString() + " " + date.getUTCMilliseconds() + " ms ->" + Reset;
                return Function.prototype.bind.call(console.log, console, time);
            } else {
                return Function.prototype.bind.call(function () {

                });
            }
        }();
    }
};


