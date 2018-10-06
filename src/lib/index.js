// import {vnt_logstash} from './middlewares/Logstash';
import {init as initPosgre, getInstance as postgre} from './connections/Postgres';
// import {init as initMongoPrice, getInstance as mongoPriceConn} from './connections/MongoPrice';
import AppError from './middlewares/AppError';
// import {initKafkaProducer} from './kafka/KafkaProducer'
let styleLogger = require('./style-logger');
require('./prototype');
// import Raven from 'raven';

let config = require(process.env.APP_CONFIG);

/**
 *
 * @param {Object} conf
 * @param {String} service e.g: 'bookingv3-services'
 */
function init(conf, service) {
    console.error('initialie');
    styleLogger.initialize(true);
    config = conf;
    process.env.NODE_ENV = config.ENV;
    // global['Logstash'] = vnt_logstash(service, config.LOGSTASH ? config.LOGSTASH : '172.16.8.80').noConsole;
    global['AppError'] = AppError;
    // require('./style-logger').initialize(process.env.NODE_ENV !== 'production');
    initPosgre(config);
    // initMongoPrice(config);
    // initAuthen(config);
    // initKafkaProducer(config.KAFKA.kafka);
    // Raven.config(config.SENTRY, {
    //     parseUser: false,
    //     captureUnhandledRejections: true,
    //     name: service,
    //     env: config.ENV
    // }).install();
}

init(config, process.env.npm_package_name || 'undefined service');

module.exports = {
    init,
    config,
    postgre,
    // // mongoPriceConn,
    // requireToken,
    // authenticationWithPassport,
    // requireAdmin,
    // requireFixedToken,
    // requireRole,
    // requireRoleByCode,
    // Raven
};