// Rest API middleware
'use strict';
let _ = require('lodash');
let i18n = require('vnti18n');
// import Raven from 'raven';

const LANGUAGE_CODE = {
    ENGLISH: 'en',
    VIETNAMESE: 'vi'
};
i18n.locales.en = require('../error-codes/en');
i18n.locales.vi = require('../error-codes/vi');
const defaultErrorCode = i18n.locales.en;

/**
 *
 * @description This function will be set when initiating app.
 * @define app.use(rest());
 */
export default function rest() {
    return function (req, res, next) {

        let lang = req.headers['accept-language'];
        if (!Object.values(LANGUAGE_CODE).includes(lang)) {
            lang = LANGUAGE_CODE.ENGLISH;
        }

        res.sendJson = function ({message, data, paging}) {
            let tmp = {};
            tmp.status = 'success';
            tmp.message = message || 'Success';
            tmp.data = data || {};
            if (paging) {
                tmp.paging = paging || {};
            }
            res.statusCode = 200;
            res.json(tmp);
        };

        /**
         *
         * @param code
         * @param message
         * @param httpStatusCode
         * return:
         */
        res.sendError = function ({code, message, statusCode, data}) {
            // default error code is 400
            code = code || 400;
            // default http status code is 200
            // with default error codes which server returns such as 401, 500,...
            // but not pass httpStatusCode then get status by error code
            // get message following by multi languages
            message = message || String(code).localize(lang);
            res.statusCode = statusCode || 200;
            if (res.statusCode === 401) {
                res.setHeader("WWW-Authenticate", 'Bearer realm="Users", error="invalid_token"');
            }
            res.json({
                message: message,
                status: 'error',
                error_code: code,
                data
            });
        };
        next();
    };
};