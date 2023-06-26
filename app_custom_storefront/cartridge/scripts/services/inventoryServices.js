'use strict';

var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

var inventoryServices  = LocalServiceRegistry.createService("http.inventory.update", {
    createRequest: function(svc, args) {
        var serviceUrl = svc.configuration.credential.URL;
		var token = 'abcdefghigklmnopqrestuvwxyz';
        svc.setURL(serviceUrl);
        svc.addHeader("Content-Type", "application/json");
		svc.addHeader("Authorization", "Bearer "+token);
		svc.setRequestMethod("POST");
		return args;
    },

    parseResponse: function(svc, client) {
		return JSON.parse(client.getText());;
	},
    mockExec: function (svc, client) {
        return {
            statusCode: 200,
            statusMessage: "Success",
            text: "MOCK RESPONSE (" + svc.URL + ")"
        };
    },
});

module.exports = {
	initInventoryServices:inventoryServices
};