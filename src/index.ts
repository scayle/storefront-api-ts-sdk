// Main Client
export {
  StorefrontAPIClient,
  ExistingItemHandling,
  AddToBasketFailureKind,
  UpdateBasketItemFailureKind,
} from './StorefrontAPIClient'
export type {
  StorefrontAPIAuth,
  StorefrontAPIConfig,
  AddOrUpdateItemError,
  AddManyItemsBasketResponse,
} from './StorefrontAPIClient'

// Basket
export type {
  BasketItem,
  BasketKey,
  BasketWith,
  BasketItemPrice,
  BasketTotalPrice,
  BasketResponseData,
  BasketItemDisplayData,
  BasketPackageInformation,
  GetBasketParameters,
  ApplicablePromotion,
  BasketItemDisplayDataKey,
  BasketItemDisplayDataItem,
  ItemGroup,
} from './endpoints/basket/getBasket'
export type { BasketResponse } from './StorefrontAPIClient'
export type { DeleteItemParameters } from './endpoints/basket/deleteItem'
export type { CreateBasketItemParameters } from './endpoints/basket/createItem'
export type { UpdateBasketItemQuantity } from './endpoints/basket/updateItem'
export type { GetApplicablePromotionsByCodeParameters } from './endpoints/basket/getApplicablePromotionsByCode'

// Brand
export type { Brand, BrandCustomData } from './types/Brand'
export type {
  BrandsEndpointRequestParameters,
  BrandsEndpointResponseData,
} from './endpoints/brands/brands'
export type { BrandByIdEndpointResponseData } from './endpoints/brands/brandById'
export type { BrandBySlugEndpointResponseData } from './endpoints/brands/brandBySlug'

// Shop Configuration
export type {
  ShopConfiguration,
  ShopCountryCustomData,
  ShopCustomData,
  /**
   * @deprecated - will be removed in the next major version. Please switch to ShopConfiguration.
   */
  ShopConfiguration as ShopConfigurationResponseData,
} from './types/ShopConfiguration'

// Typeahead
export type {
  ProductSuggestion,
  TypeaheadProductSuggestion,
  TypeaheadSuggestion,
  BrandOrCategorySuggestion,
  TypeaheadBrandOrCategorySuggestion,
  TypeaheadSuggestionsEndpointRequestParameters,
  TypeaheadSuggestionsEndpointResponseData,
} from './endpoints/typeahead/typeahead'

// Wishlist
export type {
  Wishlist,
  WishlistItem,
  WishlistItemGroup,
  WishlistItemCustomData,
  WishlistWith,
  /**
   * @deprecated - will be removed in the next major version. Please switch to Wishlist.
   */
  Wishlist as WishlistResponseData,
} from './types/Wishlist'
export type { GetWishlistParameters } from './endpoints/wishlist/getWishlist'
export type { DeleteWishlistParameters } from './endpoints/wishlist/deleteWishlistItem'
export type { AddWishlistItemParameters } from './endpoints/wishlist/addWishlistItem'
export { AddToWishlistFailureKind } from './endpoints/wishlist/addWishlistItem'

// Campaigns
export type {
  CampaignsEndpointResponseData,
  CampaignsSortConfig,
  CampaignsEndpointRequestParameters,
} from './endpoints/campaigns/campaigns'

// Sorting
export {
  SortOrder,
  ProductStandardSorting,
  CampaignStandardSorting,
  /**
   * @deprecated - will be removed in the next major version. Please switch to SortOrder.
   */
  SortOrder as APISortOrder,
  /**
   * @deprecated - will be removed in the next major version. Please switch to ProductStandardSorting.
   */
  ProductStandardSorting as APISortOption,
  /**
   * @deprecated - will be removed in the next major version. Please switch to CampaignStandardSorting.
   */
  CampaignStandardSorting as CampaignSortOption,
} from './types/Sorting'

