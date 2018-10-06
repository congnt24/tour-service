"use strict";
let _ = require('lodash');
let kafka = require('kafka-node');
let KeyedMessage = kafka.KeyedMessage;
let isConnected = false;
let producer;

export function initKafkaProducer(kafkaHost) {
    let client = new kafka.KafkaClient({kafkaHost});
    producer = new kafka.Producer(client);
    producer.on('ready', function () {
        isConnected = true;
    });

    producer.on('error', function (err) {
        console.error(err, 'Kafka producer error');
    });
}

export default class KafkaProducer {
    static sendMessage(topic, key, message) {
        return new Promise(function (resolve, reject) {
            let data = JSON.stringify(message);
            console.log(data, 'kafka-data');

            let km = new KeyedMessage(key, data);
            if (_.isEmpty(data)) {
                return reject({mes: 'empty data'});
            }
            if (isConnected) {
                producer.send([
                    {
                        topic,
                        partition: 0,
                        messages: [km]
                    }
                ], function (err, result) {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(result);
                    }
                });
            }
        });
    }

    static createTopic(topics) {
        if (isConnected) {
            producer.createTopics(topics, false, function (err, data) {
                console.log(data);
            });
        }
    }
}