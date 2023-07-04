Task 2: Order Management

File Location : app_custom_storefront/cartridge/controllers/WebHook.js
Postman Collection : postmanCollection/khurram-tasks-sfcc.postman_collection.json

Explanation:
In typical cases, a third party interacts with the OCAPI to modify the order status. To achieve functionalities like updating inventory on the third party system, we can extend the hook. However, for the given task, I followed the specified requirements and focused on completing the assigned task, which did not involve extending the hook for inventory updates on the third party system.


API end Point : {{hostUrl}}/Sites-RefArchGlobal-Site/en_GB/WebHook-OrderUpdates

RequestBody:

body
{
    "orderId":"00000001",
    "status":"shipped",
    "signature":"Asdf@1234"
}
