# @scayle/storefront-api

## 18.22.0

### Minor Changes

- Mapped basket item update status codes to a typed failure result instead of throwing `FetchError`. Non-200 responses now return an object with `type: 'failure'`, `statusCode`, `kind`, and `basket` so callers can handle known cases (e.g. item unavailable, max count) without try/catch.

  Example: checking the return value for a failure with a specific kind:

  ```ts
  const result = await client.basket.updateItem(basketKey, itemKey, quantity)
  console.log(result)
  // On failure (e.g. 412 item unavailable):
  // {
  //   type: 'failure',
  //   statusCode: 412,
  //   kind: 'ItemUnavailable',
  //   basket: { ... }
  // }
  ```

  > Note: You still need to use try/catch for cases like network failures or unknown HTTP status codes.

## 18.21.0

### Minor Changes

- Added `SmartSortingKey.TRENDING` constant to support trending product sorting.

  The new `TRENDING` smart sorting key (`scayle:v1:trending`) favors products that are currently trending, enabling storefronts to highlight products with high recent engagement or popularity. This key can be used with the `sortingKey` parameter in product queries and is intended to be used with descending sort order to return most relevant results first.

  For further information on smart product sorting and how to use smart sorting keys, visit: https://scayle.dev/documentation/the-basics/products/sorting?sourceText=Trending#trending

- Added recommendations API client method to fetch similar products for a given product.

  The `StorefrontAPIClient` now includes a `recommendations` property with a `getSimilarProducts` method:

  ```ts
  const similarProducts = await sapiClient.recommendations.getSimilarProducts(
    123,
    {
      with: { attributes: 'all', images: { attributes: 'all' } },
      limit: 10,
      where: {
        attributes: [
          {
            type: 'attributes',
            key: 'brand',
            values: [456],
          },
        ],
      },
      campaignKey: 'summer-sale',
      pricePromotionKey: 'member-discount',
      ignoreSameMasterKey: true,
    },
  )
  ```

  The method accepts a `productId` as the first parameter and returns products similar to the product of the specified `productId`, along with optional configuration parameters including:

  - `with` - Product data to include (attributes, images, etc.)
  - `limit` - Maximum number of recommendations to return
  - `where` - Product search filters to apply
  - `campaignKey` - Campaign key for promotion validation
  - `pricePromotionKey` - Price promotion key for pricing
  - `ignoreSameMasterKey` - Whether to exclude products with the same master key

  New TypeScript types have been added and exported:

  - `SimilarProductsEndpointParameters` - Parameters for similar products requests
  - `SimilarProductsEndpointResponseData` - Response type containing recommendations with products and image confidence scores

## 18.20.1

### Patch Changes

- Updated dependency `utility-types@3.11.0` to `utility-types@catalog:`
- This is an internal change only. The packages now use the PNPM catalog feature to ensure dependencies use the identical version across packages.

## 18.20.0

### Minor Changes

- **\[Navigation\]** Added Navigation V2 API client methods and types to support the new reference key-based navigation system.

  The `StorefrontAPIClient` now includes a `navigationv2` property with two methods:

  - `navigationv2.getAll()` - Fetches all navigation trees from the `/v2/navigations` endpoint:
    ```ts
    const { data: navigationTree } = await sapiClient.navigationv2.getAll({
      with: { category: true },
    })
    ```
  - `navigationv2.getByReferenceKey(referenceKey)` - Fetches a specific navigation tree by its reference key from the `/v2/navigations/{referenceKey}` endpoint:
    ```ts
    const { data: navigationTree } = await sapiClient.navigationv2
      .getByReferenceKey({
        referenceKey: 'header',
        with: { category: true },
      })
    ```

  Both methods support optional parameters for filtering by visibility date and including category information. The Navigation V2 API uses reference keys instead of numeric IDs, making it easier to reference navigation trees by meaningful identifiers.

  New TypeScript types have been added and exported:

  - `NavigationV2Tree` - The navigation tree structure with reference key
  - `NavigationV2Items` - Union type for navigation items supporting three target types: `individual-link`, `category`, and `page`
  - `NavigationV2ItemExternal`, `NavigationV2ItemCategory`, `NavigationV2ItemPage` - Specific item types
  - `GetNavigationV2Parameters` - Parameters for navigation requests
  - `NavigationV2AllEndpointResponseData` and `NavigationV2ByReferenceEndpointResponseData` - Response types

