# Changelog

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