const environment = require('../../../environment/environment');
const mqtt = require('mqtt');

const resourceMap = require('../resouce-mapping/mobius-to-wdc');
const client = mqtt.connect(environment.oneM2M_subscriptionServer);

exports.notificationHandler = function () {
    //recieve notification from the wdc
    client.on('connect', () => {
        console.log(".............MQTT connection for wdc established\n");
        client.subscribe(environment.oneM2M_subscriptionListenerTag); //TODO: need to replace 
    });
    client.on('message', (topic, message) => {
        var dcResponse = JSON.parse(message.toString());
        //TODO: need to send ack back to mobius
        //TODO: send to resource mapping
        resourceMap.customeMapper(dcResponse);
    });

}