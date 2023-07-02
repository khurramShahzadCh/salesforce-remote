'use strict';
var collections = require('dw/util/Collection');
var ProductMgr = require('dw/catalog/ProductMgr');
var Transaction = require('dw/system/Transaction');

/*
Savings reviews on a product's custom attributes may not be the best practice due to
limitations on data storage in SFCC (Salesforce Commerce Cloud). Another option is to
save the reviews in custom objects using the product IDs as keys, but there may also be
limitations on the number of custom objects that can be created.

To overcome these limitations, many businesses choose to integrate with
third-party review platforms like Yotpo. These platforms provide SDKs (Software Development Kits)
that allow businesses to fetch reviews in real-time and display them on product detail pages (PDPs).
Yotpo, for example, is a popular review platform that provides an SDK to facilitate the integration
and display of reviews based on specific requirements.

By utilizing third-party review platforms, businesses can effectively
manage and showcase product reviews without encountering the storage limitations
of their own systems. These platforms often offer flexible solutions that can be
tailored to meet the specific needs of businesses.
*/

module.exports.execute = function () {

    var Logger = require('dw/system/Logger').getLogger('productReviews', 'RatingtReviews');

    try {
        var ratingAndReviewServices = require('app_custom_storefront/cartridge/scripts/services/ratingAndReviewServices');
        var svc = ratingAndReviewServices.iniRatingAndReviewServices;

        /*
        Certainly! When using mock data, you can pass any request body to simulate the data you
        would receive from actual services. However, if you are working with real services, it's
        important to create a validator to ensure the received data is valid and meets the required criteria.

        In simple terms, if you are using mock data, you have the flexibility to provide any request body.
        But when working with real services, you should implement a validator to validate the received data,
        ensuring it is in the expected format and meets any specified constraints. This helps maintain data integrity
        and prevents errors or unexpected behavior in your system.
        */

        var requestBody = {
            token: 'xyz',
            client: 'abcd'
        }
        var result = svc.call(requestBody);
        if (result.status == 'OK') {
            var reviews = result.object.reviews;
            for (var i = 0; i < reviews.length; i++) {
                var item = reviews[i];
                var product = ProductMgr.getProduct(item.product_id);
                if (empty(product)) {
                    Logger.error('Product does not exist: ' + prod.pid);
                }

                /*If the average rating is not provided by a third party,
                you can calculate it manually using the average formula.
                The average rating is calculated by summing up all the
                individual ratings and dividing the total by the number of ratings */

                Transaction.wrap(function () {
                    product.custom.averageRating = item.average_rating;
                    product.custom.reviewCount = item.ratings.length;
                    product.custom.reviews = JSON.stringify(item.ratings);
                });

            };
        } else {
            //create Info loger according to response
        }

    } catch (error) {
        Logger.error(error.message)
    }
}