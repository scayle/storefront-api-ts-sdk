import type { CreateBasketItemParameters } from './endpoints/basket/createItem'
import { createBasketItemRequest } from './endpoints/basket/createItem'
import type { DeleteItemParameters } from './endpoints/basket/deleteItem'
import { deleteBasketItemRequest } from './endpoints/basket/deleteItem'
import type {
  BasketResponseData,
  GetBasketParameters,
} from './endpoints/basket/getBasket'
import { getBasketEndpointRequest } from './endpoints/basket/getBasket'
import type { UpdateBasketItemQuantity } from './endpoints/basket/updateItem'
import { updateBasketItemQuantityRequest } from './endpoints/basket/updateItem'
import type {
  RootCategoriesEndpointParameters,
} from './endpoints/categories/categories'
import {
  createCategoriesEndpointRequest,
} from './endpoints/categories/categories'
import type {
  CategoriesByIdsEndpointParameters,
} from './endpoints/categories/categoriesByIds'
import {
  createCategoriesByIdsEndpointRequest,
} from './endpoints/categories/categoriesByIds'
import type {
  CategoryByIdEndpointParameters,
} from './endpoints/categories/categoryById'
import {
  createCategoryByIdEndpointRequest,
} from './endpoints/categories/categoryById'
import type {
  CategoryBySlugEndpointParameters,
} from './endpoints/categories/categoryBySlug'
import {
  createCategoryBySlugEndpointRequest,
} from './endpoints/categories/categoryBySlug'
import type { FiltersEndpointParameters } from './endpoints/filters/filters'
import { createFiltersEndpointRequest } from './endpoints/filters/filters'
import type {
  ProductByIdEndpointParameters,
} from './endpoints/products/productById'
import {
  createProductByIdEndpointRequest,
} from './endpoints/products/productById'
import type {
  ProductsSearchEndpointParameters,
} from './endpoints/products/products'
import {
  createProductsSearchEndpointRequest,
} from './endpoints/products/products'
import type {
  GetRedirectsEndpointParameters,
} from './endpoints/redirects/redirects'
import {
  createGetRedirectsEndpointRequest,
  createPostRedirectEndpointRequest,
} from './endpoints/redirects/redirects'
import type {
  ProductsByIdsEndpointParameters,
  ProductsByIdsEndpointResponseData,
} from './endpoints/products/productsByIds'
import {
  createProductsByIdsEndpointRequest,
} from './endpoints/products/productsByIds'
import type {
  AddWishlistItemParameters,
  WishlistItemCreationID,
} from './endpoints/wishlist/addWishlistItem'
import {
  addWishlistItemEndpointRequest,
} from './endpoints/wishlist/addWishlistItem'
import type {
  DeleteWishlistParameters,
} from './endpoints/wishlist/deleteWishlistItem'
import {
  deleteWishlistEndpointRequest,
} from './endpoints/wishlist/deleteWishlistItem'
import type {
  GetWishlistParameters,
  WishlistResponseData,
} from './endpoints/wishlist/getWishlist'
import { getWishlistEndpointRequest } from './endpoints/wishlist/getWishlist'
import type {
  StorefrontAPICall,
  StorefrontAPIResponse,
} from './helpers/execute'
import { execute } from './helpers/execute'
import type { Category } from './types/Category'
import type { Product, Variant } from './types/Product'
import type {
  SearchSuggestionsEndpointParameters,
  SearchSuggestionsEndpointResponseData,
} from './endpoints/search/suggestions'
import {
  createSearchSuggestionsEndpointRequest,
} from './endpoints/search/suggestions'
import type {
  SearchMappingsEndpointResponseData,
} from './endpoints/search/mappings'
import {
  createrSearchMappingsEndpointRequest,
} from './endpoints/search/mappings'
import type {
  VariantDetail,
  VariantsByIdsEndpointParameters,
} from './endpoints/variants/variantsByIds'
import {
  createVariantsByIdsEndpointRequest,
} from './endpoints/variants/variantsByIds'
import type {
  FilterValuesEndpointParameters,
} from './endpoints/filters/filterValues'
import {
  createFilterValuesEndpointRequest,
} from './endpoints/filters/filterValues'
import type {
  TypeaheadSuggestionsEndpointRequestParameters,
  TypeaheadSuggestionsEndpointResponseData,
} from './endpoints/typeahead/typeahead'
import {
  createTypeaheadSuggestionsEndpointRequest,
} from './endpoints/typeahead/typeahead'
import type { AttributeKey } from './types/AttributeOrAttributeValueFilter'
import { createAttributeByKeyEndpointRequest } from './endpoints/attributes/attributeByKey'
import type {
  ShopConfigurationResponseData,
} from './endpoints/shopconfiguration/shopconfiguration'
import {
  createShopConfigurationRequest,
} from './endpoints/shopconfiguration/shopconfiguration'
import type {
  ProductsByReferenceKeyRequestData as ProductsByReferenceKeyEndpointParameters,
} from './endpoints/products/productByReferenceKey'
import {
  createProductByReferenceKeyRequest,
} from './endpoints/products/productByReferenceKey'
import type {
  SearchResolveEndpointParameters,
  SearchResolveEndpointResponseData,
} from './endpoints/search/resolve'
import { createSearchResolveEndpointRequest } from './endpoints/search/resolve'
import type {
  BrandsEndpointRequestParameters,
  BrandsEndpointResponseData,
} from './endpoints/brands/brands'
import { createBrandsEndpointRequest } from './endpoints/brands/brands'
import type {
  BrandByIdEndpointResponseData,
} from './endpoints/brands/brandById'
import { createBrandByIdEndpointRequest } from './endpoints/brands/brandById'
import type {
  CampaignByIdEndpointResponseData,
} from './endpoints/campaigns/campaignById'
import {
  createCampaignByIdEndpointRequest,
} from './endpoints/campaigns/campaignById'
import type {
  CampaignsEndpointRequestParameters,
  CampaignsEndpointResponseData,
} from './endpoints/campaigns/campaigns'
import { createCampaignsEndpointRequest } from './endpoints/campaigns/campaigns'
import type {
  NavigationByIdEndpointResponseData,
} from './endpoints/navigation/navigationById'
import {
  createNavigationByIdEndpointRequest,
} from './endpoints/navigation/navigationById'
import type {
  GetNavigationParameters,
  NavigationAllEndpointResponseData,
} from './endpoints/navigation/navigation'
import {
  createNavigationAllEndpointRequest,
} from './endpoints/navigation/navigation'
import type {
  PromotionsEndpointRequestParameters,
} from './endpoints/promotions/promotions'
import {
  createPromotionsEndpointRequest,
} from './endpoints/promotions/promotions'
import { FetchError } from './helpers/FetchError'
import type {
  SearchV2SuggestionsEndpointParameters,
  SearchV2SuggestionsEndpointResponseData,
} from './endpoints/searchv2/suggestions'
import {
  createSearchV2SuggestionsEndpointRequest,
} from './endpoints/searchv2/suggestions'
import type {
  SearchV2ResolveEndpointParameters,
  SearchV2ResolveEndpointResponseData,
} from './endpoints/searchv2/resolve'
import {
  createSearchV2ResolveEndpointRequest,
} from './endpoints/searchv2/resolve'
import { parseHost } from './helpers/host'

