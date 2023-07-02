'use strict';

var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var Encoding = require('dw/crypto/Encoding');
var Bytes = require('dw/util/Bytes');

/**
 Initializes the OCAPI access token service.
 @param {Object} args - The arguments for initializing the service.
 @returns {Object} - Tservice responce.
*/
var ratingAndReviewServices = LocalServiceRegistry.createService("http.rating.reviews", {
    createRequest: function (svc, args) {
        svc.addHeader("Content-Type", "application/x-www-form-urlencoded");
        svc.setRequestMethod("POST");
        return JSON.stringify(args);
    },

    parseResponse: function (svc, response) {
        return response.text;
    },

    mockCall: function () {
        return {
            statusCode: 200,
            statusMessage: 'Success',
            text:{
                "reviews": [
                  {
                    "product_id": "008884304030M",
                    "ratings": [
                      {
                        "rating": 4.5,
                        "review_text": "Great product! It exceeded my expectations. Highly recommended.",
                        "user_name": "JohnDoe"
                      },
                      {
                        "rating": 3.8,
                        "review_text": "Good value for the money. Works well.",
                        "user_name": "JaneSmith"
                      },
                      {
                        "rating": 4.0,
                        "review_text": "Solid build quality. I'm satisfied with the purchase.",
                        "user_name": "MarkJohnson"
                      }
                    ],
                    "average_rating": 4.1
                  },
                  {
                    "product_id": "008884304047M",
                    "ratings": [
                      {
                        "rating": 3.2,
                        "review_text": "Decent product for the price. Could be better in terms of quality.",
                        "user_name": "AliceGreen"
                      },
                      {
                        "rating": 2.5,
                        "review_text": "Average performance. Not worth the price.",
                        "user_name": "RobertSmith"
                      },
                      {
                        "rating": 3.8,
                        "review_text": "Works fine, but lacks some features.",
                        "user_name": "EmilyBrown"
                      },
                      {
                        "rating": 4.5,
                        "review_text": "Impressive product! Highly recommended.",
                        "user_name": "MichaelJones"
                      }
                    ],
                    "average_rating": 3.75
                  },
                  {
                    "product_id": "008884304054M",
                    "ratings": [
                      {
                        "rating": 5,
                        "review_text": "Outstanding product! I'm extremely satisfied with my purchase.",
                        "user_name": "SarahWilson"
                      },
                      {
                        "rating": 4.7,
                        "review_text": "Excellent quality. Works like a charm.",
                        "user_name": "DavidTaylor"
                      },
                      {
                        "rating": 4.2,
                        "review_text": "Reliable and durable. Happy with the performance.",
                        "user_name": "OliviaClark"
                      },
                      {
                        "rating": 4.5,
                        "review_text": "Great features and functionality.",
                        "user_name": "WilliamAnderson"
                      },
                      {
                        "rating": 3.9,
                        "review_text": "Decent product, but could use some improvements.",
                        "user_name": "SophiaLee"
                      }
                    ],
                    "average_rating": 4.46
                  }
                ]
              }
        };
    }
});

module.exports = {
    iniRatingAndReviewServices: ratingAndReviewServices
};