'use strict';

/**
 * @namespace Product
 */

var server = require('server');
server.extend(module.superModule);

var Status = require('dw/system/Status');

/**
 * Product-handleProductOperations : The Product-handleProductOperations endpoint
 * @name Base/Product-handleProductOperations
 * @function
 * @memberof Product
 */
server.post('handleProductOperations', function (req, res, next) {
    var Logger = require('dw/system/Logger').getLogger('Product-Oprations', 'oprations');
    var errorMessage = '';
    // Parse the incoming payload
    var requestBody = JSON.parse(req.httpParameterMap.getRequestBodyAsString());

    // I can write this code in helper methods, but I am writing it here for easier assessment.

    var productId = 'productId' in requestBody ? requestBody.productId : null;
    var opration = 'opration' in requestBody ? requestBody.opration : null;
    var stockLevel = 'stockLevel' in requestBody ? requestBody.stockLevel : null;
    var inventoryListID = 'inventoryListID' in requestBody ? requestBody.inventoryListID : null;
    var userName = 'userName' in requestBody ? requestBody.userName : null;
    var password = 'password' in requestBody ? requestBody.password : null;
    var client_id = 'client_id' in requestBody ? requestBody.client_id : null;
    var clientPassword = 'clientPassword' in requestBody ? requestBody.clientPassword : null;

    try {
        // Validate request Boday
        if (empty(productId) || empty(opration) || empty(userName) || empty(password) || empty(client_id) || empty(clientPassword)) {
            res.setStatusCode(400);
            Logger.error('Missing Required body Param');
            errorMessage = 'Missing Required body Params';
            throw new Error(errorMessage);
        }

        var ocapiServices = require('*/cartridge/scripts/services/ocapiServices');
        var svc = ocapiServices.initGetOcapiAccessTokenServices;
        var requestBody = {
            userName: userName,
            password: password,
            client_id: client_id,
            clientPassword: clientPassword
        }
        var result = svc.call(requestBody);
        if (result.status == 'ERROR') {
            throw new Error(result.errorMessage);
        } else if (result.status == 'OK') {

            /*We can store this access token in a custom object.
            Instead of making repeated calls for obtaining the token,
            we can implement a logic to check if the token has expired.
            If the token has expired, we can make another call to retrieve a new token.
            */

            var access_token = JSON.parse(result.object.text).access_token;
            var newScv = ocapiServices.initOcapiOprations;
            if (opration == 'UPDATE' && (empty(stockLevel) || empty(inventoryListID))) {
                throw new Error('stockLevel or inventoryListID must not be empty');
            }
            requestBody = {
                productId: productId,
                opration: opration,
                stockLevel: stockLevel,
                inventoryListID:inventoryListID,
                BearerToken: access_token
            }

            result = newScv.call(requestBody);
            if (result.status == 'ERROR') {
                throw new Error(result.errorMessage);
            } else if (result.status == 'OK') {
                if (opration == 'GET') {
                    var product = JSON.parse(result.object.text);
                    res.setStatusCode(200);
                    res.json({
                        success: true,
                        product: product
                    });
                    next();
                } else if (opration == 'DELETE') {
                    res.setStatusCode(200);
                    res.json({
                        success: true,
                        message: 'Product ' +productId+' Deleted Successfully '
                    });
                    next();

                } else if (opration == 'UPDATE') {
                    var product = JSON.parse(result.object.text);
                    res.setStatusCode(200);
                    res.json({
                        success: true,
                        product: product
                    });
                    next();
                }
            }

            result;

        }


    } catch (e) {
        res.setStatusCode(500);
        res.json({
            success: false,
            error: e.message
        });
        next();
    }

});


module.exports = server.exports();