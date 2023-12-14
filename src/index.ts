export {BapiClient, ExistingItemHandling} from './helpers/BapiClient';

// Basket
export {
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
} from './endpoints/basket/getBasket';
export {DeleteItemParameters} from './endpoints/basket/deleteItem';
export {CreateBasketItemParameters} from './endpoints/basket/createItem';
export {UpdateBasketItemQuantity} from './endpoints/basket/updateItem';

// Typeahead
export {
  ProductSuggestion,
  TypeaheadProductSuggestion,
  TypeaheadSuggestion,
  BrandOrCategorySuggestion,
  TypeaheadBrandOrCategorySuggestion,
  TypeaheadSuggestionsEndpointRequestParameters,
  TypeaheadSuggestionsEndpointResponseData,
} from './endpoints/typeahead/typeahead';

// Wishlist
export {
  WishlistItem,
  WishlistResponseData,
  WishlistWith,
  GetWishlistParameters,
} from './endpoints/wishlist/getWishlist';
export {DeleteWishlistParameters} from './endpoints/wishlist/deleteWishlistItem';
export {AddWishlistItemParameters} from './endpoints/wishlist/addWishlistItem';

// Campaigns
export {
  CampaignSortOption,
  CampaignsEndpointResponseData,
  CampaignsSortConfig,
  CampaignsEndpointRequestParameters,
} from './endpoints/campaigns/campaigns';

// Products
export {
  APISortOption,
  APISortOrder,
  ProductSortConfig,
  ProductsSearchEndpointResponseData,
  ProductsSearchEndpointParameters,
} from './endpoints/products/products';
export {
  ProductByIdEndpointParameters,
  ProductByIdEndpointResponseData,
} from './endpoints/products/productById';
export {
  ProductsByIdsEndpointParameters,
  ProductsByIdsEndpointResponseData,
} from './endpoints/products/productsByIds';
export {
  ProductsByReferenceKeyRequestData,
  ProductByReferenceKeyResponseData,
} from './endpoints/products/productByReferenceKey';
export {
  Attributes,
  AttributeGroup,
  ImageAttributes,
  BapiProductCategory,
  LowestPriorPrice,
  AppliedReduction,
  CentAmount,
  RFC33339Date,
  BapiPrice,
  BapiProduct,
  ProductImage,
  Value,
  Variant,
  AdvancedAttribute,
  AdvancedAttributes,
  Stock,
} from './types/BapiProduct';
export {
  VariantWith,
  ProductWith,
  ProductImageWith,
  ProductCategoryWith,
  ProductCategoryPropertyWith,
} from './types/ProductWith';

// Navigation
export {NavigationAllEndpointResponseData} from './endpoints/navigation/navigation';
export {NavigationByIdEndpointResponseData} from './endpoints/navigation/navigationById';
export {
  NavigationTree,
  NavigationItem,
  NavigationItemCategory,
  NavigationItems,
  NavigationItemPage,
  NavigationItemExternal,
} from './types/navigation';

// Filters
export {
  FiltersEndpointResponseData,
  FiltersEndpointParameters,
  IdentifierFilterValue,
  AttributesFilterValue,
  FilterItemWithValues,
  FilterTypes,
} from './endpoints/filters/filters';

// Attributes
export {
  AttributeFilter,
  AttributeKey,
  AttributeOrAttributeWithValuesFilter,
  AttributeWithBooleanValueFilter,
  AttributeWithValuesFilter,
} from './types/AttributeOrAttributeValueFilter';

// Category
export {BapiCategory, BapiCategoryProperty} from './types/BapiCategory';
export {RootCategoriesEndpointParameters} from './endpoints/categories/categories';
export {
  CategoriesByIdsEndpointParameters,
  CategoriesByIdsEndpointResponseData,
} from './endpoints/categories/categoriesByIds';
export {
  CategoryByIdEndpointParameters,
  CategoryByIdEndpointResponseData,
} from './endpoints/categories/categoryById';
export {
  CategoryBySlugEndpointParameters,
  CategoryBySlugEndpointResponseData,
} from './endpoints/categories/categoryBySlug';

export {AttributeInclude} from './helpers/attributes';

export {Campaign} from './types/campaign';

export {ProductSearchQuery} from './types/ProductSearchQuery';

export {
  getAttributeValues,
  getFirstAttributeValue,
} from './helpers/bapiProduct';

export {
  Promotion,
  PromotionCondition,
  PromotionCustomData,
  PromotionEffect,
} from './types/Promotion';
export {PromotionsEndpointResponseData} from './endpoints/promotions/promotions';

export {FetchError} from './helpers/FetchError';
