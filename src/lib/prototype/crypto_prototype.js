"use strict";
let bcrypt = require('bcryptjs')
    , saltRounds = 10;

let fs = require('fs');
let crypto = require('crypto');
let util = require('util');
export const VNTRIP_AES_PASSWORD = process.env.NODE_ENV === 'production'
    ? 'NwYrC6lAOpm5MbyLaM97DUGFNLaqjb9f' : 'kingkongkingkongkingkongkingkong';
export const VNTRIP_AES_IV = process.env.NODE_ENV === 'production'
    ? 'ZAylXn7rc9LrOO2C' : '0123456789012345';
const algorithm = 'AES-256-CTR',
    PASSWORD = Buffer.from(VNTRIP_AES_PASSWORD, 'ascii'),
    IV = Buffer.from(VNTRIP_AES_IV);

String.prototype.encryptAES = function () {
    let cipher = crypto.createCipheriv(algorithm, PASSWORD, IV);
    let crypted = cipher.update(this, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};

String.prototype.decryptAES = function () {
    let decipher = crypto.createDecipheriv(algorithm, PASSWORD, IV);
    let dec = decipher.update(this, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};


String.prototype.hmac = function (key = '') {
    return crypto.createHash('sha1', key).update(this).digest('hex')
};

String.prototype.hmac256 = function (key = '') {
    return crypto.createHmac('sha256', key).update(this).digest('hex')
};

String.prototype.md5 = function () {
    return crypto.createHash('md5').update(this).digest("hex")
};

String.prototype.toBase64 = function () {
    return Buffer.from(this).toString('base64');
};

String.prototype.encryptPassword = function() {
    return bcrypt.hash(this, saltRounds)
};

String.prototype.comparePassword = function (hash) {
    return bcrypt.compare(this, hash);
};

function generateRandomString(number) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < number; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

String.prototype.genAccessToken = function () {
    return `ACCESS${this}${new Date().getTime()}${generateRandomString(5)}`.md5()
};
String.prototype.genRefreshToken = function () {
    return `REFRESH${this}${new Date().getTime()}${generateRandomString(5)}`.md5()
};