import {
  CreateBasketItemParameters,
  createBasketItemRequest,
} from './endpoints/basket/createItem';
import {
  deleteBasketItemRequest,
  DeleteItemParameters,
} from './endpoints/basket/deleteItem';
import {
  BasketResponseData,
  getBasketEndpointRequest,
  GetBasketParameters,
} from './endpoints/basket/getBasket';
import {
  UpdateBasketItemQuantity,
  updateBasketItemQuantityRequest,
} from './endpoints/basket/updateItem';
import {
  createCategoriesEndpointRequest,
  RootCategoriesEndpointParameters,
} from './endpoints/categories/categories';
import {
  CategoriesByIdsEndpointParameters,
  createCategoriesByIdsEndpointRequest,
} from './endpoints/categories/categoriesByIds';
import {
  CategoryByIdEndpointParameters,
  createCategoryByIdEndpointRequest,
} from './endpoints/categories/categoryById';
import {
  CategoryBySlugEndpointParameters,
  createCategoryBySlugEndpointRequest,
} from './endpoints/categories/categoryBySlug';
import {
  createFiltersEndpointRequest,
  FiltersEndpointParameters,
} from './endpoints/filters/filters';
import {
  createProductByIdEndpointRequest,
  ProductByIdEndpointParameters,
} from './endpoints/products/productById';
import {
  createProductsSearchEndpointRequest,
  ProductsSearchEndpointParameters,
} from './endpoints/products/products';
import {
  createGetRedirectsEndpointRequest,
  createPostRedirectEndpointRequest,
  GetRedirectsEndpointParameters,
} from './endpoints/redirects/redirects';
import {
  createProductsByIdsEndpointRequest,
  ProductsByIdsEndpointParameters,
  ProductsByIdsEndpointResponseData,
} from './endpoints/products/productsByIds';
import {
  addWishlistItemEndpointRequest,
  AddWishlistItemParameters,
  WishlistItemCreationID,
} from './endpoints/wishlist/addWishlistItem';
import {
  deleteWishlistEndpointRequest,
  DeleteWishlistParameters,
} from './endpoints/wishlist/deleteWishlistItem';
import {
  getWishlistEndpointRequest,
  GetWishlistParameters,
  WishlistResponseData,
} from './endpoints/wishlist/getWishlist';
import {execute, BapiCall} from './helpers/execute';
import {Category} from './types/Category';
import {Product, Variant} from './types/Product';
import {
  SearchSuggestionsEndpointParameters,
  SearchSuggestionsEndpointResponseData,
  createSearchSuggestionsEndpointRequest,
} from './endpoints/search/suggestions';
import {
  createrSearchMappingsEndpointRequest,
  SearchMappingsEndpointResponseData,
} from './endpoints/search/mappings';
import axios, {AxiosInstance} from 'axios';
import {
  VariantsByIdsEndpointParameters,
  createVariantsByIdsEndpointRequest,
  VariantDetail,
} from './endpoints/variants/variantsByIds';
import {
  FilterValuesEndpointParameters,
  createFilterValuesEndpointRequest,
} from './endpoints/filters/filterValues';
import {
  TypeaheadSuggestionsEndpointRequestParameters,
  createTypeaheadSuggestionsEndpointRequest,
  TypeaheadSuggestionsEndpointResponseData,
} from './endpoints/typeahead/typeahead';
import {AttributeKey} from './types/AttributeOrAttributeValueFilter';
import {createAttributeByKeyEndpointRequest} from './endpoints/attributes/attributeByKey';
import {
  createShopConfigurationRequest,
  ShopConfigurationResponseData,
} from './endpoints/shopconfiguration/shopconfiguration';
import {
  createProductByReferenceKeyRequest,
  ProductsByReferenceKeyRequestData as ProductsByReferenceKeyEndpointParameters,
} from './endpoints/products/productByReferenceKey';
import {
  createSearchResolveEndpointRequest,
  SearchResolveEndpointResponseData,
} from './endpoints/search/resolve';
import {
  BrandsEndpointRequestParameters,
  BrandsEndpointResponseData,
  createBrandsEndpointRequest,
} from './endpoints/brands/brands';
import {
  BrandByIdEndpointResponseData,
  createBrandByIdEndpointRequest,
} from './endpoints/brands/brandById';
import {
  CampaignByIdEndpointResponseData,
  createCampaignByIdEndpointRequest,
} from './endpoints/campaigns/campaignById';
import {
  CampaignsEndpointRequestParameters,
  CampaignsEndpointResponseData,
  createCampaignsEndpointRequest,
} from './endpoints/campaigns/campaigns';
import {
  createNavigationByIdEndpointRequest,
  NavigationByIdEndpointResponseData,
} from './endpoints/navigation/navigationById';
import {
  createNavigationAllEndpointRequest,
  GetNavigationParameters,
  NavigationAllEndpointResponseData,
} from './endpoints/navigation/navigation';

