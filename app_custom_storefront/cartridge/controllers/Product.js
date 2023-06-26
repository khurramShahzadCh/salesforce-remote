'use strict';

var server = require('server');
server.extend(module.superModule);

/**
 * Extends Product-Show controller to show rating and reviews on product details page.
 */
server.append('Show', function (req, res, next) {
    var reviewsHelper = require('*/cartridge/scripts/helpers/reviewsHelper.js');
    var viewData = reviewsHelper.addAndUpdateRatingsOrReviewsToViewData(viewData.product.id);
    res.setViewData(viewData);

    next();
});

module.exports = server.exports();









