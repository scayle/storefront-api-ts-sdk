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
} from 'bapi/endpoints/categories';
import {
  CategoriesByIdsEndpointParameters,
  createCategoriesByIdsEndpointRequest,
} from 'bapi/endpoints/categoriesByIds';
import {
  CategoryByIdEndpointParameters,
  createCategoryByIdEndpointRequest,
} from 'bapi/endpoints/categoryById';
import {
  CategoryBySlugEndpointParameters,
  createCategoryBySlugEndpointRequest,
} from 'bapi/endpoints/categoryBySlug';
import {
  createFiltersEndpointRequest,
  FiltersEndpointParameters,
} from 'bapi/endpoints/filters';
import {
  createProductByIdEndpointRequest,
  ProductByIdEndpointParameters,
} from 'bapi/endpoints/productById';
import {
  APISortOption,
  APISortOrder,
  createProductsSearchEndpointRequest,
  ProductsSearchEndpointParameters,
} from 'bapi/endpoints/products';
import {
  createProductsByIdsEndpointRequest,
  ProductsByIdsEndpointParameters,
  ProductsByIdsEndpointResponseData,
} from 'bapi/endpoints/productsByIds';
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
import {AttributeKey} from 'bapi/types/AttributeOrAttributeValueFilter';
import {BapiCategory} from 'bapi/types/BapiCategory';
import {BapiProduct, Variant} from 'bapi/types/BapiProduct';
import {ProductSearchQuery} from 'bapi/types/ProductSearchQuery';
import {ProductWith} from 'bapi/types/ProductWith';
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

enum AddToBasketFailureKind {
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
  public constructor(private readonly env: {host: string; shopId: number}) {}

  public static withModels<T extends ProductMapping>(
    env: {host: string; shopId: number},
    mappings: {product: T},
  ) {
    return new ModeledBapiClient(env, mappings);
  }

  private async execute<SuccessResponseT>(
    bapiCall: BapiCall<SuccessResponseT>,
  ): Promise<SuccessResponseT> {
    const response = await execute(this.env.host, this.env.shopId, bapiCall);
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
}

// tslint:disable:no-console
/**
 * `BapiClient` usage example
 */
export async function example() {
  const bapi = new BapiClient({host: 'https://api.example.com/', shopId: 139});

  {
    // Querying the first page of all products
    const {entities: products, pagination} = await bapi.products.query();
    console.log(products, pagination);
  }

  {
    // Querying the 101st to 200th products in a specific category, costing up to 50 EUR, having one of two colors
    // Including their own and their variant's attributes in the response
    const {entities: products, pagination} = await bapi.products.query({
      where: {
        categoryId: 20201,
        maxPrice: 5000,
        attributes: [
          {
            type: 'attributes',
            key: 'color' as AttributeKey /* would typed from /filters response model */,
            values: [55, 57],
          },
        ],
      },
      with: {
        attributes: 'all',
        variants: {
          attributes: 'all',
        },
      },
      pagination: {
        perPage: 100,
        page: 2,
      },
    });

    console.log(products, pagination);
  }

  {
    // Resuse product fields to be requested across APIs
    const DEFAULT_PRODUCT_WITH: ProductWith = {
      attributes: 'all',
      categories: 'all',
    };

    const basketResponse = await bapi.basket.get(`aboutyou_customer_1235`, {
      with: {
        items: {
          product: DEFAULT_PRODUCT_WITH,
        },
      },
    });

    const product = await bapi.products.getById(4711, {
      with: DEFAULT_PRODUCT_WITH,
    });

    // The product on the basket item and the individually requested product has the same schema
    console.log(basketResponse.type, basketResponse.basket.items[0], product);
  }

  {
    // Adding a product variant to the basket
    const basketResponse = await bapi.basket.addItem(
      `aboutyou_customer_1235`,
      9474212,
      1,
    );

    if (basketResponse.type === 'success') {
      console.log(`Current basket:`, basketResponse.basket);
    } else {
      console.log(
        `Failure kind`,
        basketResponse.kind,
        `Current basket:`,
        basketResponse.basket,
      );
    }
  }

  {
    // Change basket item quantity
    const updatedBasket = await bapi.basket.updateItem(
      `aboutyou_customer_1235`,
      'item_789',
      5,
    );

    console.log(updatedBasket);
  }

  {
    // Delete basket item
    const updatedBasket = await bapi.basket.deleteItem(
      `aboutyou_customer_1235`,
      'item_789',
    );

    console.log(updatedBasket);
  }

  {
    // Retrieve a category with it's immediate children and all parents
    const category = await bapi.categories.getByPath(['frauen', 'bekleidung'], {
      with: {
        parents: 'all',
        children: {
          depth: 1,
        },
      },
    });

    // `parent` contains `BapiCategory`s up the chain, and `children` and array of `BapiCategory`s
    console.log(category);
  }

  {
    // Retrieve a category by ID
    const category = await bapi.categories.getById(20201, {
      with: {
        parents: 'all',
        children: {
          depth: 1,
        },
      },
    });

    // `parent` contains `BapiCategory`s up the chain, and `children` and array of `BapiCategory`s
    console.log(category);
  }

  {
    // Fetch products a brand page and use the same query data to fetch the filters applicable to the result set

    const searchQuery: ProductSearchQuery = {
      categoryId: 20201,
      attributes: [
        {
          type: 'attributes',
          key: 'brand' as AttributeKey,
          values: [901],
        },
      ],
    };

    const {entities: products, pagination} = await bapi.products.query({
      where: searchQuery,
      sort: {
        by: APISortOption.Price,
        direction: APISortOrder.Ascending,
      },
    });

    const filters = await bapi.filters.get({
      where: searchQuery,
    });

    console.log(products, pagination, filters);
  }

  {
    // Fetch wishlist, including `color` attribute on item-level `variant`
    const wishlist = bapi.wishlist.get(`aboutyou_customer_1235`, {
      with: {
        items: {
          variant: {
            attributes: {
              withKey: ['color'],
            },
          },
        },
      },
    });

    console.log(wishlist);
  }

  {
    // Add variant to wishlist
    const updatedWishlist = bapi.wishlist.addItem(`aboutyou_customer_1235`, {
      variantId: 789,
    });

    console.log(updatedWishlist);
  }

  {
    // Remove item from wishlist
    const updatedWishlist = bapi.wishlist.deleteItem(
      `aboutyou_customer_1235`,
      `item_789`,
    );

    console.log(updatedWishlist);
  }
}
