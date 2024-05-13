// Main Client
export {
  StorefrontAPIClient,
  ExistingItemHandling,
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
  BaskteItemDisplayDataItem,
  ItemGroup,
} from './endpoints/basket/getBasket'
export type { BasketResponse } from './StorefrontAPIClient'
export type { DeleteItemParameters } from './endpoints/basket/deleteItem'
export type { CreateBasketItemParameters } from './endpoints/basket/createItem'
export type { UpdateBasketItemQuantity } from './endpoints/basket/updateItem'

// Brand
export type { Brand, BrandCustomData } from './types/Brand'
export type {
  BrandsEndpointRequestParameters,
  BrandsEndpointResponseData,
} from './endpoints/brands/brands'
export type {
  BrandByIdEndpointResponseData,
} from './endpoints/brands/brandById'
export type {
  BrandBySlugEndpointResponseData,
} from './endpoints/brands/brandBySlug'

// Shop Configuration
export type { ShopConfigurationResponseData } from './endpoints/shopconfiguration/shopconfiguration'

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
  WishlistItem,
  WishlistResponseData,
  WishlistWith,
  GetWishlistParameters,
} from './endpoints/wishlist/getWishlist'
export type { DeleteWishlistParameters } from './endpoints/wishlist/deleteWishlistItem'
export type { AddWishlistItemParameters } from './endpoints/wishlist/addWishlistItem'

// Campaigns
export { CampaignSortOption } from './endpoints/campaigns/campaigns'
export type {
  CampaignsEndpointResponseData,
  CampaignsSortConfig,
  CampaignsEndpointRequestParameters,
} from './endpoints/campaigns/campaigns'

// Products
export { APISortOption, APISortOrder } from './endpoints/products/products'
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
export { FilterTypes } from './endpoints/filters/filters'
export type {
  FiltersEndpointResponseData,
  FiltersEndpointParameters,
  IdentifierFilterValue,
  AttributesFilterValue,
  FilterItemWithValues,
  AttributesFilterItemWithValues,
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
export type {
  CategoriesByIdsEndpointParameters,
} from './endpoints/categories/categoriesByIds'
export type {
  CategoryByIdEndpointParameters,
} from './endpoints/categories/categoryById'
export type {
  CategoryBySlugEndpointParameters,
} from './endpoints/categories/categoryBySlug'

export type { AttributeInclude } from './helpers/attributes'

export type { Campaign } from './types/campaign'

export type { ProductSearchQuery } from './types/ProductSearchQuery'

export {
  getAttributeValues,
  getFirstAttributeValue,
} from './helpers/bapiProduct'

export type { Redirect } from './endpoints/redirects/redirects'

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
} from './types/Promotion'
export type {
  PromotionsEndpointResponseData,
  PromotionsEndpointRequestParameters,
} from './endpoints/promotions/promotions'

export { FetchError } from './helpers/FetchError'

// Search
export type {
  SearchEntity,
  ProductSearchSuggestion,
  CategorySearchSuggestion,
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
