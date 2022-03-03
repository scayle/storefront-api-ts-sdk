import {
  CreateBasketItemParameters,
  createBasketItemRequest,
} from 'bapi/endpoints/basket/createItem';
import {
  deleteBasketItemRequest,
  DeleteItemParameters,
} from 'bapi/endpoints/basket/deleteItem';
import {
  BasketResponseData,
  getBasketEndpointRequest,
  GetBasketParameters,
} from 'bapi/endpoints/basket/getBasket';
import {
  UpdateBasketItemQuantity,
  updateBasketItemQuantityRequest,
} from 'bapi/endpoints/basket/updateItem';
import {
  createCategoriesEndpointRequest,
  RootCategoriesEndpointParameters,
} from 'bapi/endpoints/categories/categories';
import {
  CategoriesByIdsEndpointParameters,
  createCategoriesByIdsEndpointRequest,
} from 'bapi/endpoints/categories/categoriesByIds';
import {
  CategoryByIdEndpointParameters,
  createCategoryByIdEndpointRequest,
} from 'bapi/endpoints/categories/categoryById';
import {
  CategoryBySlugEndpointParameters,
  createCategoryBySlugEndpointRequest,
} from 'bapi/endpoints/categories/categoryBySlug';
import {
  createFiltersEndpointRequest,
  FiltersEndpointParameters,
} from 'bapi/endpoints/filters/filters';
import {
  createProductByIdEndpointRequest,
  ProductByIdEndpointParameters,
} from 'bapi/endpoints/products/productById';
import {
  createProductsSearchEndpointRequest,
  ProductsSearchEndpointParameters,
} from 'bapi/endpoints/products/products';
import {
  createProductsByIdsEndpointRequest,
  ProductsByIdsEndpointParameters,
  ProductsByIdsEndpointResponseData,
} from 'bapi/endpoints/products/productsByIds';
import {
  addWishlistItemEndpointRequest,
  AddWishlistItemParameters,
  WishlistItemCreationID,
} from 'bapi/endpoints/wishlist/addWishlistItem';
import {
  deleteWishlistEndpointRequest,
  DeleteWishlistParameters,
} from 'bapi/endpoints/wishlist/deleteWishlistItem';
import {
  getWishlistEndpointRequest,
  GetWishlistParameters,
  WishlistResponseData,
} from 'bapi/endpoints/wishlist/getWishlist';
import {execute} from 'bapi/helpers/execute';
import {BapiCall} from 'bapi/interfaces/BapiCall';
import {BapiCategory} from 'bapi/types/BapiCategory';
import {BapiProduct, Variant} from 'bapi/types/BapiProduct';
import {ModeledBapiClient, ProductMapping} from './ModeledBapiClient';
import {
  SearchSuggestionsEndpointParameters,
  SearchSuggestionsEndpointResponseData,
  createSearchSuggestionsEndpointRequest,
} from 'bapi/endpoints/search/suggestions';
import {
  createrSearchMappingsEndpointRequest,
  SearchMappingsEndpointResponseData,
} from 'bapi/endpoints/search/mappings';
import {AxiosAdapter} from 'axios';
import {
  VariantsByIdsEndpointParameters,
  createVariantsByIdsEndpointRequest,
  VariantDetail,
} from 'bapi/endpoints/variants/variantsByIds';
import {
  FilterValuesEndpointParameters,
  createFilterValuesEndpointRequest,
} from 'bapi/endpoints/filters/filterValues';
import {
  TypeaheadSuggestionsEndpointRequestParameters,
  createTypeaheadSuggestionsEndpointRequest,
  TypeaheadSuggestionsEndpointResponseData,
} from 'bapi/endpoints/typeahead/typeahead';
import {AttributeKey} from 'bapi/types/AttributeOrAttributeValueFilter';
import {createAttributeByKeyEndpointRequest} from 'bapi/endpoints/attributes/attributeByKey';
import {
  createShopConfigurationRequest,
  ShopConfigurationResponseData,
} from 'bapi/endpoints/shopconfiguration/shopconfiguration';
import {
  createProductByReferenceKeyRequest,
  ProductsByReferenceKeyRequestData as ProductsByReferenceKeyEndpointParameters,
} from 'bapi/endpoints/products/productByReferenceKey';
import {
  createSearchResolveEndpointRequest,
  SearchResolveEndpointResponseData,
} from 'bapi/endpoints/search/resolve';
import {
  BrandsEndpointRequestParameters,
  BrandsEndpointResponseData,
  createBrandsEndpointRequest,
} from 'bapi/endpoints/brands/brands';
import {
  BrandByIdEndpointResponseData,
  createBrandByIdEndpointRequest,
} from 'bapi/endpoints/brands/brandById';
import {
  CampaignByIdEndpointResponseData,
  createCampaignByIdEndpointRequest,
} from 'bapi/endpoints/campaigns/campaignById';
import {
  CampaignsEndpointRequestParameters,
  CampaignsEndpointResponseData,
  createCampaignsEndpointRequest,
} from 'bapi/endpoints/campaigns/campaigns';
import {
  createNavigationByIdEndpointRequest,
  NavigationByIdEndpointResponseData,
} from 'bapi/endpoints/navigation/navigationById';
import {
  createNavigationAllEndpointRequest,
  NavigationAllEndpointResponseData,
} from 'bapi/endpoints/navigation/navigation';

