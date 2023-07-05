Task 4: Third-Party API Integration:

Branch Name : Tasks/Task4-Third-Party-API-Integration
File Location : app_custom_storefront/cartridge/scripts/jobs/updateReviews.js
Services : salesforce-remote/servicesXml

Storing reviews on a product's custom attributes may not be the best practice due to limitations on data storage in SFCC (Salesforce Commerce Cloud). Another option is to save the reviews in custom objects using the product IDs as keys, but there may also be limitations on the number of custom objects that can be created.

To overcome these limitations, many businesses choose to integrate with third-party review platforms like Yotpo. These platforms provide SDKs (Software Development Kits) that allow businesses to fetch reviews in real-time and display them on product detail pages (PDPs). Yotpo, for example, is a popular review platform that provides an SDK to facilitate the integration and display of reviews based on specific requirements.

By utilizing third-party review platforms, businesses can effectively manage and showcase product reviews without encountering the storage limitations of their own systems. These platforms often offer flexible solutions that can be tailored to meet the specific needs of businesses.

i am using TEXT type custom attribute on product level to save my customer reviews in json format 



