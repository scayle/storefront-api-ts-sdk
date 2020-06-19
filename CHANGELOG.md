# Changelog

### Unreleased

- Export `BasketItemPrice` and `BasketTotalPrice` ([28](https://gitlab.com/aboutyou/cloud-core/backbone-ts/-/merge_requests/28))
  - Thanks to [@sqonde](https://gitlab.com/sqonde) for contributing this fix

### 8.0.0

- The `axios` library is now a peer dependency, so you can specify the version to be used in the consumer's `package.json`.
- `depth` is now exposed on the category response type
- `skipAvailabilityCheck` can now be specified for basket requests

### 7.0.0

- `BapiClient`: Change the default `shopID` placement to be `query`, which avoids `CORS` `OPTIONS` requests for `GET` requests.

### 6.0.0

- Align the parameters across `BapiClient.categories.*` methods

  - The `depth` parameter is now send to BAPI in all cases, even though it's not needed for every case (e.g. requesting categories by IDs wouldn't include children, unless those where specified using the `with` parameter). This is done to have a consistent behavior across the SDK methods, and not be reliant on per endpoint behavior in BAPI.
  - The legacy behavior of not returning the whole category tree by default when requesting the root categories (`BapiClient.categories.getRoots`) is kept. Pass an explicit `children` parameter (e.g. `1000`) to request the whole tree.
  - `BapiClient.categories.getByIds` and `createCategoriesByIdsEndpointRequest` used to take a `depth` parameter which mapped directly to the BAPI HTTP API `depth` parameter. This has now been removed in favor of `with.children`, which specifies the additional levels of children that should be loaded. Set `with.children` to `"previous depth" - 1` when upgrading to this version.

- Adds support for the `/filters/:groupName/values` endpoint

### 5.0.0

- Remove support for `/masters` endpoint

### 4.1.1

- Add `minProductId` to `ProductsSearchEndpointParameters`

### 4.1.0

- Add `variants.getByIds` to `BapiClient`

### 4.0.1

- Fix types for the `BapiProductCategory` and `BapiCategory`

### 4.0.0

- Removal of the following product helpers: `findBrand`, `attributeLabel`, `variantAttributeLabel`, `variantAttributeId`, `attributeNames` and `labelFromAttributeGroup`
- Addition of the following helpers: `getAttributeValues`

These helpers have been removed because they were not very useful by themselves. With the new optional chaining operator, most of these operations can be performed inline in the code.

For more information, see: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#optional-chaining

### 3.0.1

Fix `ObjectMap` type usage, such that it's included in the final output package.

## 3.0.0

Breaking changes:

- Remove `tax` from `BapiPrice` for the `BasketItemPrice` since BAPI won't supply that anymore soon.

### 2.8.0

Add `includeHidden` parameter to categories by IDs request (corresponds to BAPI's `showHidden` URL query parameter).

### 2.7.0

The `tax` field on the basket total costs is not exposed anymore, as it will shortly be removed from the API responses.

The Axios adapter is now configurable.

### 2.5.2

Expose `including` on `/filters` endpoint

### 2.5.1

Expose `id` on appropriate `FilterItemWithValues`

### 2.5.0

Expose `id` for attributes.

### 2.4.0

Support overwriting the Checkout shop ID on basket `GET`s with `checkoutShopId` parameter.

## 2.3.0

Add `addOrUpdateItems` method to `BapiClient` that handles adding or updating of many items, including merging quantities of new items with existing ones.

## 2.2.0

Add `pricePromotionKey` to every wishlist request.

## 2.1.2

Add ability to provide `pricePromotionKey` when adding items to wishlist.

## 2.1.0

Expose `deliveryForecast` on variant stock.

Expose `availableQuantity` and `deliveryForecast` on basket item.

Attribute group `type` property now correctly typed as nullable to match API schema.

Reference price `size` property now correctly typed as nullable to match API schema.

## 2.0.0

`createProductsByIdsEndpointRequest` throws when an empty array is provided for the `productIds` parameter.

`BapiClient.products.getByIds` returns an empty array when an empty array is provided for the `productIds` parameter, not making any network request.

`pricePromotionKey` can now be set for product listing request and products by IDs queries.

Add `includeHidden` parameter to product's `categories` include to request hidden categories on the product.

Support `childShopId` in `addWishlistItemEndpointRequest`.

## 1.5.0

Set `accept-encoding: gzip, deflate` in NodeJS context

## 1.4.0

Expose `campaignKey` in wishlist API calls.

## 1.3.0

Rename `includeSoldOutProducts` parameter to `includeSoldOut`.

## 1.2.1

Allow passing custom headers to `execute`.

## 1.2.0

Add search mappings endpoint.

## 1.1.1

Allow specifying `includeSellableForFree` parameter on `/product` endpoints
Allow specifying `parameters.includeSoldOutProducts` parameter on `/products` search endpoint

## 1.1.0

Allow specifying `with` parameter for `/filters` requests

## 1.0.0

Expose `displayData` on `Basket` response

Improve `displayData` type, only allowing expected keys

Use `CentAmount` type for range filters, as their is only 1 for prices ( …

## 0.31.0

Expose `displayData` property in "create basket item" requests

## 0.30.0

Fix `brands` include for search suggestions

## 0.29.0

Set `sortingKey` parameter correctly (as `sortingKey`) for product queries

Expose `currencyCode` on price

## 0.28.0

Add search suggestions endpoint.

## 0.27.0

Add ability to set HTTP basic auth credentials.

## 0.26.0

Expose `customData` property on stocks. Remove it from variants.

Refine type for `BooleanFilterValue`, which can contain 0, 1, or 2 values.

## 0.25.0

Expose `appliedPricePromotionKey` on variant

## 0.24.0

Expose `categoryProperties` on product and allow it to be included in requests.

## 0.23.0

Enable `sortingKey` for product search queries

Expose `customData` property on variants

export `AddToBasketFailureKind` enum

## 0.22.0

Support `campaignKey` for basket requests

## 0.21.0

Expose optional `priceRange` property on product entities.

## 0.20.0

The `key` property is now exposed on basket responses.

A `childShopId` parameter can now be passed to "add to basket" calls, which will be forward as `appId` in the payload of the checkout call.

The shop ID can now be set via the header or via an URL query parameter.  
Since it the URL parameter doesn't infere with CORS it's now mandatory in the SDK (and also in upcoming versions of the BAPI itself).  
The `execute` function by default will place the shop ID in the URL, while the `BapiClient` will place the shop ID in the header to support existing BAPI installations. This might change in the future.

## 0.19.0

Respect `advancedAttributes` query for variants in basket requests

## 0.18.0

Fix "Add Wishlist Item" requests

## 0.17.1

Request non-legacy image attributes by default. No specific setting needed. Now matches the types of the response in all cases.

## 0.17.0

Correct types for product image attributes (non-legacy style).

## 0.16.0

Make the `shopId` optional, for cases where only a single shop ID is used and one wants to avoid CORS OPTIONS request in browser settings.

## 0.15.0

Send explicit `depth` parameter for all `/categories` requests. To request the whole category tree use an explicit depth exceeding the tree depth.
