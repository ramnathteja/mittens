const request = require("request");
const environment = require('../../../environment/environment');


exports.createFLX = function (endpoint, payload, callback) {
    var options = {
        method: 'PUT',
        url: environment.wdc_serverIP+ endpoint,
        headers: {

            'Content-Type': 'application/json',
            'X-M2M-Origin': 'SM',
            'X-M2M-RI': '12345',
            Accept: 'application/json'
        },
        body: payload
    };
    console.log(options);


    request(options, function (error, response, body) {
        console.log(error);
        console.log('function called!!!!');
        callback(body);
    });
}