// TODO: Also account for unexpected cases, where no basket is returned
type CreateBasketItemResponse<P = Product, V = Variant> =
  | {
      type: 'success'; // operationStatus: succeeded / partially / not-at-all
      statusCode: number;
      basket: BasketResponseData<P, V>;
    }
  | {
      type: 'failure';
      statusCode: number;
      kind: AddToBasketFailureKind;
      basket: BasketResponseData<P, V>;
    };

type UpdateBasketItemResponse<P = Product, V = Variant> =
  | {
      type: 'success'; // operationStatus: succeeded / partially / not-at-all
      statusCode: number;
      basket: BasketResponseData<P, V>;
    }
  | {
      type: 'failure';
      statusCode: number;
      kind: UpdateBasketItemFailureKind;
      basket: BasketResponseData<P, V>;
    };

export type BasketResponse<P = Product, V = Variant> =
  | {
      type: 'success';
      statusCode: number;
      basket: BasketResponseData<P, V>;
    }
  | {
      type: 'failure';
      statusCode: number;
      basket: BasketResponseData<P, V>;
    };

export type AddManyItemsBasketResponse<P = Product, V = Variant> =
  | {
      readonly type: 'success';
      readonly basket: BasketResponseData<P, V>;
    }
  | {
      readonly type: 'failure';
      readonly basket: BasketResponseData<P, V>;
      readonly errors: AddOrUpdateItemError[];
    };

export type AddOrUpdateItemError =
  | {
      readonly operation: 'add';
      readonly variantId: number;
      readonly kind: AddToBasketFailureKind;
      readonly message?: string;
    }
  | {
      readonly operation: 'update';
      readonly basketItemKey: string;
      readonly variantId?: number;
      readonly kind: UpdateBasketItemFailureKind;
      readonly message?: string;
    }
  | {
      readonly operation: 'delete';
      readonly basketItemKey: string;
      readonly variantId?: number;
      readonly message?: string;
    };

type AddWishlistItemResponse =
  | {
      type: 'success';
      statusCode: number;
      wishlist: WishlistResponseData;
    }
  | {
      type: 'failure';
      statusCode: number;
      kind: AddToWhistlistFailureKind;
      wishlist: WishlistResponseData;
    };

export enum AddToWhistlistFailureKind {
  OnlyOneParameterMustBeSet = 'OnlyOneParameterMustBeSet',
  ItemUnvailable = 'ItemUnvailable',
  MaximumItemCountReached = 'MaximumItemCountReached',
  ItemAlreadyPresent = 'ItemAlreadyPresent',
  Unknown = 'Unknown',
}

function addToWhistListFailureKindFromStatusCode(
  statusCode: number,
): AddToWhistlistFailureKind {
  switch (statusCode) {
    case 400:
      return AddToWhistlistFailureKind.OnlyOneParameterMustBeSet;

    case 409:
      return AddToWhistlistFailureKind.ItemAlreadyPresent;

    case 412:
      return AddToWhistlistFailureKind.ItemUnvailable;

    case 413:
      return AddToWhistlistFailureKind.MaximumItemCountReached;

    default:
      return AddToWhistlistFailureKind.Unknown;
  }
}

export enum AddToBasketFailureKind {
  VariantAlreadyPresent = 'VariantAlreadyPresent',
  ItemUnvailable = 'ItemUnvailable',
  MaximumItemCountReached = 'MaximumItemCountReached',
  ItemDataNotFound = 'ItemDataNotFound',
  ItemAddedWithReducedQuantity = 'ItemAddedWithReducedQuantity',
  Unknown = 'Unknown',
}

