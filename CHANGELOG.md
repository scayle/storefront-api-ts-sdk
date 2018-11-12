# Changelog

## UNRELEASED

Make the shop ID mandatory, as it's now fully supported by BAPI.

Both (parent) shop IDs and child shop IDs are supported. Just set the most specific one you want to use.

The `execute` function now accepts an extra parameter specifying where to put the shop ID: In the URL's query or the requests headers.

By default `execute` will use the query placement, while the `BapiClient` class will use the header for now to support existing BAPI setups. This will change in a future version.

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
