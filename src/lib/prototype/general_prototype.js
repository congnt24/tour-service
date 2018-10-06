"use strict";

Array.prototype.congGroup = function (groupByName) {
    let obj = {};
    for (let item of this) {
        obj[item[groupByName]] = item
    }
    return obj
};

Array.prototype.sum = function () {
    return this.reduce((a, b) => a + b, 0)
};

global.daiParse = function (str) {
    try {
        if (typeof str === 'object') return str;
        if (typeof str === 'string') return JSON.parse(str)
    } catch (err) {
    }
};


/**
 * To generate random depend on a number
 * @param number
 * @returns {string}
 */
global.generateRandomNumber = function (number) {
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let numList = '0123456789';
    let charList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    let count = 0;
    while (count < 5) {
        if (count < 3) {
            result = charList[number % charList.length] + result;
            number = Math.floor(number / charList.length);
        } else if (count < 4) {
            result = numList[number % numList.length] + result;
            number = Math.floor(number / numList.length);
        } else {
            result = alphabet[number % alphabet.length] + result;
            number = Math.floor(number / alphabet.length);
        }
        count += 1;
    }
    return result
};


Promise.prototype.executeHttp = function () {
    return this.then(result => {
        return new Promise((resolve, reject) => {
            if (result.status === 'success') {
                resolve(result);
            } else {
                reject(result);
            }
        });
    })
};