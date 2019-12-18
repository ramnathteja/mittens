const request = require("request");
const environment = require('../../../environment/environment');


exports.subscribe = function (endpoint, callback) {
    var options = {
        method: 'POST',
        url: endpoint,
        headers: {
            'Content-Type': 'application/json;ty=23',
            'X-M2M-Origin': '1234',
            'X-M2M-RI': '12345',
            'Accept': 'application/json'
        },
        body: JSON.stringify
        ({
            'm2m:sub':
            {
                rn:endpoint.substring(endpoint.lastIndexOf("/")+1),
                enc: { net: [1,3] },
                nu: [environment.oneM2M_subscriptionServer.concat(environment.oneM2M_subscriptionTag)],
                nct: 2
            }
        })
    };

    request(options, function (error, response, body) {
        if(error) {
            console.log(error);
        }
        callback(body);
    });
}


