'use strict';
let defaultErrorCode = require(`../error-codes/vi`);

/**
 *
 * @description This class will be set when initiating app as a Global variable.
 * @define global['AppError'] = AppError;
 * @usage throw new AppError({'code': 'E2001'});
 */
export default class ExtendableError extends Error {
    constructor({code, message, data}) {
        code = code || 400;
        message = message || "";
        super(message);
        this.name = this.constructor.name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
        this.code = code;
        this.data = data;
    }
}