function addToBasketFailureKindFromStatusCode(
  statusCode: number,
): AddToBasketFailureKind {
  switch (statusCode) {
    case 409:
      return AddToBasketFailureKind.VariantAlreadyPresent;

    case 412:
      return AddToBasketFailureKind.ItemUnvailable;

    case 413:
      return AddToBasketFailureKind.MaximumItemCountReached;

    case 424:
      return AddToBasketFailureKind.ItemDataNotFound;

    case 206:
      return AddToBasketFailureKind.ItemAddedWithReducedQuantity;

    default:
      return AddToBasketFailureKind.Unknown;
  }
}

export enum UpdateBasketItemFailureKind {
  ItemUnvailable = 'ItemUnvailable',
  BasketItemNotFound = 'BasketItemNotFound',
  ItemAddedWithReducedQuantity = 'ItemAddedWithReducedQuantity',
  Unknown = 'Unknown',
}

function updateBasketItemFailureKindFromStatusCode(
  statusCode: number,
): UpdateBasketItemFailureKind {
  switch (statusCode) {
    case 206:
      return UpdateBasketItemFailureKind.ItemAddedWithReducedQuantity;

    case 404:
      return UpdateBasketItemFailureKind.BasketItemNotFound;

    case 412:
      return UpdateBasketItemFailureKind.ItemUnvailable;

    default:
      return UpdateBasketItemFailureKind.Unknown;
  }
}

/**
 * Describes how to handle existing variants on basket item updates
 */
export enum ExistingItemHandling {
  // Keeps the existing variant untouched
  KeepExisting,

  // Updates the quantity of the existing item
  AddQuantityToExisting,

  // Deletes the existing item and adds the new one as it
  ReplaceExisting,

  // Deletes the existing item and adds the new one with its quantity increased by the existing value
  ReplaceExistingWithCombinedQuantity,
}

export type StorefrontAPIAuth =
  | {
      type: 'basic';
      username: string;
      password: string;
    }
  | {
      type: 'token';
      token: string;
    };

export interface StorefrontAPIConfig {
  host: string;
  shopId: number;
  shopIdPlacement?: 'header' | 'query';
  auth?: StorefrontAPIAuth;
  axios?: AxiosInstance;
}

/**
 * BAPI Client
 *
 * Constructor returns a preconfigured client which has the `host` and `appId` set for all requests
 */
export class StorefrontAPIClient {
  private readonly shopIdPlacement: 'header' | 'query';

  private readonly host: string;

  private readonly shopId: number;

  private readonly axios: AxiosInstance;

  private readonly auth: StorefrontAPIAuth | undefined;

  public constructor(config: StorefrontAPIConfig) {
    this.host = config.host;
    this.shopId = config.shopId;
    this.shopIdPlacement = config.shopIdPlacement ?? 'query';
    this.auth = config.auth;
    this.axios = config.axios ?? axios;
  }

  private async execute<SuccessResponseT>(
    bapiCall: BapiCall<SuccessResponseT>,
  ): Promise<SuccessResponseT> {
    const response = await execute(
      this.axios,
      this.host,
      this.shopId,
      bapiCall,
      false,
      this.shopIdPlacement,
      this.auth,
    );

    return response.data;
  }

  private async executeWithStatus<SuccessResponseT>(
    bapiCall: BapiCall<SuccessResponseT>,
  ): Promise<{data: SuccessResponseT; statusCode: number}> {
    const response = await execute(
      this.axios,
      this.host,
      this.shopId,
      bapiCall,
      true,
      this.shopIdPlacement,
      this.auth,
    );

    return {
      data: response.data,
      statusCode: response.statusCode,
    };
  }

  public readonly attributes = {
    getByKey: (key: string) =>
      this.execute(createAttributeByKeyEndpointRequest(key)),
  };

