'use strict';
var base = module.superModule;
var CatalogMgr = require('dw/catalog/CatalogMgr')

/**
 * Retrieves a product by categoryID.
 * @param {string} categoryID - The ID of the product to retrieve.
 * @returns {Array} sortedProducts -  sortedProducts Array
 */
function getSortedProductsByCategory(categoryID) {
    var ProductSearchModel = require('dw/catalog/ProductSearchModel');
    var category = CatalogMgr.getCategory(categoryID);
    var sortingRuleID = 'price-low-to-high'
    var searchModel = new ProductSearchModel();
    searchModel.setCategoryID(category.ID);
    var sortingRule = sortingRuleID ? CatalogMgr.getSortingRule(sortingRuleID) : null;
    searchModel.orderableProductsOnly = true;
    searchModel.setSortingRule(sortingRule);
    searchModel.search();
    return searchModel.products.asList();;
}

base.getSortedProductsByCategory = getSortedProductsByCategory;
module.exports = base;