// TODO: Also account for unexpected cases, where no basket is returned
type CreateBasketItemResponse<P = BapiProduct, V = Variant> =
  | {
      type: 'success'; // operationStatus: succeeded / partially / not-at-all
      basket: BasketResponseData<P, V>;
    }
  | {
      type: 'failure';
      kind: AddToBasketFailureKind;
      basket: BasketResponseData<P, V>;
    };

type UpdateBasketItemResponse<P = BapiProduct, V = Variant> =
  | {
      type: 'success'; // operationStatus: succeeded / partially / not-at-all
      basket: BasketResponseData<P, V>;
    }
  | {
      type: 'failure';
      kind: UpdateBasketItemFailureKind;
      basket: BasketResponseData<P, V>;
    };

export type BasketResponse<P = BapiProduct, V = Variant> =
  | {
      type: 'success';
      basket: BasketResponseData<P, V>;
    }
  | {
      type: 'failure';
      basket: BasketResponseData<P, V>;
    };

export type AddManyItemsBasketResponse<P = BapiProduct, V = Variant> =
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
      wishlist: WishlistResponseData;
    }
  | {
      type: 'failure';
      wishlist: WishlistResponseData;
    };

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

export type BapiAuthentication =
  | {
      type?: 'basic'; // Optional for now, so it's not a breaking change to add token authentication below
      username: string;
      password: string;
    }
  | {
      type: 'token';
      token: string;
    };

/**
 * BAPI Client
 *
 * Constructor returns a preconfigured client which has the `host` and `appId` set for all requests
 */
export class BapiClient {
  private readonly shopIdPlacement: 'header' | 'query';

  public constructor(
    private readonly env: {
      host: string;
      shopId: number;
      shopIdPlacement?: 'header' | 'query';
      auth?: BapiAuthentication;
      axiosAdapter?: AxiosAdapter;
    },
  ) {
    this.shopIdPlacement = env.shopIdPlacement || 'query';
  }

  public static withModels<T extends ProductMapping>(
    env: {host: string; shopId: number},
    mappings: {product: T},
  ) {
    return new ModeledBapiClient(env, mappings);
  }

  private async execute<SuccessResponseT>(
    bapiCall: BapiCall<SuccessResponseT>,
  ): Promise<SuccessResponseT> {
    const response = await execute(
      this.env.host,
      this.env.shopId,
      bapiCall,
      undefined,
      this.shopIdPlacement,
      this.env.auth,
      undefined,
      this.env.axiosAdapter,
    );

    return response.data;
  }

  private async executeWithStatus<SuccessResponseT>(
    bapiCall: BapiCall<SuccessResponseT>,
  ): Promise<{data: SuccessResponseT; statusCode: number}> {
    const response = await execute(
      this.env.host,
      this.env.shopId,
      bapiCall,
      true,
      this.shopIdPlacement,
      this.env.auth,
      undefined,
      this.env.axiosAdapter,
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
          basket: response.data,
        };
      } else {
        return {
          type: 'failure',
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
          basket: response.data,
        };
      } else {
        return {
          type: 'failure',
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
      options: {existingItemHandling: ExistingItemHandling} = {
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
        const existingBasketItem = client.latestBasket.items.find(
          item => item.variant.id == itemToAdd.variantId,
        );
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
          basket: response.data,
        };
      } else {
        return {
          type: 'failure',
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
    ): Promise<BapiCategory> => {
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
    ): Promise<BapiCategory[]> => {
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
    ): Promise<BapiCategory> => {
      return this.execute(
        createCategoryBySlugEndpointRequest({
          ...parameters,
          slugPath: path,
        }),
      );
    },
    getRoots: (
      parameters: RootCategoriesEndpointParameters = {},
    ): Promise<BapiCategory[]> => {
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

  public readonly products = {
    getById: (
      productId: number,
      params: Omit<ProductByIdEndpointParameters, 'productId'> = {},
    ): Promise<BapiProduct> =>
      this.execute(createProductByIdEndpointRequest({...params, productId})),
    getByIds: async (
      productIds: number[],
      params: Omit<ProductsByIdsEndpointParameters, 'productIds'> = {},
    ): Promise<BapiProduct[]> => {
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
    ): Promise<BapiProduct[]> => {
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
    ): Promise<BapiProduct | null> => {
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
          wishlist: response.data,
        };
      } else {
        return {
          type: 'failure',
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
    ): Promise<NavigationByIdEndpointResponseData> => {
      return this.execute(
        createNavigationByIdEndpointRequest(navigationTreeId),
      );
    },
    getAll: (): Promise<NavigationAllEndpointResponseData> => {
      return this.execute(createNavigationAllEndpointRequest());
    },
  };
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

// Client for basket operations which keeps track of the latest successfully received basket,
// as well as all errors encountered during it's operation.
//
// Does not fail on the first error encountered, which makes it useful for cases where partial operations are desired.
class BasketMultiOperationsClient {
  public latestBasket: BasketResponseData;

  private _client: BapiClient;

  public errors: AddOrUpdateItemError[];

  constructor(client: BapiClient, latestBasket: BasketResponseData) {
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

      if (response.type == 'failure') {
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

      if (response.type == 'failure') {
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
    if (basket && basket?.key == this.latestBasket.key) {
      this.latestBasket = basket;
    } else {
      throw Error(`Did not receive valid basket`);
    }
  }
}
