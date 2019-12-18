const jsonpath = require('jsonpath');
const createFlex = require('../wdc/wdc-createFLX');


//TODO: i have to extract endpoint and data from the notification
exports.customeMapper = function (mobiusRespose) {
    var sur = jsonpath.value(mobiusRespose, '$..sur');
    var nev = jsonpath.value(mobiusRespose, '$..con');
    var endpoint = sur.substring('Mobius/'.length);
    var payload;
    endpoint = endpoint.substring(0, endpoint.lastIndexOf('/'));
    if (endpoint.includes('spot')) {
        endpoint = endpoint.replace('sync_parking_raw', 'sync_parking');
        endpoint = endpoint.replace('spot', 'parkingSpot');
        endpoint = endpoint.replace('yt_lot', 'parkingLot');
        payload = {
            "sc:parkingSpot": {
                "status": nev
            }

        }
    } else {
        endpoint = endpoint.replace('sync_parking_raw', 'sync_parking');
        endpoint = endpoint.replace('yt_lot', 'parkingLot');
        payload = {
            "sc:offStreetParking": {
                "availableSpotNumber": nev
            }
        }
    }
    console.log(endpoint + '...' + JSON.stringify(payload));
    createFlex.createFLX(endpoint, JSON.stringify(payload), function (response) {
        console.log(response);
    });
}