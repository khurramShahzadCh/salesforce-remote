'use strict';

var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var Encoding = require('dw/crypto/Encoding');
var Bytes = require('dw/util/Bytes');

/**
 Initializes the OCAPI access token service.
 @param {Object} args - The arguments for initializing the service.
 @returns {Object} - The OCAPI access token service.
*/
var ocapiAccessToken = LocalServiceRegistry.createService("http.ocapi.auth", {
    createRequest: function (svc, args) {
        var userName = args.userName;
        var password = args.password + ':' + args.clientPassword;
        var b64AuthCredentials = Encoding.toBase64(new Bytes(userName + ':' + password, 'UTF-8'));
        svc.addHeader("Content-Type", "application/x-www-form-urlencoded");
        svc.addHeader('Authorization', 'Basic ' + b64AuthCredentials);
        svc.addParam('grant_type', 'urn:demandware:params:oauth:grant-type:client-id:dwsid:dwsecuretoken');
        svc.addParam('client_id', args.client_id);
        svc.setRequestMethod("POST");
        return JSON.stringify(args);
    },

    parseResponse: function (svc, response) {
        return response;
    }
});

/**
 Initializes the OCAPI operations service.
 @param {Object} args - The arguments for initializing the service.
 @returns {Object} - The OCAPI operations service.
*/
var ocapiOperations = LocalServiceRegistry.createService("http.ocapi.internal", {
    createRequest: function (svc, args) {
        var serviceUrl = svc.configuration.credential.URL;
        switch (args.operation) {
            case 'DELETE':
                serviceUrl = serviceUrl + 'products/' + args.productId;
                svc.setRequestMethod("DELETE");
                break;
            case 'UPDATE':
                serviceUrl = serviceUrl + 'inventory_lists/' + args.inventoryListID + '/product_inventory_records/' + args.productId;
                svc.setRequestMethod("PATCH");
                break;
            case 'GET':
                //get the site ID from custom preference
                serviceUrl = serviceUrl + 'products/' + args.productId + '?site_id=RefArchGlobal&expand=all';
                svc.setRequestMethod("GET");
                break;
            default:
                break;
        }

        svc.setURL(serviceUrl);
        svc.addHeader("Authorization", "Bearer " + args.BearerToken);
        if (args.operation == 'UPDATE') {
            var amount = args.stockLevel;
            args = {};
            args.allocation = {
                "amount": amount
            }
        }
        return JSON.stringify(args);
    },

    parseResponse: function (svc, response) {
        return response;
    }
});

module.exports = {
    initGetOcapiAccessTokenServices: ocapiAccessToken,
    initOcapiOperations: ocapiOperations
};