  public readonly basket = {
    get: async (
      basketKey: string,
      params: Omit<GetBasketParameters, 'basketKey'> = {},
    ): Promise<BasketResponse> => {
      const response = await this.executeWithStatus(
        getBasketEndpointRequest({
          ...params,
          basketKey,
        }),
      );

      if (response.statusCode === 200) {
        return {
          type: 'success',
          statusCode: response.statusCode,
          basket: response.data,
        };
      } else {
        return {
          type: 'failure',
          statusCode: response.statusCode,
          basket: response.data,
        };
      }
    },
    addItem: async (
      basketKey: string,
      variantId: number,
      quantity: number = 1,
      params: Omit<
        CreateBasketItemParameters,
        'basketKey' | 'variantId' | 'quantity'
      > = {},
    ): Promise<CreateBasketItemResponse> => {
      const response = await this.executeWithStatus(
        createBasketItemRequest({
          ...params,
          basketKey,
          variantId,
          quantity,
        }),
      );

      if (response.statusCode === 200 || response.statusCode === 201) {
        return {
          type: 'success',
          statusCode: response.statusCode,
          basket: response.data,
        };
      } else {
        return {
          type: 'failure',
          statusCode: response.statusCode,
          kind: addToBasketFailureKindFromStatusCode(response.statusCode),
          basket: response.data,
        };
      }
    },
    /**
     * Adds or updates many variants in the basket
     *
     * If an item with the same variant ID already exists the strategy defined in
     * `options.existingItemHandling` will be used to resolve the conflict.
     * If considerItemGroupForUniqueness is set to true, then the variant ID as well
     * as itemGroup ID need to match in order for variant to be considered the same
     * See `ExistingItemHandling` for more details on the individual approaches.
     *
     * If a quantity of 0 is provided, that'll delete any existing basket item for the same variant unless "keep existing" is set.
     *
     * This method throws if the initial basket GET fails.
     *
     * If the caller specifies any of `customData`, `displayData`, or `pricePromotionKey` this will update the _entire_ `customData` for that specific basket item.
     * There is one notable exception: If `ExistingItemHandling.AddQuantityToExisting` is specified, the previous display data will be preserved.
     */
    addOrUpdateItems: async (
      basketKey: string,
      items: Array<{
        variantId: number;
        // defaults to 1
        quantity?: number;
        // defaults to {}
        params?: Omit<
          CreateBasketItemParameters,
          'basketKey' | 'variantId' | 'quantity'
        >;
      }>,
      basketParams: Omit<GetBasketParameters, 'basketKey'> = {},
      options: {
        existingItemHandling: ExistingItemHandling;
        considerItemGroupForUniqueness?: boolean;
      } = {
        existingItemHandling:
          ExistingItemHandling.ReplaceExistingWithCombinedQuantity,
      },
    ): Promise<AddManyItemsBasketResponse> => {
      const initialBasketResponse = await this.basket.get(
        basketKey,
        basketParams,
      );

      if (initialBasketResponse.type !== 'success') {
        throw Error('Failed to get initial basket');
      }

      const client = new BasketMultiOperationsClient(
        this,
        initialBasketResponse.basket,
      );

      for (const itemToAdd of items) {
        const existingBasketItem = client.latestBasket.items.find(item => {
          if (item.variant.id !== itemToAdd.variantId) {
            return false;
          }

          if (!options.considerItemGroupForUniqueness) {
            return true;
          }

          return item.itemGroup?.id === itemToAdd.params?.itemGroup?.id;
        });
        const {variantId, quantity = 1, params = {}} = itemToAdd;

        if (existingBasketItem) {
          if (quantity === 0) {
            // Delete item if existing should not be kept
            switch (options.existingItemHandling) {
              case ExistingItemHandling.KeepExisting:
              case ExistingItemHandling.AddQuantityToExisting:
                continue;

              case ExistingItemHandling.ReplaceExisting:
                await client.deleteItem(
                  existingBasketItem.key,
                  params,
                  variantId,
                );
                break;

              case ExistingItemHandling.ReplaceExistingWithCombinedQuantity:
                // Delete the existing item, and use the current parameters to create a new item with the existing quantity (as the quantity here was 0)
                await client.deleteItem(
                  existingBasketItem.key,
                  params,
                  variantId,
                );
                await client.addItem(
                  variantId,
                  existingBasketItem.quantity,
                  params,
                );
                break;
            }
          } else {
            // Quantity > 0
            switch (options.existingItemHandling) {
              case ExistingItemHandling.KeepExisting:
                continue; // leave existing untouched

              case ExistingItemHandling.AddQuantityToExisting:
                const paramsWithoutDisplayData = {...params};
                delete paramsWithoutDisplayData['displayData'];

                // update existing with combined quantity
                await client.updateItem(
                  existingBasketItem.key,
                  existingBasketItem.quantity + quantity,
                  paramsWithoutDisplayData,
                  variantId,
                );
                continue;

              case ExistingItemHandling.ReplaceExisting:
                // delete existing
                await client.deleteItem(
                  existingBasketItem.key,
                  params,
                  variantId,
                );

                // add new item as is
                await client.addItem(variantId, quantity, params);
                break;

              case ExistingItemHandling.ReplaceExistingWithCombinedQuantity:
                // delete existing
                await client.deleteItem(
                  existingBasketItem.key,
                  params,
                  variantId,
                );

                // add new item with combined quantity
                await client.addItem(
                  variantId,
                  quantity + existingBasketItem.quantity,
                  params,
                );
                break;
            }
          }
        } else {
          // item does not yet exist in basket
          if (quantity > 0) {
            await client.addItem(variantId, quantity, params);
          }
        }
      }

      const errors = client.errors;
      const latestBasket = client.latestBasket;
      if (errors.length) {
        return {
          type: 'failure',
          basket: latestBasket,
          errors: errors,
        };
      }

      return {
        type: 'success',
        basket: latestBasket,
      };
    },
    updateItem: async (
      basketKey: string,
      itemKey: string,
      quantity: number,
      params: Omit<
        UpdateBasketItemQuantity,
        'basketKey' | 'itemKey' | 'quantity'
      > = {},
    ): Promise<UpdateBasketItemResponse> => {
      const response = await this.executeWithStatus(
        updateBasketItemQuantityRequest({
          ...params,
          basketKey,
          itemKey,
          quantity,
        }),
      );

      if (response.statusCode === 200) {
        return {
          type: 'success',
          statusCode: response.statusCode,
          basket: response.data,
        };
      } else {
        return {
          type: 'failure',
          statusCode: response.statusCode,
          basket: response.data,
          kind: updateBasketItemFailureKindFromStatusCode(response.statusCode),
        };
      }
    },
    deleteItem: (
      basketKey: string,
      itemKey: string,
      params: Omit<DeleteItemParameters, 'basketKey' | 'itemKey'> = {},
    ): Promise<BasketResponseData> =>
      this.execute(
        deleteBasketItemRequest({
          ...params,
          basketKey,
          itemKey,
        }),
      ),
  };

