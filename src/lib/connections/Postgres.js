let Sequelize = require('sequelize');
export let instance;
const Op = Sequelize.Op;
const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
};

export function init(config) {
    instance = instance ? instance : new Sequelize(config.POSTGRES.general.db,
        config.POSTGRES.general.username,
        config.POSTGRES.general.password, {
            host: config.POSTGRES.general.host,
            port: config.POSTGRES.general.port,
            logging: process.env.NODE_ENV !== 'production' ? console.log : false,
            dialect: 'postgres',
            pool: {
                max: 10,
                min: 0,
                idle: 10000,
                acquire: 10000,
                evict: 10000
            },
            define: {
                'timestamps': false
            },
            operatorsAliases
        });
}

export function getInstance() {
    if (!instance)
        console.log('db init is missing');
    return instance;
}