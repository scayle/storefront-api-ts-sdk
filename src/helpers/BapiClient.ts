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
import {
  MastersSearchEndpointParameters,
  MastersSearchEndpointResponseData,
  createMastersSearchEndpointRequest,
} from 'bapi/endpoints/masters/query';
import {
  createMasterByIdEndpointRequest,
  MasterByKeyEndpointResponseData,
  MasterByKeyEndpointParameters,
} from 'bapi/endpoints/masters/getByKey';
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

// TODO: Also account for unexpected cases, where no basket is returned
type CreateBasketItemResponse<P = BapiProduct, V = Variant> =
  | {
      type: 'success'; // operationStatus: succeded / partially / not-at-all
      basket: BasketResponseData<P, V>;
    }
  | {
      type: 'failure';
      kind: AddToBasketFailureKind;
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
      readonly failedVariants: number[];
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
  VariantAlreadyPresent,
  ItemUnvailable,
  MaximumItemCountReached,
  ItemDataNotFound,
  ItemAddedWithReducedQuantity,
  Unknown,
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
      auth?: {
        username: string;
        password: string;
      };
    },
  ) {
    this.shopIdPlacement = env.shopIdPlacement || 'header';
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
    );

    return {
      data: response.data,
      statusCode: response.statusCode,
    };
  }

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

      let latestBasket = unwrapBasketResponse(initialBasketResponse);
      const failedVariants: number[] = [];

      for (const itemToAdd of items) {
        try {
          const existingBasketItem = latestBasket.items.find(
            item => item.variant.id == itemToAdd.variantId,
          );
          const quantity =
            itemToAdd.quantity === undefined ? 1 : itemToAdd.quantity;
          const params = itemToAdd.params || {};
          const variantId = itemToAdd.variantId;

          if (existingBasketItem) {
            if (quantity === 0) {
              // Delete item if existing should not be kept
              switch (options.existingItemHandling) {
                case ExistingItemHandling.KeepExisting:
                case ExistingItemHandling.AddQuantityToExisting:
                  continue;

                case ExistingItemHandling.ReplaceExisting:
                  latestBasket = await this.basket.deleteItem(
                    basketKey,
                    existingBasketItem.key,
                  );
                  break;

                case ExistingItemHandling.ReplaceExistingWithCombinedQuantity:
                  // Delete the existing item, and use the current parameters to create a new item with the existing quantity (as the quantity here was 0)
                  latestBasket = await this.basket.deleteItem(
                    basketKey,
                    existingBasketItem.key,
                    params,
                  );
                  latestBasket = unwrapBasketResponse(
                    await this.basket.addItem(
                      basketKey,
                      variantId,
                      existingBasketItem.quantity,
                      params,
                    ),
                  );
                  break;
              }
            } else {
              // Quantity > 0
              switch (options.existingItemHandling) {
                case ExistingItemHandling.KeepExisting:
                  continue; // leave existing untouched

                case ExistingItemHandling.AddQuantityToExisting:
                  // update existing with combined quantity
                  latestBasket = unwrapBasketResponse(
                    await this.basket.updateItem(
                      basketKey,
                      existingBasketItem.key,
                      existingBasketItem.quantity + quantity,
                      params,
                    ),
                  );
                  continue;

                case ExistingItemHandling.ReplaceExisting:
                  // delete existing
                  latestBasket = await this.basket.deleteItem(
                    basketKey,
                    existingBasketItem.key,
                  );

                  // add new item as is
                  latestBasket = unwrapBasketResponse(
                    await this.basket.addItem(
                      basketKey,
                      variantId,
                      quantity,
                      params,
                    ),
                  );
                  break;

                case ExistingItemHandling.ReplaceExistingWithCombinedQuantity:
                  // delete existing
                  latestBasket = await this.basket.deleteItem(
                    basketKey,
                    existingBasketItem.key,
                  );

                  // add new item with combined quantity
                  latestBasket = unwrapBasketResponse(
                    await this.basket.addItem(
                      basketKey,
                      variantId,
                      quantity + existingBasketItem.quantity,
                      params,
                    ),
                  );
                  break;
              }
            }
          } else {
            if (quantity > 0) {
              // item does not yet exist in basket, add it
              latestBasket = unwrapBasketResponse(
                await this.basket.addItem(
                  basketKey,
                  variantId,
                  quantity,
                  params,
                ),
              );
            }
          }
        } catch (e) {
          failedVariants.push(itemToAdd.variantId);
        }
      }

      if (failedVariants.length) {
        return {
          type: 'failure',
          basket: latestBasket,
          failedVariants: failedVariants,
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
    ): Promise<BasketResponse> => {
      const response = await this.executeWithStatus(
        updateBasketItemQuantityRequest({
          ...params,
          basketKey,
          itemKey,
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
          basket: response.data,
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

  public readonly masters = {
    query: (
      params: MastersSearchEndpointParameters = {},
    ): Promise<MastersSearchEndpointResponseData> => {
      return this.execute(createMastersSearchEndpointRequest(params));
    },
    getByKey: (
      masterKey: string,
      params: Omit<MasterByKeyEndpointParameters, 'masterKey'> = {},
    ): Promise<MasterByKeyEndpointResponseData> => {
      return this.execute(
        createMasterByIdEndpointRequest({...params, masterKey}),
      );
    },
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

function unwrapBasketResponse(response: BasketResponse): BasketResponseData {
  if (response.type === 'success') {
    return response.basket;
  }

  throw Error('Failed unwrapping basket');
}
