import {BapiClient} from './BapiClient';
import {Value} from 'bapi/types/BapiProduct';

interface ProductMapping {
  attributes: {
    [key: string]: 'string' | 'boolean' | 'single-value' | undefined;
  };
}

type MappedProduct<T extends ProductMapping> = {
  attributes: {
    [P in keyof T['attributes']]: T['attributes'][P] extends 'string'
      ? string
      : (T['attributes'][P] extends 'boolean'
          ? boolean
          : (T['attributes'][P] extends 'single-value'
              ? {id: number; label: string; value: string}
              : never))
  };
};

export class ModeledBapiClient {
  constructor(private readonly productMapping: ProductMapping) {}

  public async getProductById(
    productId: number,
  ): Promise<MappedProduct<ProductMapping>> {
    const client = new BapiClient({
      host: 'https://api-cloud.example.com/v1/',
      appId: 1,
    });

    const bapiProduct = await client.products.getById(productId, {
      with: {
        attributes: 'all',
      },
    });

    const mapped: MappedProduct<ProductMapping> = {
      attributes: Object.keys(bapiProduct.attributes).reduce(
        (attributes, key) => {
          if (this.productMapping.attributes[key]) {
            if (this.productMapping.attributes[key] === 'string') {
              return {
                ...attributes,
                [key]: (bapiProduct.attributes[key]!.values as Value).label,
              };
            } else if (this.productMapping.attributes[key] === 'single-value') {
              return {
                ...attributes,
                [key]: bapiProduct.attributes[key]!.values as Value,
              };
            }
          }

          return attributes;
        },
        {},
      ),
    };

    return mapped || bapiProduct;
  }
}
