import { createSimilarProductsEndpointRequest } from '../similar'
import { describe, it, expect } from 'vitest'

describe('similar products request', () => {
  it('build request with including filters', () => {
    expect(createSimilarProductsEndpointRequest({
      productId: 1,
      where: {
        attributes: [{
          type: 'attributes',
          key: 'brand',
          values: [123],
        }, {
          type: 'boolean',
          key: 'sale',
          value: true,
        }],
      },
      campaignKey: 'campaign-key',
      pricePromotionKey: 'price-promotion-key',
      with: { attributes: 'all' },
      limit: 10,
    })).toMatchObject({
      endpoint: '/v1/recommendations/similar/1',
      method: 'GET',
      params: {
        with: 'attributes,images.attributes:legacy(false)',
        'filters[brand]': '123',
        campaignKey: 'campaign-key',
        limit: 10,
        pricePromotionKey: 'price-promotion-key',
      },
    })
  })

  it('build request with excluding filters', () => {
    expect(createSimilarProductsEndpointRequest({
      productId: 1,
      where: {
        attributes: [{
          type: 'attributes:not',
          key: 'brand',
          values: [123],
        }, {
          type: 'boolean',
          key: 'sale',
          value: false,
        }],
      },
      campaignKey: 'campaign-key',
      pricePromotionKey: 'price-promotion-key',
      with: { attributes: 'all' },
    })).toMatchObject({
      endpoint: '/v1/recommendations/similar/1',
      method: 'GET',
      params: {
        with: 'attributes,images.attributes:legacy(false)',
        'filters:not[brand]': '123',
        'filters[sale]': 'false',
      },
    })
  })
})