## 18.19.0

### Minor Changes

- Changed the type of `StorefrontAPIClient.basket.deleteItem` to accurately reflect that error responses can be returned (these error responses were already being returned before; only the type was updated).

  ```ts
  const result = await client.basket.deleteItem(basketKey, itemKey)
  // After the update, working with the result is now type safe
  if ('code' in result) {
    // Handle error case
    console.error('Failed to remove item:', result.message)
  } else {
    // Handle successful basket update
    console.log('Updated basket:', result)
  }
  ```

## 18.18.1

### Patch Changes

- Export `SmartSortingKey` constant containing all predefined smart sorting keys for intelligent product sorting. Smart sorting keys provide advanced sorting algorithms that consider multiple factors like discounts, inventory levels, sales performance, and recency to optimize product listings.

  Available keys:

  - `SmartSortingKey.SALES_PUSH` - Promotes items with highest discounts and oldest inventory
  - `SmartSortingKey.NEW_ARRIVALS` - Prioritizes recently added products with good availability
  - `SmartSortingKey.BALANCED_OFFERINGS` - Balances recency, availability, discounts, and sales data
  - `SmartSortingKey.INVENTORY_OPTIMIZATION` - Optimizes inventory turnover for high stock products
  - `SmartSortingKey.LUXURY_PROMOTION` - Highlights high-value luxury items with discounts
  - `SmartSortingKey.STOCK_COVERAGE` - Ensures broad variant availability across products
  - `SmartSortingKey.TOPSELLER` - Prioritizes products with strong sales performance
  - `SmartSortingKey.REVENUE_MAX` - Maximizes revenue by prioritizing high revenue products
  - `SmartSortingKey.RECENTLY_POPULAR` - Favors products with high recent sales performance

  These keys can be used with the `sortingKey` parameter in product queries and are intended to be used with descending sort order to return most relevant results first.

  For further information on smart product sorting and how to use smart sorting keys, visit: https://scayle.dev/en/core-documentation/the-basics/products/product-sorting

## 18.18.0

### Minor Changes

- Extended all basket endpoint method signatures to include an `customerToken` parameter, which is forwarded to the SAPI client as the `X-Customer-Token` header for promotion validation purposes.

### Patch Changes

- Cleaned up README.md and added CONTRIBUTING.md. No functional changes.

## 18.17.0

### Minor Changes

- Deprecated `getAttributeValueTuples` and `getFirstAttributeValue` functions in `@scayle/storefront-api`, which will be removed in the next major version.

  These functions have been moved to `@scayle/storefront-core` for better package organization. Update your imports to use `@scayle/storefront-core` instead, or add the provided utility functions directly to your project:

  ```typescript
  export const getFirstAttributeValue = (
    attributes: Attributes | undefined,
    attributeName: string,
  ): Value | undefined => {
    const attribute = attributes && attributes[attributeName]
    if (!attribute || !attribute.values) {
      return
    }

    if (attribute.multiSelect) {
      return attribute.values.length > 0 ? attribute.values[0] : undefined
    }

    return attribute.values
  }

  export const getAttributeValues = (
    attributes: Attributes | undefined,
    attributeName: string,
  ): Value[] => {
    const attribute = attributes && attributes[attributeName]
    if (!attribute || !attribute.values) {
      return []
    }

    if (attribute.multiSelect) {
      return attribute.values
    }

    return [attribute.values]
  }
  ```

## 18.16.1

### Patch Changes

- Updated SCAYLE Resource Center references

## 18.16.0

### Minor Changes

- Extended the `BuyXGetYEffect` type with the new `discountType`, `discountValue`, `discountDistribution`, `eligibleItemsQuantity` and `applicableItemSelectionType` fields.

  `discountType` - The discount type to apply, which can be either a specific amount (e.g. 10€) or a percentage (e.g. 10%).
  `discountValue` - The discount amount, expressed as cents or as a percentage.
  `discountDistribution` - The distribution method for the discount.
  `applicableItemSelectionType` - The method for identifying which items qualify for the discount.
  `eligibleItemsQuantity` - The quantity of items that need to be considered for the count logic.

## 18.15.0

### Minor Changes