  public readonly categories = {
    getById: (
      categoryId: number,
      parameters: Omit<CategoryByIdEndpointParameters, 'categoryId'> = {},
    ): Promise<Category> => {
      return this.execute(
        createCategoryByIdEndpointRequest({
          ...parameters,
          categoryId,
        }),
      );
    },
    getByIds: (
      categoryIds: number[],
      parameters: Omit<CategoriesByIdsEndpointParameters, 'categoryIds'> = {},
    ): Promise<Category[]> => {
      return this.execute(
        createCategoriesByIdsEndpointRequest({
          ...parameters,
          categoryIds,
        }),
      );
    },
    getByPath: (
      path: string[],
      parameters: Omit<CategoryBySlugEndpointParameters, 'slugPath'> = {},
    ): Promise<Category> => {
      return this.execute(
        createCategoryBySlugEndpointRequest({
          ...parameters,
          slugPath: path,
        }),
      );
    },
    getRoots: (
      parameters: RootCategoriesEndpointParameters = {},
    ): Promise<Category[]> => {
      return this.execute(createCategoriesEndpointRequest(parameters));
    },
  };

  public readonly filters = {
    get: (params: FiltersEndpointParameters) =>
      this.execute(createFiltersEndpointRequest(params)),

    getValues: (
      groupName: string,
      params: Omit<FilterValuesEndpointParameters, 'groupName'>,
    ) =>
      this.execute(
        createFilterValuesEndpointRequest({
          groupName: groupName,
          ...params,
        }),
      ),
  };

  public readonly redirects = {
    get: (params: GetRedirectsEndpointParameters = {}) =>
      this.execute(createGetRedirectsEndpointRequest(params)),

    post: async (url: string) => {
      try {
        const response = await this.execute(
          createPostRedirectEndpointRequest(url),
        );
        return response;
      } catch (e) {
        if (axios.isAxiosError(e) && e.response?.status === 404) {
          return undefined;
        }

        throw e;
      }
    },
  };

