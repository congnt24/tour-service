let winston = require('winston');
require('winston-logstash');

/**
 *
 * @description This function will be set when initiating app as a Global variable.
 * @define global['Logstash'] = vnt_logstash('v2-user', '172.16.8.80').noConsole;
 * @usage Logstash.error('error 500', { data: { api_name: 'Error 500', api_status: 'success', api_response: req }, type: '123pay_api', call_time: new Date().getTime() });
 * @param {String} server Example:'v2-user'
 * @param {String} host Example:'172.16.8.80'
 * @return {Function}
 */
export function vnt_logstash(server, host) {
    let SERVER_NAME = server;
    let LOGSTASH_INPUT_HOST = host; // dev
// const LOGSTASH_INPUT_HOST = '127.0.0.1'; // local

    let transportConsole = new (winston.transports.Console)();
    let loggerConsoleOnly = new (winston.Logger)({
        transports: [transportConsole],
        exitOnError: false
    });
// TODO: Default Type
    let transportLogstashDefault = new (winston.transports.Logstash)({
        port: 28777,
        node_name: SERVER_NAME,
        meta: {env: process.env.NODE_ENV},
        host: LOGSTASH_INPUT_HOST,
        retryInterval: 60000,
        max_connect_retries: Number.MAX_VALUE
    });

    transportLogstashDefault.on('error', function (err) {
        console.error(err);
    });

    let loggerDefault = new (winston.Logger)({
        transports: [transportConsole, transportLogstashDefault],
        exitOnError: false
    });

    let loggerDebugsNoConsole = new (winston.Logger)({
        transports: [transportLogstashDefault],
        exitOnError: false
    });

    let vntLogger = loggerDefault;
    vntLogger.noConsole = loggerDebugsNoConsole;
    return vntLogger;
}