- Created the new promotion type `ComboDealEffect` and included it in the `PromotionEffectType`

  This type can be used to check if the promotion is of type `ComboDealEffect`.

  Example:

  ```ts
  const isComboDealType = (
    promotion?: Promotion | null,
  ): promotion is Promotion<ComboDealEffect> => {
    return promotion?.effect?.type === PromotionEffectType.COMBO_DEAL
  }
  ```

## 18.14.0

### Minor Changes

- Updated the parameters of the `addOrUpdateItems` function of the `StorefrontAPIClient` class with the new `promotions` attribute.

  This attribute is used to support multiple promotions on basket items.

  Before:

  ```ts
  await sapiClient.basket.addOrUpdateItems(basketKey, [
    {
      // ...
      params: {
        // ...
        promotionId: promotionId ?? undefined,
        promotionCode: promotionCode ?? undefined,
      },
    },
  ])
  ```

  After:

  ```ts
  await sapiClient.basket.addOrUpdateItems(basketKey, [
    {
      // ...
      params: {
        // ...
        promotions: [
          { id: 'promotionId', code: 'promotionCode' },
          {
            id: 'promotionId2',
          },
        ],
      },
    },
  ])
  ```

  For more details, see the [Add a variant](https://scayle.dev/en/api-guides/storefront-api/resources/baskets/add-a-variant) and [Update an item](https://scayle.dev/en/api-guides/storefront-api/resources/baskets/update-an-item) guides.

## 18.13.1

### Patch Changes

- Added repository link to package.json.

## 18.13.0

### Minor Changes

- Extended `AppliedReduction` type to include the optional attribute `promotionId`.

  The `promotionId` is used to identify the promotion that applied the reduction to the basket item.
  This is useful for handling varying logic across promotion reductions.

  For more details, see the [Storefront API documentation](https://scayle.dev/en/api-guides/storefront-api/resources/baskets/get-a-basket).

- Added `promotions` field to `BasketItem` type to support multiple promotions per basket item.

  The `promotions` field is an array of `BasketItemPromotion` objects.
  With the introduction of the new `promotions` array field, the `promotion` field is now deprecated.

  Before:

  ```json
  "promotion": {
    "id": "123",
    "name": "Promotion 1",
    "isActive": true,
  }
  ```

  After:

  ```json
  "promotions": [
      {
        "id": "123",
        "name": "Promotion 1",
        "isActive": true,
      }
  ]
  ```

  For more details, see the [Storefront API documentation](https://scayle.dev/en/api-guides/storefront-api/resources/baskets/get-a-basket).

- A new `bulkUpdatePromotion` endpoint is now available.
  This allows to update all promotions applied to basket's items in a single API call.
  Please note that the submitted list is treated as the complete set of promotions; any currently applied promotions not included in the request will be removed.
  For more details, see the [Storefront API documentation](https://scayle.dev/en/api-guides/storefront-api/resources/baskets/bulk-update-promotions).

## 18.12.0

### Minor Changes

- Updated the `Campaign` and `Promotion` types with new fields.

  The type `Campaign` now supports additional customization fields:

  ```ts
  export interface Campaign {
    // ...
    startsAt: RFC33339Date | null // replaces deprecated `start_at`
    endsAt: RFC33339Date | null // replaces deprecated `end_at`
    customData: CampaignCustomData
    headline: string
    subline: string
    link: string
    colorStyle: string
    hideCountdown: boolean
    color: {
      background: string
      text: string
    }
    product: {
      attributeId: number
      badgeLabel: string
    }
    condition: string
  }
  ```

  The type `Promotion` now supports a `displayName` field.

  The fields can be configured in the SCAYLE Panel.

## 18.11.0

### Minor Changes

- Added a `visibleAt` parameter to navigation tree endpoints (`getAll`, `getById`) to support time-based visibility filtering.

  The parameter is passed as `filters[visibleAt]` query parameter to the backend and allows filtering navigation items based on their `visibleFrom` and `visibleTo` timeframes.
  These timeframes can be set in the Panel.

  See: [Time schedule visibility of navigation items](https://scayle.dev/en/core-documentation/the-basics/shops/shop-navigation#time-schedule-visibility-of-navigation-items)

  ```ts
  interface GetNavigationParameters {
    with?: NavigationWith
    locale?: string
    visibleAt?: string
  }
  ```

  Developers can use this parameter to show only navigation items that are visible at a specific point in time by passing an ISO 8601 timestamp when fetching navigation trees.

## 18.10.0

### Minor Changes

- Renamed incorrect partial type of `ShippingStatusCode` from `shipping_not_deliveable` to `shipping_not_deliverable`
- Renamed incorrectly named function `createrSearchMappingsEndpointRequest` to `createSearchMappingsEndpointRequest`
- Renamed interface incorrectly named `IdenfitierFilterItemWithValues` to `IdentifierFilterItemWithValues`
- Renamed incorrect partial types of `AddToBasketFailureKind` and `UpdateBasketItemFailureKind` from `ITEM_UNAVAILABLE: 'ItemUnvailable',` to `ITEM_UNAVAILABLE: 'ItemUnavailable',`

## 18.9.0

### Minor Changes

- Added a `includeProductSorting` boolean parameter to all category endpoints (`categoryById`, `rootCategories`, `categoriesByIds`, `categoryBySlug`)
  and updated the parameter types for each endpoint accordingly.
  Furthermore, `Category` interface has been updated with the optional `productSorting` data:

  ```ts
  interface Category {
    // ...
    productSorting?: {
      customSortingKey: string
      smartSortingKey: string
    }
  }
  ```

  Developers can leverage this data to seamlessly apply smart sorting keys on the product listing page by passing those parameters when fetching products.

## 18.8.0

### Minor Changes

- Added a new test factory `tieredPromotionFactory`. This factory generates a `Promotion` which includes promotion tiers.

### Patch Changes

- Added the type `RFC3339Date` which represents a date string formatted according to RFC 3339. It replaces the misspelled and now deprecated `RFC33339Date`.
- Updated the typing of `PromotionTier.effect` to also allow for a `PromotionEffect`. This can be useful when manually creating `Promotion` objects.

## 18.7.0

### Minor Changes

- Added the `getApplicablePromotionsByCode` method to support the API for fetching applicable promotions for a basket.

## 18.6.1

### Patch Changes

- Correct the typing of `PromotionTier.effect`.

## 18.6.0

### Minor Changes

- Updated the `Promotion` interface to include promotion tiers.

## 18.5.0

### Minor Changes

- `updateItem` should include the `promotionCode` property if it is provided.
- Introduced the `sellableAt` filter option for `products.query`, alongside the addition of `sellableTimeframe` to the `ProductWith` and `Product` types.
- Extended the `Promotion` type to include an optional `code` property.

## 18.4.0

### Minor Changes

- Added a `clone` method to the `StorefrontAPIClient` to allow for easy configuration and re-use of the client.

## 18.3.1

### Patch Changes

- Expose `FilterValuesEndpointParameters` and `GetRedirectsEndpointParameters` type

## 18.3.0

### Minor Changes

- Added missing attributes `masterCategories`, `definingAttributes`, `firstLiveAt` and `indexedAt` to the `Product` interface.
- Added missing attribute `merchant` to the `Variant` interface.

### Patch Changes

- Renamed test factory `buyXGetYPromotionFactory` to `buyXGetYPromotionFactory` to use proper casing.

## 18.2.2

### Patch Changes

- Update `ProductCategory` interface with the missing `categoryHidden` and `categorySlug` properties.

## 18.2.1

### Patch Changes

- Improve `Promotion` interface by allowing to set the promotion effect type via a generic argument.
  The default the promotion effect type will stay `AutomaticDiscountEffect | BuyXGetYEffect`.

  ```typescript
  const promotion: Promotion
  const buyOneGetOnePromotion: Promotion<BuyXGetYEffect>
  const automaticDiscountPromotion: Promotion<AutomaticDiscountEffect>
  ```

## 18.2.0

### Minor Changes

- Add `attributeGroupSingleFactory` and `attributeGroupMultiFactory` test factories.

## 18.1.1

### Patch Changes

- Use correct return type for promotion test factories (`automaticDiscountPromotionFactory` and `buyXgetYPromotionFactory`).

## 18.1.0

### Minor Changes

- Expose `CategoryFilter` type from SAPI

## 18.0.0

### Major Changes

- Convert `FilterTypes`, `AddToWishlistFailureKind`, `PromotionEffectType`, `ProductStandardSorting`, `CampaignStandardSorting`, `CampaignStandardSorting`, `SortOrder`,`ExistingItemHandling`, `AddToBasketFailureKind` and `UpdateBasketItemFailureKind` enums to object literals. This allows not only importing the type, but also the value of member directly.

  This results in the following changes:

  - Enum names have been renamed to match the constant naming convention. For Example:

    ```TypeScript
    import { ExistingItemHandling } from '@scayle/storefront-api'
    ExistingItemHandling.KeepExisting

    // will become

    import { ExistingItemHandling } from '@scayle/storefront-api'
    ExistingItemHandling.KEEP_EXISTING
    ```

  - When an enum was imported and used as a type, the import must be adjusted to import the type from the module.

    ```TypeScript
    import { FilterTypes } from '@scayle/storefront-api'

    interface Example1 {
      type: FilterTypes
    }

    interface Example2 {
      type: FilterTypes.BOOLEAN
    }

    // will become

    import { FilterTypes } from '@scayle/storefront-api'
    import type { FilterTypes as FilterTypesType } from '@scayle/storefront-api'

    interface Example1 {
      type: FilterTypesType
    }

    interface Example2 {
      type: typeof FilterTypes.BOOLEAN
    }
    ```

  - Reverse mapping from enum value to enum name will no longer work out of the box.

    ```TypeScript
    import { ExistingItemHandling } from '@scayle/storefront-api'
    const name = ExistingItemHandling[ExistingItemHandling.KeepExisting]

    // will become

    import { ExistingItemHandling } from '@scayle/storefront-api'
    const name = Object.entries(ExistingItemHandling)
      .find(([key, value]) => value === ExistingItemHandling.KeepExisting)?.[0]
    ```

### Patch Changes

- Added dependency `utility-types@3.11.0`

## 17.18.0

### Minor Changes

- [Testing] Add `priceRange` to the product test data factory.

## 17.17.0

### Minor Changes

- [Types] Remove `unique` from branded types to avoid type mismatches when combining different versions of `storefront-api`.

## 17.16.0

### Minor Changes

- [Testing] Added test factories for `basket`, `promotion`, `navigationTreeItem` and `searchSuggestion`.

## 17.15.0

### Minor Changes

- Add `tax` property to the `BasketTotalPrice` type

## 17.14.1

### Patch Changes

- Fixed misspelling of interface `BasketItemDisplayDataItem` to `BasketItemDisplayDataItem`

## 17.14.0

### Minor Changes

- Adds support for the new `filters` on the `NavigationItemCategory`
  We also removed `languages` field from `NavigationItem` since it was never returned by the API.

## 17.13.0

### Minor Changes

- The `SearchV2With` interface now offers finer control over category information retrieval:

  - A `categories.properties` option has been added, enabling you to request specific properties for categories returned in search results. This provides more flexibility in accessing and displaying relevant category data.
  - A `navigationItem` option has been added, allowing you to retrieve category data for navigationItems with the type `category`.

## 17.12.0

### Minor Changes

- Fix typo on `NavigationItemExternal` option name. `isOpenInNewWindows` got renamed to `isOpenInNewWindow`.

## 17.11.0

### Minor Changes

- Move test factories to separate entry point. They are now available via `@scayle/storefront-api/dist/test/factories` (or `@scayle/storefront-api/test/factories` when `moduleResolution` is set to `Bundler`.

## 17.10.1

### Patch Changes

- Add missing `customData` record to `NavigationItem` type. The `customData` record can be used to add additional data to a `NavigationItem`.

## 17.10.0

### Minor Changes

- Add `attribute`, `category`, `price`, `product`, `variant` test factories and expose them externally.

## 17.9.5

### Patch Changes

- Add `customData` to ´AddWishlistItemParameters´. This can be used to attach additional data to a wishlist item.

  ```ts
  await client.wishlist.addItem(
    'wishlistKey ',
    { variantId: 100 },
    {
      customData: {
        data: 'data',
      },
    },
  )
  ```

## 17.9.4

### Patch Changes

- Add `AddToWishlistFailureKind` and `AddToBasketFailureKind` exports

## 17.9.3

### Patch Changes

- Add missing exports of Pagination, PriceRange, BooleanFilterItemWithValues, RangeFilterItemWithValues, IdentifierFilterItemWithValues and Search V1 types.

## 17.9.2

### Patch Changes

- Fix type of `NavigationItemSuggestion.navigationItemSuggestion.navigationItem`

## 17.9.1

### Patch Changes

- Export `NavigationItemSuggestion` type

## 17.9.0

### Minor Changes

- Add `NavigationItemSuggestion` type to `SearchEntity`
- Deprecate wrong navigation item type (`external`) and added correct type (`individual-link`) on `NavigationItemExternal`.

## 17.8.1

### Patch Changes

- Add `lowestPriorPrice` to `BasketItem` type

## 17.8.0

### Minor Changes

- Add an `additionalHeaders` configuration to the `StorefrontAPIClient` which allows configuring headers to be sent on each request

## 17.7.0

### Minor Changes

- Support new `trackSearchAnalyticsEvent` parameter on product requests for the Search Analytics feature.

## 17.6.0

### Minor Changes

- Support `orderCustomData` on the basket endpoints

## 17.5.0

### Minor Changes

- Deprecated the following types in favor of new namings:

  - `APISortOrder` is now `SortOrder`
  - `APISortOption` is now `ProductStandardSorting`
  - `CampaignSortOption` is now `CampaignStandardSorting`

  They will be removed in the next major version.

- Support multiple sorting keys at the same time for the products search endpoint.

  ```ts
  const client = new StorefrontAPIClient({})

  const products = await client.products.query({
    sort: {
      sortingKey: ['sortingKey1', 'sortingKey2'],
    },
  })
  ```

## 17.4.4

### Patch Changes

- Fix fallback to common basket params for `addOrUpdateItems`

## 17.4.3

### Patch Changes

- Fix an issue related to basket item groups.

  Previously when trying to add an item without an item group to the basket, and the same variant already is in the basket with an item group, we would increase the quantity for the existing item.

  This is now fixed and a new basket item is created as expected.

## 17.4.2

### Patch Changes

- Fix links in the README

## 17.4.1

### Patch Changes

- Fix a bug when including both hidden and specific category properties on the products endpoint

## 17.4.0

### Minor Changes

- Improve filter types to represent the behavior from the API accurately.

## 17.3.0

### Minor Changes

- Refactor Wishlist implementation
  - `WishlistResponseData` export is now deprecated, please use the new `Wishlist` import
  - Removed `masterKey` from `AddWishlistItemParameters` parameters
  - Added `itemGroup` support to the wishlist
  - Added separated `WishlistWith` type
  - Added `WishlistItemCustomData` to allow for extension of custom data on wishlists

## 17.2.0

### Minor Changes

- Adds support for boolean filters in the Search V2 endpoints

  Example (shortened for readability):

  ```json
  {
    "type": "category",
    "categorySuggestion": {
      "category": {
        "id": 1,
        "path": "/women/jackets",
        "name": "Jacke"
      },
      "filters": [
        {
          "type": "boolean",
          "booleanFilter": {
            "slug": "sale",
            "value": true,
            "label": "sale"
          }
        }
      ]
    }
  }
  ```

- Removes the `considerItemGroupForUniqueness` option from the `StorefrontAPIClient.addOrUpdateItems`.

  This behavior is now enabled by default that we consider the item group when checking for existing basket items.

## 17.1.0

### Minor Changes

- Improve ShopConfiguration endpoint and typings

  We now also export a `ShopCustomData` and `ShopCountryCustomData` type that can be used to define your custom data by augmenting the TypeScript type definition of `@scayle/storefront-api` like follows:

  ```ts
  declare module '@scayle/storefront-api' {
    interface ShopCountryCustomData {
      isEnabled: boolean
    }
  }
  ```

## 17.0.1

### Patch Changes

- Add missing `BuyXGetYEffect` and `AutomaticDiscountEffect` exports

## 17.0.0

### Major Changes

-
  - Rename `BapiClient` to `StorefrontAPIClient`
  - Rename `BapiAuthentication` to `StorefrontAPIAuth`
  - Drop support for basic authentication
  - Drop support for header shop id placement
    We recommend sticking with basic query parameters, which are usually safer and easier to use. In the past, we have seen issues with headers and caching layers, which need to be specifically instrumented to consider the header.
  - The `host` parameter provided to the StorefrontAPIClient should now be the URL host (example: `{{tenant-space}}.storefront.api.scayle.cloud`)
    The old format of `https://{{tenant-space}}.storefront.api.scayle.clou/v1/` is still supported
  - Removed all `Bapi` namings from types
    These include: `BapiPrice`, `BapiProduct`, `BapiProductCategory` and `BapiCategory`
  - Drop the `ModeledBapiClient`
  - Updated the build system
    The package is now bundled into a single file, disallowing import from internally compiled files.
    All imports must import the main module from `@scayle/storefront-api`.
    We have also increased the build target to ES2018.

## 16.3.0

### Minor Changes

- Add orFiltersOperator support to filter values endpoint

## 16.2.2

### Patch Changes

- Add orFiltersOperator support to filter values endpoint

## 16.2.1

### Patch Changes

- Resolved an issue where the `instanceof` check for `FetchError` always incorrectly returned `false`, by upgrading the compilation target from ES5 to ES2015.

  This resulted in `404` errors on the redirects endpoint being treated as errors.

## 16.2.0

### Minor Changes

- Add filters to CategorySearchSuggestion

## 16.1.2

### Patch Changes

- remove inline source maps

### 16.1.0

- Add support for Search V2 Endpoints

### 16.0.2

- Fixed a bug when brands.getBySlug method was returning brand by id if numeric value was given

### 16.0.0

- Switch from axios to fetch

### 15.14.3

- Add `priority` field to promotion response

### 15.14.2

- Export Promotion Condition types

### 15.14.1

- Export types

### 15.14.0

- Add promotions integration for Basket Endpoints

### 15.13.0

- Added new `/v1/promotions` endpoints

### 15.12.1

- Bring back the vouchers

### 15.12.0

- Add support for Promotion IDs in Basket Endpoints

### 15.11.0

- Don't include tests in NPM package

### 15.10.0

- Add `name` field to `NavigationItem`

### 15.9.0

- Add `filters:not` support on products and filters endpoint
- Add support for `categories.countryLevelCustomData` and `categories.shopLevelCustomData`

### 15.8.0

- Add `categoryId` support for `/search/resolve`

### 15.7.0

- Add support for `orFiltersOperator` on the `/filters` and `/products` endpoints
- Remove empty `?with=` parameter on the `/filters` endpoint
- Remove type restrictions on AttributeKey

### 15.6.0

- Expose status codes in multi basket operations

### 15.4.0

- Expose status codes in basket responses

### 15.3.0

- Moved Github repository to new Scayle Org

### 15.2.0

- Allow a new filter `filters[hasCampaignReduction]` on the /filters and /products endpoints

### 15.1.0

- Adds supported request parameters to navigation endpoints

### 15.0.0

- Updates navigation response to reflect the new structure

### 14.3.0

- Adds ?includeSellableForFree parameter for filters API call

### 14.2.0

- Refactor Extract typings for better import handling

### 14.1.0

- Implements `redirects.get` method
- Implements `redirects.match` method -> method will return either a matched redirect or undefined if the redirect is matched

### 14.0.0

- extraFilters on NavigationItemCategory are now correctly typed as number[] instead of boolean

### 13.18.0

- Add support for `itemGroup` on basket endpoints

### 13.17.0

- Add `includeSoldOut` on filters endpoint

### 13.16.0

- Allows querying products with `reductionRange`

### 13.13.0

- Fix Basket Item Status
- Add `includeItemsWithoutProductData` option for basket endpoints

### 13.12.0

- Add 409 and 413 wishlist response status codes

### 13.11.1

- Returns merchantId information on product variant level

### 13.11.0

- Allows querying products with `searchCategoryIds`

### 13.10.3

- Allows querying products and variants with `lowestPriorPrice`

### 13.10.2

- Allows querying products based on minimum and max reduction
- Allows querying products with baseCategories

### 13.9.0

- Expose `/campaigns` API as `BapiClient.campaigns.get`
- Expose `/campaigns/{campaignId}` API as `BapiClient.campaigns.getById`
- Expose `/navigation/trees` API as `BapiClient.navigation.getAll`
- Expose `/navigation/trees/{navigationTreeId}` API as `BapiClient.navigation.getById`

### 13.8.0

- Allow arbitrary campaign keys

### 13.7.1

- Ignore `displayData` on `BapiClient.addOrUpdateItems` when strategy `ExistingItemHandling.AddQuantityToExisting` is used
  - Reason: The underlying API does not support updating display data of existing items, only the custom data

### 13.7.0

- Support parameters `containsSearch` and `disableFuzziness` for product searches

### 13.6.0

- `BapiClient.basket.updateItem` (and its usage through `BapiClient.basket.addOrUpdateItems`) now supports updating the `customData` as well as the `pricePromotionKey`
  - Beware that setting either of these entirely replaces any previous `customData` the item may have had

### 13.5.0

- Expose `/search/resolve` API as `BapiClient.search.resolve`

### 13.4.0

- Add `getByReferenceKey`, which uses a faster implementation than `getByReferenceKeys` when requesting products for a single reference key

### 13.3.0

- Expose `attributeGroupType` for `AttributesFilterItemWithValues` on `/filters` endpoint

### 13.2.0

- Include `campaignKey` in `/filters` request

### 13.1.0

- Now supports CloudVault's token based authentication.

### 13.0.0

- Throw error if category's `getByPath` argument is invalid, resulting in the server returning the full list of categories

### 12.0.1

- Add category properties to root categories request

### 12.0.0

- Breaking Change: For categories included with products on `/products`, properties will not be included by default anymore. Responses are now small by default.
  Use `with: { categories: { properties: 'all' } }` to get the previous behavior, or better yet specify the exact properties you need using `with: { categories: { properties: { withName: ['foo', 'bar'] } } }`

### 11.0.0

- Breaking Change: For category requests, properties are not included by default anymore. Responses are now small by default.
  Use `with: { properties: 'all' }` to get the previous behavior, or better yet specify the exact properties you need using `with: { properties: { withName: ['foo', 'bar'] } }`

### 10.3.0

- Add `shop-configuration` endpoint

### 10.2.0

- Expose the `score` property on the Typeahead suggestions

### 10.1.1

- Fix incorrectly named "attribute by key" response type

### 10.1.0

- Add support for the "attribute by key" `/attributes/${key}` API endpoint

### 10.0.0

- Update `BapiClient.addOrUpdateItems` to return more detailed errors if any occurred during the operations
- Make `AddToBasketFailureKind` enum string-based, so it's suitable for logging
- Expose `skipAvailabilityCheck` on "add to wishlist" operation

### 9.1.0

- Expose `referenceKey` on BAPI
- Expose `products.byReferenceKeys` on `BapiClient`

### 9.0.0

- Move `axios` back to a normal dependency, but with a wide range of versions supported, so consumers define which exact version should be used easily
- Export `BasketItemPrice` and `BasketTotalPrice` ([28](https://gitlab.com/aboutyou/cloud-core/backbone-ts/-/merge_requests/28))
  - Thanks to [@sqonde](https://gitlab.com/sqonde) for contributing this fix
- Expose `/typeahead` API endpoint methods

### 8.0.1

- `depth` is now exposed on the category response type
- `skipAvailabilityCheck` can now be specified for basket requests

### 8.0.0

- The `axios` library is now a peer dependency, so you can specify the version to be used in the consumer's `package.json`.

### 7.0.0

- `BapiClient`: Change the default `shopID` placement to be `query`, which avoids `CORS` `OPTIONS` requests for `GET` requests.

### 6.0.0

- Align the parameters across `BapiClient.categories.*` methods

  - The `depth` parameter is now send to BAPI in all cases, even though it's not needed for every case (e.g. requesting categories by IDs wouldn't include children, unless those where specified using the `with` parameter). This is done to have a consistent behavior across the SDK methods, and not be reliant on per endpoint behavior in BAPI.
  - The legacy behavior of not returning the whole category tree by default when requesting the root categories (`BapiClient.categories.getRoots`) is kept. Pass an explicit `children` parameter (e.g. `1000`) to request the whole tree.
  - `BapiClient.categories.getByIds` and `createCategoriesByIdsEndpointRequest` used to take a `depth` parameter which mapped directly to the BAPI HTTP API `depth` parameter. This has now been removed in favor of `with.children`, which specifies the additional levels of children that should be loaded. Set `with.children` to `"previous depth" - 1` when upgrading to this version.

- Adds support for the `/filters/:groupName/values` endpoint

### 5.0.0

- Remove support for masters endpoint `src/endpoints/typeahead/typeahead.ts`

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
Since it the URL parameter doesn't infer with CORS it's now mandatory in the SDK (and also in upcoming versions of the BAPI itself).
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
