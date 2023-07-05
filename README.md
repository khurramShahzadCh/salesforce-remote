Task 3: Performance Optimization

Branch Name : Tasks/task3-Performance-Optimization

File Location : app_custom_storefront/cartridge/scripts/helpers/searchHelpers.js

Explanation:
please call this function at any point and pass category id as param
The `getSortedProductsByCategory` function retrieves a sorted list of products for a specified category. First, it imports the `ProductSearchModel` module from the 'dw/catalog' namespace. Then, it fetches the category object using the `CatalogMgr.getCategory()` method based on the provided `categoryID`. 

The function sets the sorting rule to 'price-low-to-high' by assigning the ID to the `sortingRuleID` variable. It creates an instance of the `ProductSearchModel` class and sets the category ID using `setCategoryID()`.

Next, it retrieves the sorting rule object using `CatalogMgr.getSortingRule()` based on the `sortingRuleID`. If `sortingRuleID` is null, the sorting rule is set to null.

The function sets the `orderableProductsOnly` property to `true`, ensuring only products available for ordering are included in the search. It applies the sorting rule using `setSortingRule()` on the `searchModel` object.

The `search()` method is called to initiate the product search based on the specified category and sorting rule. Finally, the function returns the list of products by converting the product search result into a list format using `asList()` on `searchModel.products`.