// TODO: Also account for unexpected cases, where no basket is returned
type CreateBasketItemResponse<P = Product, V = Variant> =
  | {
    type: 'success' // operationStatus: succeeded / partially / not-at-all
    statusCode: number
    basket: BasketResponseData<P, V>
  }
  | {
    type: 'failure'
    statusCode: number
    kind: AddToBasketFailureKind
    basket: BasketResponseData<P, V>
  }

type UpdateBasketItemResponse<P = Product, V = Variant> =
  | {
    type: 'success' // operationStatus: succeeded / partially / not-at-all
    statusCode: number
    basket: BasketResponseData<P, V>
  }
  | {
    type: 'failure'
    statusCode: number
    kind: UpdateBasketItemFailureKind
    basket: BasketResponseData<P, V>
  }

export type BasketResponse<P = Product, V = Variant> =
  | {
    type: 'success'
    statusCode: number
    basket: BasketResponseData<P, V>
  }
  | {
    type: 'failure'
    statusCode: number
    basket: BasketResponseData<P, V>
  }

export type AddManyItemsBasketResponse<P = Product, V = Variant> =
  | {
    readonly type: 'success'
    readonly basket: BasketResponseData<P, V>
  }
  | {
    readonly type: 'failure'
    readonly basket: BasketResponseData<P, V>
    readonly errors: AddOrUpdateItemError[]
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

export type AddOrUpdateItemError =
  | {
    readonly operation: 'add'
    readonly variantId: number
    readonly statusCode: number
    readonly kind: AddToBasketFailureKind
    readonly message?: string
  }
  | {
    readonly operation: 'update'
    readonly basketItemKey: string
    readonly statusCode: number
    readonly variantId?: number
    readonly kind: UpdateBasketItemFailureKind
    readonly message?: string
  }
  | {
    readonly operation: 'delete'
    readonly basketItemKey: string
    readonly variantId?: number
    readonly message?: string
  }

type AddWishlistItemResponse =
  | {
    type: 'success'
    statusCode: number
    wishlist: WishlistResponseData
  }
  | {
    type: 'failure'
    statusCode: number
    kind: AddToWhistlistFailureKind
    wishlist: WishlistResponseData
  }

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
      return AddToWhistlistFailureKind.OnlyOneParameterMustBeSet

    case 409:
      return AddToWhistlistFailureKind.ItemAlreadyPresent

    case 412:
      return AddToWhistlistFailureKind.ItemUnvailable

    case 413:
      return AddToWhistlistFailureKind.MaximumItemCountReached

    default:
      return AddToWhistlistFailureKind.Unknown
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
      return AddToBasketFailureKind.VariantAlreadyPresent

    case 412:
      return AddToBasketFailureKind.ItemUnvailable

    case 413:
      return AddToBasketFailureKind.MaximumItemCountReached

    case 424:
      return AddToBasketFailureKind.ItemDataNotFound

    case 206:
      return AddToBasketFailureKind.ItemAddedWithReducedQuantity

    default:
      return AddToBasketFailureKind.Unknown
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
      return UpdateBasketItemFailureKind.ItemAddedWithReducedQuantity

    case 404:
      return UpdateBasketItemFailureKind.BasketItemNotFound

    case 412:
      return UpdateBasketItemFailureKind.ItemUnvailable

    default:
      return UpdateBasketItemFailureKind.Unknown
  }
}

