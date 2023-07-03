
TASK NO 1 : Custom SFCC Script Service

File Location : app_custom_storefront/cartridge/controllers/Product.js
Postman Collection : postmanCollection/khurram-tasks-sfcc.postman_collection.json

Explanation:

This task  involves creating a new endpoint to retrieve a product by its ID and enabling additional functionalities such as deleting a product and updating inventory. To achieve this, a custom service needs to be developed within the Salesforce Commerce Cloud (SFCC) platform. This service will make use of the OCAPI (Open Commerce API) to perform the desired operations.

The first step is to create a new endpoint that can be accessed via an API call. This endpoint will require the client key, which serves as an identifier for the requesting client. Additionally, the user and password credentials will be needed to authenticate the API call.

Once the endpoint is established, a service is implemented within the SFCC platform. This service acts as an intermediary between the client's request and the OCAPI. It receives the client key, user, and password as parameters and utilizes this information to make the appropriate API calls to OCAPI.

For example, when a client sends a request to retrieve a product by its ID, the service will take the client key, user, and password as input. It will then construct the necessary API call to OCAPI, specifying the desired product ID. The response received from OCAPI is then returned to the client, providing them with the requested product information.

To extend the functionality beyond product retrieval, the service can be further enhanced to support deleting a product and updating inventory. This can be achieved by constructing the corresponding API calls to the OCAPI endpoints responsible for these operations. The service will handle the client's request by passing the appropriate data to the OCAPI and returning the response back to the client.

It's worth noting that for this implementation, the client ID required for making API calls to OCAPI is not explicitly mentioned. It is assumed that a client ID has already been generated or obtained through the appropriate means, allowing the clients to perform these functions.

In summary, Task 1 involves creating a new endpoint and implementing a service within SFCC to interact with OCAPI. This service will facilitate retrieving a product by its ID, deleting a product, and updating inventory based on the client's requests. The necessary API calls will be made to OCAPI, and the service will handle the responses accordingly.


API end Point : {{hostULR}}/Sites-RefArchGlobal-Site/en_GB/Product-handleProductOperations

RequestBody:

Body
{
    "productId":"701643109593M",
    "operation":"GET",
    "stockLevel":"200",
    "inventoryListID":"inventory_m",
    "userName":"khurram@abc.com",
    "password":"Asdf12345@",
    "client_id":"135da4de-aee8-4aa9-a686-f76d6g259fcf",
    "clientPassword":"top12345"
}

Create two services one for OCAPI access in BM and other for operations
i have committed the services XML and postman collection with the code