// Products
export type {
  ProductSortConfig,
  ProductsSearchEndpointResponseData,
  ProductsSearchEndpointParameters,
} from './endpoints/products/products'
export type {
  ProductByIdEndpointParameters,
  ProductByIdEndpointResponseData,
} from './endpoints/products/productById'
export type {
  ProductsByIdsEndpointParameters,
  ProductsByIdsEndpointResponseData,
  // TODO: Move to it's own dedicated file
  Pagination,
} from './endpoints/products/productsByIds'
export type {
  ProductsByReferenceKeyRequestData,
  ProductByReferenceKeyResponseData,
} from './endpoints/products/productByReferenceKey'
export type {
  Attributes,
  AttributeGroup,
  ImageAttributes,
  ProductCategory,
  LowestPriorPrice,
  AppliedReduction,
  CentAmount,
  RFC33339Date,
  VariantPrice,
  Product,
  ProductImage,
  PriceRange,
  Value,
  Variant,
  AdvancedAttribute,
  AdvancedAttributes,
  Stock,
  AttributeGroupMulti,
  AttributeGroupSingle,
} from './types/Product'
export type {
  VariantWith,
  ProductWith,
  ProductImageWith,
  ProductCategoryWith,
  ProductCategoryPropertyWith,
} from './types/ProductWith'

// Navigation
export type {
  NavigationAllEndpointResponseData,
  GetNavigationParameters,
} from './endpoints/navigation/navigation'
export type { NavigationByIdEndpointResponseData } from './endpoints/navigation/navigationById'
export type {
  NavigationTree,
  NavigationItem,
  NavigationItemCategory,
  NavigationItems,
  NavigationItemPage,
  NavigationItemExternal,
} from './types/navigation'

// Filters
export type { FilterValuesEndpointParameters } from './endpoints/filters/filterValues'
export { FilterTypes } from './endpoints/filters/filters'
export type {
  FiltersEndpointResponseData,
  FiltersEndpointParameters,
  IdentifierFilterValue,
  AttributesFilterValue,
  FilterItemWithValues,
  AttributesFilterItemWithValues,
  IdentifierFilterItemWithValues,
  RangeFilterItemWithValues,
  BooleanFilterItemWithValues,
} from './endpoints/filters/filters'

// Attributes
export type {
  AttributeFilter,
  AttributeKey,
  AttributeOrAttributeWithValuesFilter,
  AttributeWithBooleanValueFilter,
  AttributeWithValuesFilter,
} from './types/AttributeOrAttributeValueFilter'

// Category
export type { Category, CategoryProperty } from './types/Category'
export type { RootCategoriesEndpointParameters } from './endpoints/categories/categories'
export type { CategoriesByIdsEndpointParameters } from './endpoints/categories/categoriesByIds'
export type { CategoryByIdEndpointParameters } from './endpoints/categories/categoryById'
export type { CategoryBySlugEndpointParameters } from './endpoints/categories/categoryBySlug'

export type { AttributeInclude } from './helpers/attributes'

export type { Campaign } from './types/campaign'

export type { ProductSearchQuery } from './types/ProductSearchQuery'

export {
  getAttributeValues,
  getFirstAttributeValue,
} from './helpers/bapiProduct'

export type {
  Redirect,
  GetRedirectsEndpointParameters,
} from './endpoints/redirects/redirects'

export type {
  VariantDetail,
  VariantsByIdsEndpointParameters,
  VariantsByIdsEndpointResponseData,
} from './endpoints/variants/variantsByIds'

export { PromotionEffectType } from './types/Promotion'
export type {
  Promotion,
  PromotionCondition,
  PromotionCustomData,
  PromotionEffect,
  BuyXGetYEffect,
  AutomaticDiscountEffect,
} from './types/Promotion'
export type {
  PromotionsEndpointResponseData,
  PromotionsEndpointRequestParameters,
} from './endpoints/promotions/promotions'

export { FetchError } from './helpers/FetchError'

// Search
export type {
  SearchEntity,
  CategoryFilter,
  ProductSearchSuggestion,
  CategorySearchSuggestion,
  NavigationItemSuggestion,
} from './types/Search'
export type { SearchV2With } from './endpoints/searchv2/includes'
export type {
  SearchV2ResolveEndpointParameters,
  SearchV2ResolveEndpointResponseData,
} from './endpoints/searchv2/resolve'
export type {
  SearchV2SuggestionsEndpointParameters,
  SearchV2SuggestionsEndpointResponseData,
} from './endpoints/searchv2/suggestions'

// Legacy Search Exports
export type {
  SearchMappingsEndpointParameters,
  SearchMappingsEndpointResponseData,
} from './endpoints/search/mappings'
export type {
  SearchResolveEndpointParameters,
  SearchResolveEndpointResponseData,
} from './endpoints/search/resolve'
export type {
  SearchSuggestionsEndpointParameters,
  SearchSuggestionsEndpointResponseData,
} from './endpoints/search/suggestions'