export interface StorefrontAPIAuth {
  type: 'token'
  token: string
}

export interface StorefrontAPIConfig {
  // The host of your Storefront API.
  //
  // This is typically {{tenant-space}}.storefront.api.scayle.cloud
  host: string

  // The shop country id you want to run your client with
  shopId: number

  // An optional authentication for basket & wishlist requests
  auth?: StorefrontAPIAuth
}

/**
 * Storefront API Client
 *
 * Constructor returns a preconfigured client which has the `host` and `appId` set for all requests
 */
export class StorefrontAPIClient {
  private readonly host: string

  private readonly shopId: number

  private readonly auth: StorefrontAPIAuth | undefined

  public constructor(config: StorefrontAPIConfig) {
    this.host = parseHost(config.host)
    this.shopId = config.shopId
    this.auth = config.auth
  }

  private async execute<Response>(
    request: StorefrontAPICall<Response>,
  ): Promise<Response> {
    const response = await execute(this.host, this.shopId, request, this.auth)

    return response.data
  }

  private executeWithStatus<Response>(
    request: StorefrontAPICall<Response>,
  ): Promise<StorefrontAPIResponse<Response>> {
    return execute(this.host, this.shopId, request, this.auth)
  }

  public readonly attributes = {
    getByKey: (key: string) =>
      this.execute(createAttributeByKeyEndpointRequest(key)),
  }