  public readonly products = {
    getById: (
      productId: number,
      params: Omit<ProductByIdEndpointParameters, 'productId'> = {},
    ): Promise<Product> =>
      this.execute(createProductByIdEndpointRequest({...params, productId})),
    getByIds: async (
      productIds: number[],
      params: Omit<ProductsByIdsEndpointParameters, 'productIds'> = {},
    ): Promise<Product[]> => {
      if (productIds.length === 0) {
        return [];
      }

      const response = await this.execute(
        createProductsByIdsEndpointRequest({...params, productIds}),
      );
      return response.entities;
    },
    getByReferenceKeys: async (
      referenceKeys: string[],
      params: Omit<ProductsSearchEndpointParameters, 'where'> = {},
    ): Promise<Product[]> => {
      const paramsWithReferenceKeys: ProductsSearchEndpointParameters = {
        ...params,
        where: {
          attributes: [
            {
              type: 'attributes',
              key: 'referenceKey' as AttributeKey,
              values: referenceKeys,
            },
          ],
        },
      };

      const response = await this.execute(
        createProductsSearchEndpointRequest(paramsWithReferenceKeys),
      );

      return response.entities;
    },
    getByReferenceKey: async (
      referenceKey: string,
      params: Omit<
        ProductsByReferenceKeyEndpointParameters,
        'referenceKey'
      > = {},
    ): Promise<Product | null> => {
      const response = await this.execute(
        createProductByReferenceKeyRequest({...params, referenceKey}),
      );

      // Reference keys are unique on BAPI, so we should only get 1 product (or none)
      if (response.entities.length === 1) {
        return response.entities[0];
      } else if (response.entities.length > 1) {
        throw new Error(
          `Got ${response.entities.length} products for a single referenceKey`,
        );
      }

      return null;
    },
    query: (
      params: ProductsSearchEndpointParameters = {},
    ): Promise<ProductsByIdsEndpointResponseData> =>
      this.execute(createProductsSearchEndpointRequest(params)),
  };

  public readonly wishlist = {
    get: (
      wishlistKey: string,
      params: Omit<GetWishlistParameters, 'wishlistKey'> = {},
    ) =>
      this.execute(
        getWishlistEndpointRequest({
          ...params,
          wishlistKey,
        }),
      ),
    addItem: async (
      wishlistKey: string,
      item: WishlistItemCreationID,
      params: Omit<AddWishlistItemParameters, 'wishlistKey' | 'item'> = {},
    ): Promise<AddWishlistItemResponse> => {
      const response = await this.executeWithStatus(
        addWishlistItemEndpointRequest({
          ...params,
          wishlistKey,
          item,
        }),
      );

      if (response.statusCode === 200 || response.statusCode === 201) {
        return {
          type: 'success',
          statusCode: response.statusCode,
          wishlist: response.data,
        };
      } else {
        return {
          type: 'failure',
          statusCode: response.statusCode,
          kind: addToWhistListFailureKindFromStatusCode(response.statusCode),
          wishlist: response.data,
        };
      }
    },
    deleteItem: (
      wishlistKey: string,
      itemKey: string,
      params: Omit<DeleteWishlistParameters, 'wishlistKey' | 'itemKey'> = {},
    ) =>
      this.execute(
        deleteWishlistEndpointRequest({
          ...params,
          wishlistKey,
          itemKey,
        }),
      ),
  };

  public readonly search = {
    suggestions: (
      term: string,
      params: Omit<SearchSuggestionsEndpointParameters, 'term'> = {},
    ): Promise<SearchSuggestionsEndpointResponseData> => {
      return this.execute(
        createSearchSuggestionsEndpointRequest({...params, term}),
      );
    },
    mappings: (term: string): Promise<SearchMappingsEndpointResponseData> => {
      return this.execute(createrSearchMappingsEndpointRequest({term}));
    },
    resolve: (term: string): Promise<SearchResolveEndpointResponseData> => {
      return this.execute(createSearchResolveEndpointRequest({term}));
    },
  };

  public readonly typeahead = {
    suggestions: (
      term: string,
      params: Omit<TypeaheadSuggestionsEndpointRequestParameters, 'term'> = {},
    ): Promise<TypeaheadSuggestionsEndpointResponseData> => {
      return this.execute(
        createTypeaheadSuggestionsEndpointRequest({...params, term}),
      );
    },
  };

  public readonly variants = {
    getByIds: async (
      variantIds: number[],
      params: Omit<VariantsByIdsEndpointParameters, 'variantIds'> = {},
    ): Promise<VariantDetail[]> => {
      if (variantIds.length === 0) {
        return [];
      }

      const response = await this.execute(
        createVariantsByIdsEndpointRequest({...params, variantIds}),
      );

      return response.entities;
    },
  };

