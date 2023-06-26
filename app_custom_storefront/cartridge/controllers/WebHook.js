'use strict';
var server = require('server');
var OrderMgr = require('dw/order/OrderMgr');
var Transaction = require('dw/system/Transaction');
var collection = require('*/cartridge/scripts/util/collections');

server.post('OrderUpdates', function (req, res, next) {
    var webHookLogger = require('dw/system/Logger').getLogger('NotificationWebhook', 'webhook');
    var errorMessage = '';
    // Parse the incoming webhook payload
    var requestBody = JSON.parse(req.httpParameterMap.getRequestBodyAsString());
    var orderId = 'orderId' in requestBody ? requestBody.orderId : null;

    /* The status can be obtained through an API call, represented either
     in numbers (0, 1, 2, 3) or in words such as "shipped" or "paid".
     We can implement appropriate conditions based on the received
     status to handle the order accordingly.
     */
    var orderStatus = 'status' in requestBody ? requestBody.status : null;

    try {
        if (empty(orderId) || empty(orderStatus)) {
            res.setStatusCode(400);
            webHookLogger.error('Order Not Found. Order ID: {0}', orderId);
            errorMessage = 'Order Not Found in SFCC';
            throw new Error(errorMessage);
        }
        var order = OrderMgr.getOrder(orderId);
        if (!empty(order)) {
            // Currently, we are only considering the "shipped" status for order processing.
            // we can incorporate additional logic to handle various other order statuses as needed.
            if (orderStatus.toLowerCase() == 'shipped') {
                Transaction.wrap(function () {
                    order.setShippingStatus(2);
                });

                //update Inventory
                var pli = order.getAllProductLineItems();
                var requestBody = collection.map(pli, function (item) {
                    return {
                        productId: item.productID,
                        quantity: item.quantityValue
                    };
                });

                //call services (thirdparty and send data to update )
                var inventoryServices = require('*/cartridge/scripts/services/inventoryServices');
                var svc = inventoryServices.initInventoryServices
                var result = svc.call(requestBody);
                if (result.ok) {
                    webHookLogger.debug('Inventory updated successfully in the external system. Order ID: {0}', orderId);
                } else {
                    webHookLogger.error('Failed to update inventory in the external system. Order ID: {0}, Error: {1}', orderId, result.errorMessage);
                }

            } else {
                errorMessage = 'We are currently unable to provide support for the status of this order.';
                throw new Error(errorMessage);
            }

        }
        res.setStatusCode(200);
    } catch (e) {
        webHookLogger.error('Failed to update order status. Order ID: {0}, Error: {1}', orderId, e);
        res.setStatusCode(500);
        res.json({
            success: false,
            error: e.message
        });
        next();
    }
});

module.exports = server.exports();