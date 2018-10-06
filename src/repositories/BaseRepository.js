import DataType from 'sequelize';
// import postgres from '../lib/index';
let postgres = require('../lib/index').postgre();
let Promise = require('bluebird');
export default class BaseRepository {
    static getSequelize() {
        return postgres;
    }

    static getDataType() {
        return DataType;
    }

    async getTransaction() {
        return await postgres.transaction();
    }

    /**
     * execute a raw query.
     * @constructor
     * @param {string} sql - query string.
     * @param {object} replacements - If an array is passed, ? will be replaced in the order that they appear in the array
     * If an object is passed, :key will be replaced with the keys from that object
     * If the object contains keys not found in the query or vice versa, an exception will be thrown.
     */
    rawQuery(sql = '', replacements = {}, transaction) {
        return postgres.query(sql, {
            replacements: replacements,
            type: DataType.QueryTypes.SELECT,
            transaction
        }).then(records => {
            return records;
        });
    }


    queryListAndCount(sql_without_limit, replacements) {
        let {page, page_size} = replacements;
        replacements.offset = (page * 1 - 1) * page_size;
        replacements.limit = page_size;
        //sql_without_limit ko dc co ";" o cuoi
        let query_items = sql_without_limit + ' OFFSET :offset LIMIT :limit;';
        let query_count = `SELECT count(*) FROM (${sql_without_limit}) t;`;
        return Promise.all([this.rawQuery(query_items, replacements), this.rawQuery(query_count, replacements)])
            .then(arrays => {
                return {
                    data: arrays[0],
                    paging: {
                        page: parseInt(page), page_size: parseInt(page_size), total: parseInt(arrays[1][0].count)
                    }
                }
            })
    }
}