  public readonly shopConfiguration = {
    get: async (): Promise<ShopConfigurationResponseData> => {
      return this.execute(createShopConfigurationRequest());
    },
  };

  public readonly brands = {
    getById: (brandId: number): Promise<BrandByIdEndpointResponseData> => {
      return this.execute(createBrandByIdEndpointRequest(brandId));
    },
    get: (
      parameters: BrandsEndpointRequestParameters,
    ): Promise<BrandsEndpointResponseData> => {
      return this.execute(createBrandsEndpointRequest(parameters));
    },
  };

  public readonly campaigns = {
    getById: (
      campaignId: number,
    ): Promise<CampaignByIdEndpointResponseData> => {
      return this.execute(createCampaignByIdEndpointRequest(campaignId));
    },
    get: (
      parameters: CampaignsEndpointRequestParameters = {},
    ): Promise<CampaignsEndpointResponseData> => {
      return this.execute(createCampaignsEndpointRequest(parameters));
    },
  };

  public readonly navigation = {
    getById: (
      navigationTreeId: number,
      parameters: GetNavigationParameters = {},
    ): Promise<NavigationByIdEndpointResponseData> => {
      return this.execute(
        createNavigationByIdEndpointRequest(navigationTreeId, parameters),
      );
    },
    getAll: (
      parameters: GetNavigationParameters = {},
    ): Promise<NavigationAllEndpointResponseData> => {
      return this.execute(createNavigationAllEndpointRequest(parameters));
    },
  };
}

// Client for basket operations which keeps track of the latest successfully received basket,
// as well as all errors encountered during it's operation.
//
// Does not fail on the first error encountered, which makes it useful for cases where partial operations are desired.
class BasketMultiOperationsClient {
  public latestBasket: BasketResponseData;

  private _client: StorefrontAPIClient;

  public errors: AddOrUpdateItemError[];

  constructor(client: StorefrontAPIClient, latestBasket: BasketResponseData) {
    this.latestBasket = latestBasket;
    this.errors = [];
    this._client = client;
  }

  async deleteItem(
    itemKey: string,
    params: Omit<DeleteItemParameters, 'basketKey' | 'itemKey'> = {},
    debugVariantId: number,
  ): Promise<void> {
    try {
      const response = await this._client.basket.deleteItem(
        this.latestBasket.key,
        itemKey,
        params,
      );

      this.updateBasket(response);
    } catch (e) {
      this.errors.push({
        operation: 'delete',
        basketItemKey: itemKey,
        variantId: debugVariantId,
        message: `${e}`,
      });
    }
  }

  async addItem(
    variantId: number,
    quantity: number = 1,
    params: Omit<
      CreateBasketItemParameters,
      'basketKey' | 'variantId' | 'quantity'
    > = {},
  ): Promise<void> {
    try {
      const response = await this._client.basket.addItem(
        this.latestBasket.key,
        variantId,
        quantity,
        params,
      );

      if (response.type === 'failure') {
        this.errors.push({
          operation: 'add',
          kind: response.kind,
          variantId: variantId,
        });
      }

      this.updateBasket(response.basket);
    } catch (e) {
      this.errors.push({
        operation: 'add',
        kind: AddToBasketFailureKind.Unknown,
        variantId: variantId,
        message: `${e}`,
      });
    }
  }

  async updateItem(
    itemKey: string,
    quantity: number,
    params: Omit<
      UpdateBasketItemQuantity,
      'basketKey' | 'itemKey' | 'quantity'
    > = {},
    debugVariantId: number,
  ): Promise<void> {
    try {
      const response = await this._client.basket.updateItem(
        this.latestBasket.key,
        itemKey,
        quantity,
        params,
      );

      if (response.type === 'failure') {
        this.errors.push({
          operation: 'update',
          basketItemKey: itemKey,
          kind: response.kind,
          variantId: debugVariantId,
        });
      }

      this.updateBasket(response.basket);
    } catch (e) {
      this.errors.push({
        operation: 'update',
        basketItemKey: itemKey,
        kind: UpdateBasketItemFailureKind.Unknown,
        variantId: debugVariantId,
        message: `${e}`,
      });
    }
  }

  private updateBasket(basket?: BasketResponseData) {
    // Small sanity check that we really got a valid basket, else keep the previous
    if (basket && basket?.key === this.latestBasket.key) {
      this.latestBasket = basket;
    } else {
      throw Error(`Did not receive valid basket`);
    }
  }
}
