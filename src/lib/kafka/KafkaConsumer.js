"use strict";
let kafka = require('kafka-node');

export function initKafkaConsumer(kafkaHost, topic_array) {
    let Consumer = kafka.Consumer,
        client = new kafka.KafkaClient({kafkaHost}),
        consumer = new Consumer(
            client,
            topic_array,
            {
                autoCommit: false
            }
        );
    consumer.on('message', function (message) {
        console.log(message);
    });
    consumer.on('error', function (message) {
        console.error(message);
    });
}