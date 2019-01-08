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
    ) =>
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
  };
}
