export {
  StorefrontAPIClient,
  ExistingItemHandling,
  type StorefrontAPIAuth,
  type StorefrontAPIConfig,
} from './StorefrontAPIClient';

// Sorting Exports
export {SortOrder} from './types/sorting';

// Date Exports
export {type RFC33339Date} from './types/Date';

// Basket
export {type BasketWith, type GetBasketParameters} from './endpoints/basket/getBasket';
export {type DeleteItemParameters} from './endpoints/basket/deleteItem';
export {type CreateBasketItemParameters} from './endpoints/basket/createItem';
export {type UpdateBasketItemQuantity} from './endpoints/basket/updateItem';
export {
  type BasketItem,
  type BasketKey,
  type BasketItemPrice,
  type BasketTotalPrice,
  type Basket,
  type BasketItemDisplayData,
  type BasketPackageInformation,
  type ApplicablePromotion,
} from './types/Basket';

// Typeahead
export {
  type ProductSuggestion,
  type TypeaheadProductSuggestion,
  type TypeaheadSuggestion,
  type BrandOrCategorySuggestion,
  type TypeaheadBrandOrCategorySuggestion,
  type TypeaheadSuggestionsEndpointRequestParameters,
  type TypeaheadSuggestionsEndpointResponseData,
} from './endpoints/typeahead/typeahead';

// Wishlist
export {type WishlistWith, type GetWishlistParameters, type WishlistResponse} from './endpoints/wishlist/getWishlist';
export {type DeleteWishlistParameters} from './endpoints/wishlist/deleteWishlistItem';
export {type AddWishlistItemParameters} from './endpoints/wishlist/addWishlistItem';

// Campaigns
export {type Campaign} from './types/Campaign';
export {
  type CampaignsEndpointResponse,
  type CampaignsSortConfig,
  type CampaignsEndpointRequestParameters,
} from './endpoints/campaigns/campaigns';
export {type CampaignByIdEndpointResponse} from './endpoints/campaigns/campaignById';
export {CampaignSortOption} from './types/sorting';

// Attributes
export {
  type Attributes,
  type AttributeGroup,
  type AttributeValue,
  type AdvancedAttribute,
  type AdvancedAttributes,
} from './types/Attributes';

// Products
export {
  type ProductSortConfig,
  type ProductsSearchEndpointResponseData,
  type ProductsSearchEndpointParameters,
} from './endpoints/products/products';
export {
  type ProductByIdEndpointParameters,
  type ProductByIdEndpointResponseData,
} from './endpoints/products/productById';
export {
  type ProductsByIdsEndpointParameters,
  type ProductsByIdsEndpointResponseData,
} from './endpoints/products/productsByIds';
export {
  type ProductsByReferenceKeyRequestData,
  type ProductByReferenceKeyResponseData,
} from './endpoints/products/productByReferenceKey';
export {
  type ProductCategory,
  type LowestPriorPrice,
  type AppliedReduction,
  type CentAmount,
  type VariantPrice,
  type Product,
  type ProductImage,
  type Variant,
  type Stock,
} from './types/Product';

export {
  type VariantWith,
  type ProductWith,
  type ProductImageWith,
  type ProductCategoryWith,
  type ProductCategoryPropertyWith,
} from './types/ProductWith';

// Navigation
export {type NavigationTreesEndpointResponse} from './endpoints/navigation/navigation';
export {type NavigationTreeEndpointResponse} from './endpoints/navigation/navigationById';
export {
  type NavigationTree,
  type NavigationItem,
  type NavigationItemCategory,
  type NavigationItems,
  type NavigationItemPage,
  type NavigationItemExternal,
} from './types/Navigation';

// Filters
export {
  type FiltersEndpointResponseData,
  type FiltersEndpointParameters,
  type IdentifierFilterValue,
  type AttributesFilterValue,
  type FilterItemWithValues,
  type FilterTypes,
} from './endpoints/filters/filters';

// Attributes
export {
  type AttributeFilter,
  type AttributeKey,
  type AttributeOrAttributeWithValuesFilter,
  type AttributeWithBooleanValueFilter,
  type AttributeWithValuesFilter,
} from './types/AttributeOrAttributeValueFilter';

// Category
export {type Category, type CategoryProperty} from './types/Category';
export {type RootCategoriesEndpointParameters} from './endpoints/categories/categories';
export {
  type CategoriesByIdsEndpointParameters,
  type CategoriesByIdsEndpointResponseData,
} from './endpoints/categories/categoriesByIds';
export {
  type CategoryByIdEndpointParameters,
  type CategoryByIdEndpointResponseData,
} from './endpoints/categories/categoryById';
export {
  type CategoryBySlugEndpointParameters,
  type CategoryBySlugEndpointResponseData,
} from './endpoints/categories/categoryBySlug';

export {type AttributeInclude} from './helpers/attributes';

export {type ProductSearchQuery} from './types/ProductSearchQuery';

// Promotion
export {
  type Promotion,
  type PromotionCondition,
  type PromotionCustomData,
  type PromotionEffect,
} from './types/Promotion';
export {type PromotionsEndpointResponse as PromotionsEndpointResponse} from './endpoints/promotions/promotions';