  public readonly basket = {
    get: async (
      basketKey: string,
      params: Omit<GetBasketParameters, 'basketKey'> = {},
    ): Promise<BasketResponse> => {
      const response = await this.execute(
        getBasketEndpointRequest({
          ...params,
          basketKey,
        }),
      )

      return {
        type: 'success',
        statusCode: 200,
        basket: response,
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
      )

      if (response.statusCode === 200 || response.statusCode === 201) {
        return {
          type: 'success',
          statusCode: response.statusCode,
          basket: response.data,
        }
      } else {
        return {
          type: 'failure',
          statusCode: response.statusCode,
          kind: addToBasketFailureKindFromStatusCode(response.statusCode),
          basket: response.data,
        }
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
        variantId: number
        // defaults to 1
        quantity?: number
        // defaults to {}
        params?: Omit<
          CreateBasketItemParameters,
          'basketKey' | 'variantId' | 'quantity'
        >
      }>,
      basketParams: Omit<GetBasketParameters, 'basketKey'> = {},
      options: {
        existingItemHandling: ExistingItemHandling
        considerItemGroupForUniqueness?: boolean
      } = {
        existingItemHandling:
          ExistingItemHandling.ReplaceExistingWithCombinedQuantity,
      },
    ): Promise<AddManyItemsBasketResponse> => {
      const initialBasketResponse = await this.basket.get(
        basketKey,
        basketParams,
      )

      if (initialBasketResponse.type !== 'success') {
        throw Error('Failed to get initial basket')
      }

      const client = new BasketMultiOperationsClient(
        this,
        initialBasketResponse.basket,
      )

      for (const itemToAdd of items) {
        const existingBasketItem = client.latestBasket.items.find(item => {
          if (item.variant.id !== itemToAdd.variantId) {
            return false
          }

          if (!options.considerItemGroupForUniqueness) {
            return true
          }

          return item.itemGroup?.id === itemToAdd.params?.itemGroup?.id
        })
        const { variantId, quantity = 1, params = {} } = itemToAdd

        if (existingBasketItem) {
          if (quantity === 0) {
            // Delete item if existing should not be kept
            switch (options.existingItemHandling) {
              case ExistingItemHandling.KeepExisting:
              case ExistingItemHandling.AddQuantityToExisting:
                continue

              case ExistingItemHandling.ReplaceExisting:
                await client.deleteItem(
                  existingBasketItem.key,
                  params,
                  variantId,
                )
                break

              case ExistingItemHandling.ReplaceExistingWithCombinedQuantity:
                // Delete the existing item, and use the current parameters to create a new item with the existing quantity (as the quantity here was 0)
                await client.deleteItem(
                  existingBasketItem.key,
                  params,
                  variantId,
                )
                await client.addItem(
                  variantId,
                  existingBasketItem.quantity,
                  params,
                )
                break
            }
          } else {
            // Quantity > 0
            switch (options.existingItemHandling) {
              case ExistingItemHandling.KeepExisting:
                continue // leave existing untouched

              case ExistingItemHandling.AddQuantityToExisting:
                // eslint-disable-next-line no-case-declarations
                const paramsWithoutDisplayData = { ...params }
                delete paramsWithoutDisplayData.displayData

                // update existing with combined quantity
                await client.updateItem(
                  existingBasketItem.key,
                  existingBasketItem.quantity + quantity,
                  paramsWithoutDisplayData,
                  variantId,
                )
                continue

              case ExistingItemHandling.ReplaceExisting:
                // delete existing
                await client.deleteItem(
                  existingBasketItem.key,
                  params,
                  variantId,
                )

                // add new item as is
                await client.addItem(variantId, quantity, params)
                break

              case ExistingItemHandling.ReplaceExistingWithCombinedQuantity:
                // delete existing
                await client.deleteItem(
                  existingBasketItem.key,
                  params,
                  variantId,
                )

                // add new item with combined quantity
                await client.addItem(
                  variantId,
                  quantity + existingBasketItem.quantity,
                  params,
                )
                break
            }
          }
        } else if (quantity > 0) {
          // item does not yet exist in basket
          await client.addItem(variantId, quantity, params)
        }
      }

      const errors = client.errors
      const latestBasket = client.latestBasket
      if (errors.length) {
        return {
          type: 'failure',
          basket: latestBasket,
          errors,
        }
      }

      return {
        type: 'success',
        basket: latestBasket,
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
    ): Promise<UpdateBasketItemResponse> => {
      const response = await this.executeWithStatus(
        updateBasketItemQuantityRequest({
          ...params,
          basketKey,
          itemKey,
          quantity,
        }),
      )

      if (response.statusCode === 200) {
        return {
          type: 'success',
          statusCode: response.statusCode,
          basket: response.data,
        }
      } else {
        return {
          type: 'failure',
          statusCode: response.statusCode,
          basket: response.data,
          kind: updateBasketItemFailureKindFromStatusCode(response.statusCode),
        }
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
  }

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
      )
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
      )
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
      )
    },
    getRoots: (
      parameters: RootCategoriesEndpointParameters = {},
    ): Promise<Category[]> => {
      return this.execute(createCategoriesEndpointRequest(parameters))
    },
  }

  public readonly filters = {
    get: (params: FiltersEndpointParameters) =>
      this.execute(createFiltersEndpointRequest(params)),

    getValues: (
      groupName: string,
      params: Omit<FilterValuesEndpointParameters, 'groupName'>,
    ) =>
      this.execute(
        createFilterValuesEndpointRequest({
          groupName,
          ...params,
        }),
      ),
  }

  public readonly redirects = {
    get: (params: GetRedirectsEndpointParameters = {}) =>
      this.execute(createGetRedirectsEndpointRequest(params)),

    post: async (url: string) => {
      try {
        return await this.execute(createPostRedirectEndpointRequest(url))
      } catch (e) {
        if (e instanceof FetchError && e.response.status === 404) {
          return undefined
        }

        throw e
      }
    },
  }

  public readonly products = {
    getById: (
      productId: number,
      params: Omit<ProductByIdEndpointParameters, 'productId'> = {},
    ): Promise<Product> =>
      this.execute(createProductByIdEndpointRequest({ ...params, productId })),
    getByIds: async (
      productIds: number[],
      params: Omit<ProductsByIdsEndpointParameters, 'productIds'> = {},
    ): Promise<Product[]> => {
      if (productIds.length === 0) {
        return []
      }

      const response = await this.execute(
        createProductsByIdsEndpointRequest({ ...params, productIds }),
      )
      return response.entities
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
      }

      const response = await this.execute(
        createProductsSearchEndpointRequest(paramsWithReferenceKeys),
      )

      return response.entities
    },
    getByReferenceKey: async (
      referenceKey: string,
      params: Omit<
        ProductsByReferenceKeyEndpointParameters,
        'referenceKey'
      > = {},
    ): Promise<Product | null> => {
      const response = await this.execute(
        createProductByReferenceKeyRequest({ ...params, referenceKey }),
      )

      // Reference keys are unique on BAPI, so we should only get 1 product (or none)
      if (response.entities.length === 1) {
        return response.entities[0]
      } else if (response.entities.length > 1) {
        throw new Error(
          `Got ${response.entities.length} products for a single referenceKey`,
        )
      }

      return null
    },
    query: (
      params: ProductsSearchEndpointParameters = {},
    ): Promise<ProductsByIdsEndpointResponseData> =>
      this.execute(createProductsSearchEndpointRequest(params)),
  }

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
      )

      if (response.statusCode === 200 || response.statusCode === 201) {
        return {
          type: 'success',
          statusCode: response.statusCode,
          wishlist: response.data,
        }
      } else {
        return {
          type: 'failure',
          statusCode: response.statusCode,
          kind: addToWhistListFailureKindFromStatusCode(response.statusCode),
          wishlist: response.data,
        }
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
  }

  public readonly search = {
    suggestions: (
      term: string,
      params: Omit<SearchSuggestionsEndpointParameters, 'term'> = {},
    ): Promise<SearchSuggestionsEndpointResponseData> => {
      return this.execute(
        createSearchSuggestionsEndpointRequest({ ...params, term }),
      )
    },
    mappings: (term: string): Promise<SearchMappingsEndpointResponseData> => {
      return this.execute(createrSearchMappingsEndpointRequest({ term }))
    },
    resolve: (
      term: string,
      params: Omit<SearchResolveEndpointParameters, 'term'> = {},
    ): Promise<SearchResolveEndpointResponseData> => {
      return this.execute(
        createSearchResolveEndpointRequest({ term, ...params }),
      )
    },
  }

  public readonly searchv2 = {
    suggestions: (
      term: string,
      params: Omit<SearchV2SuggestionsEndpointParameters, 'term'> = {},
    ): Promise<SearchV2SuggestionsEndpointResponseData> => {
      return this.execute(
        createSearchV2SuggestionsEndpointRequest({ ...params, term }),
      )
    },

    resolve: async (
      term: string,
      params: Omit<SearchV2ResolveEndpointParameters, 'term'> = {},
    ): Promise<SearchV2ResolveEndpointResponseData | undefined> => {
      try {
        return await this.execute(
          createSearchV2ResolveEndpointRequest({ term, ...params }),
        )
      } catch (error) {
        if (error instanceof FetchError && error.response.status === 204) {
          return undefined
        }

        throw error
      }
    },
  }

  public readonly typeahead = {
    suggestions: (
      term: string,
      params: Omit<TypeaheadSuggestionsEndpointRequestParameters, 'term'> = {},
    ): Promise<TypeaheadSuggestionsEndpointResponseData> => {
      return this.execute(
        createTypeaheadSuggestionsEndpointRequest({ ...params, term }),
      )
    },
  }

  public readonly variants = {
    getByIds: async (
      variantIds: number[],
      params: Omit<VariantsByIdsEndpointParameters, 'variantIds'> = {},
    ): Promise<VariantDetail[]> => {
      if (variantIds.length === 0) {
        return []
      }

      const response = await this.execute(
        createVariantsByIdsEndpointRequest({ ...params, variantIds }),
      )

      return response.entities
    },
  }

  public readonly shopConfiguration = {
    get: (): Promise<ShopConfigurationResponseData> => {
      return this.execute(createShopConfigurationRequest())
    },
  }

  public readonly brands = {
    getById: (brandId: number): Promise<BrandByIdEndpointResponseData> => {
      return this.execute(createBrandByIdEndpointRequest(brandId))
    },
    get: (
      parameters: BrandsEndpointRequestParameters,
    ): Promise<BrandsEndpointResponseData> => {
      return this.execute(createBrandsEndpointRequest(parameters))
    },
  }

  public readonly campaigns = {
    getById: (
      campaignId: number,
    ): Promise<CampaignByIdEndpointResponseData> => {
      return this.execute(createCampaignByIdEndpointRequest(campaignId))
    },
    get: (
      parameters: CampaignsEndpointRequestParameters = {},
    ): Promise<CampaignsEndpointResponseData> => {
      return this.execute(createCampaignsEndpointRequest(parameters))
    },
  }

  public readonly navigation = {
    getById: (
      navigationTreeId: number,
      parameters: GetNavigationParameters = {},
    ): Promise<NavigationByIdEndpointResponseData> => {
      return this.execute(
        createNavigationByIdEndpointRequest(navigationTreeId, parameters),
      )
    },
    getAll: (
      parameters: GetNavigationParameters = {},
    ): Promise<NavigationAllEndpointResponseData> => {
      return this.execute(createNavigationAllEndpointRequest(parameters))
    },
  }

  public readonly promotions = {
    get: (params: Omit<PromotionsEndpointRequestParameters, 'ids'> = {}) =>
      this.execute(createPromotionsEndpointRequest(params)),

    getByIds: (ids: string[]) => {
      return this.execute(
        createPromotionsEndpointRequest({
          ids,
        }),
      )
    },
  }
}

// Client for basket operations which keeps track of the latest successfully received basket,
// as well as all errors encountered during it's operation.
//
// Does not fail on the first error encountered, which makes it useful for cases where partial operations are desired.
class BasketMultiOperationsClient {
  public latestBasket: BasketResponseData

  private _client: StorefrontAPIClient

  public errors: AddOrUpdateItemError[]

  constructor(client: StorefrontAPIClient, latestBasket: BasketResponseData) {
    this.latestBasket = latestBasket
    this.errors = []
    this._client = client
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
      )

      this.updateBasket(response)
    } catch (e) {
      this.errors.push({
        operation: 'delete',
        basketItemKey: itemKey,
        variantId: debugVariantId,
        message: `${e}`,
      })
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
      )

      if (response.type === 'failure') {
        this.errors.push({
          operation: 'add',
          kind: response.kind,
          statusCode: response.statusCode,
          variantId,
        })
      }

      this.updateBasket(response.basket)
    } catch (e) {
      this.errors.push({
        operation: 'add',
        kind: AddToBasketFailureKind.Unknown,
        statusCode: -1,
        variantId,
        message: `${e}`,
      })
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
      )

      if (response.type === 'failure') {
        this.errors.push({
          operation: 'update',
          basketItemKey: itemKey,
          statusCode: response.statusCode,
          kind: response.kind,
          variantId: debugVariantId,
        })
      }

      this.updateBasket(response.basket)
    } catch (e) {
      this.errors.push({
        operation: 'update',
        basketItemKey: itemKey,
        statusCode: -1,
        kind: UpdateBasketItemFailureKind.Unknown,
        variantId: debugVariantId,
        message: `${e}`,
      })
    }
  }

  private updateBasket(basket?: BasketResponseData) {
    // Small sanity check that we really got a valid basket, else keep the previous
    if (basket && basket?.key === this.latestBasket.key) {
      this.latestBasket = basket
    } else {
      throw Error(`Did not receive valid basket`)
    }
  }
}
